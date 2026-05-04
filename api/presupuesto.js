const RESEND_API_URL = "https://api.resend.com/emails";

const requiredFields = ["Nombre", "Email", "Servicio"];

const jsonResponse = (response, statusCode, payload) => {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
};

const parseBody = async (request) => {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const rawBody = Buffer.concat(chunks).toString("utf8");
  const contentType = request.headers["content-type"] || "";

  if (contentType.includes("application/json")) {
    return JSON.parse(rawBody || "{}");
  }

  const params = new URLSearchParams(rawBody);

  return Object.fromEntries(params.entries());
};

const cleanText = (value = "") => String(value).replace(/\s+/g, " ").trim();

const escapeHtml = (value = "") => cleanText(value)
  .replace(/&/g, "&amp;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;")
  .replace(/'/g, "&#039;");

const isValidEmail = (value = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const buildEmailText = (data) => [
  "Solicitud de presupuesto vía web - Imprenta Disgraf",
  "",
  `Fecha: ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`,
  "",
  `Nombre o empresa: ${data.Nombre}`,
  `Email: ${data.Email}`,
  `Teléfono: ${data.Telefono || "No indicado"}`,
  `Servicio: ${data.Servicio}`,
  "",
  "Detalles:",
  data.Mensaje || "No indicado",
  "",
  "Origen: formulario de presupuesto de la web",
].join("\n");

const buildEmailHtml = (data) => `
  <h1>Solicitud de presupuesto vía web</h1>
  <p><strong>Origen:</strong> Imprenta Disgraf</p>
  <p><strong>Fecha:</strong> ${escapeHtml(new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" }))}</p>
  <hr>
  <p><strong>Nombre o empresa:</strong> ${escapeHtml(data.Nombre)}</p>
  <p><strong>Email:</strong> ${escapeHtml(data.Email)}</p>
  <p><strong>Teléfono:</strong> ${escapeHtml(data.Telefono || "No indicado")}</p>
  <p><strong>Servicio:</strong> ${escapeHtml(data.Servicio)}</p>
  <p><strong>Detalles:</strong></p>
  <p>${escapeHtml(data.Mensaje || "No indicado").replace(/\n/g, "<br>")}</p>
`;

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return jsonResponse(response, 405, {
      ok: false,
      message: "Método no permitido.",
    });
  }

  let data;

  try {
    data = await parseBody(request);
  } catch {
    return jsonResponse(response, 400, {
      ok: false,
      message: "No se ha podido leer la solicitud.",
    });
  }

  if (cleanText(data.Website)) {
    return jsonResponse(response, 200, {
      ok: true,
      message: "Solicitud enviada correctamente.",
    });
  }

  const sanitizedData = {
    Nombre: cleanText(data.Nombre),
    Email: cleanText(data.Email),
    Telefono: cleanText(data.Telefono),
    Servicio: cleanText(data.Servicio),
    Mensaje: cleanText(data.Mensaje),
  };

  const missingFields = requiredFields.filter((field) => !sanitizedData[field]);

  if (missingFields.length > 0 || !isValidEmail(sanitizedData.Email)) {
    return jsonResponse(response, 422, {
      ok: false,
      message: "Revisa los campos obligatorios antes de enviar.",
    });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.QUOTE_TO_EMAIL || "cldisgraf@toniferra.com";
  const fromEmail = process.env.QUOTE_FROM_EMAIL || "Imprenta Disgraf <presupuestos@imprentadisgraf.com>";

  if (!apiKey) {
    return jsonResponse(response, 500, {
      ok: false,
      message: "El envío de emails no está configurado todavía.",
    });
  }

  const resendResponse = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: sanitizedData.Email,
      subject: "Solicitud de presupuesto vía web - Imprenta Disgraf",
      text: buildEmailText(sanitizedData),
      html: buildEmailHtml(sanitizedData),
    }),
  });

  if (!resendResponse.ok) {
    const errorBody = await resendResponse.text();

    console.error("Resend email error", {
      status: resendResponse.status,
      body: errorBody,
      from: fromEmail,
      to: toEmail,
    });

    return jsonResponse(response, 502, {
      ok: false,
      message: "No se ha podido enviar el presupuesto. Inténtalo de nuevo o contacta por teléfono.",
    });
  }

  return jsonResponse(response, 200, {
    ok: true,
    message: "Solicitud enviada correctamente. Te responderemos lo antes posible.",
  });
};
