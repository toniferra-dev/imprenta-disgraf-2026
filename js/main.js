/**
 * Small progressive enhancements for the static site.
 * The page remains usable without JavaScript: page links and mailto form still work.
 */

const sidebar = document.querySelector(".sidebar");
const menuToggle = document.querySelector(".sidebar__toggle");
const menuLinks = document.querySelectorAll(".sidebar__link");

if (sidebar && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("sidebar--open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("sidebar--open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

// Mark the current multipage navigation item without relying on server-side templates.
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const servicePages = new Set([
  "rotulos-rotulacion-mallorca.html",
  "tarjetas-visita-palma.html",
  "photocall-mallorca.html",
  "impresion-catalogos-mallorca.html",
  "camisetas-personalizadas-mallorca.html",
  "impresion-digital-palma.html",
]);

menuLinks.forEach((link) => {
  const linkPage = link.getAttribute("href")?.replace("./", "");
  const isCurrent = linkPage === currentPage || (linkPage === "servicios-imprenta-palma.html" && servicePages.has(currentPage));

  link.classList.toggle("sidebar__link--active", isCurrent);

  if (isCurrent) {
    link.setAttribute("aria-current", "page");
  } else {
    link.removeAttribute("aria-current");
  }
});

// Static-site quote form: builds a recognizable email for test and production review.
const mailtoForm = document.querySelector("[data-mailto-form]");

if (mailtoForm) {
  mailtoForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(mailtoForm);
    const recipient = mailtoForm.dataset.mailtoRecipient;
    const subject = mailtoForm.dataset.mailtoSubject || "Solicitud de presupuesto vía web";
    const submittedAt = new Date().toLocaleString("es-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });

    const bodyLines = [
      "Solicitud de presupuesto vía web - Imprenta Disgraf",
      "",
      `Fecha: ${submittedAt}`,
      "",
      ...[...formData.entries()].map(([key, value]) => `${key}: ${value || "No indicado"}`),
      "",
      "Origen: formulario de presupuesto de la web",
    ];

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join("\n"))}`;
  });
}
