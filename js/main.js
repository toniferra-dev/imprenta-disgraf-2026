/**
 * Small progressive enhancements for the static site.
 * The page remains usable without JavaScript: page links and server-side forms still work.
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

// Vercel quote form: sends budget requests through the serverless API.
const quoteForm = document.querySelector("[data-quote-form]");

if (quoteForm) {
  quoteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = quoteForm.querySelector("[type='submit']");
    const status = quoteForm.querySelector("[data-quote-status]");
    const formData = new FormData(quoteForm);

    submitButton.disabled = true;
    status.textContent = "Enviando solicitud...";
    status.dataset.status = "loading";

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData.entries())),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();

      if (!response.ok || !result.ok) {
        throw new Error(result.message || "No se ha podido enviar la solicitud.");
      }

      quoteForm.reset();
      status.textContent = result.message;
      status.dataset.status = "success";
    } catch (error) {
      status.textContent = error.message || "No se ha podido enviar. Prueba por teléfono o email.";
      status.dataset.status = "error";
    } finally {
      submitButton.disabled = false;
    }
  });
}
