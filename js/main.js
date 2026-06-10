/**
 * Small progressive enhancements for the static site.
 * The page remains usable without JavaScript: page links and server-side forms still work.
 */

const sidebar = document.querySelector(".sidebar");
const menuToggle = document.querySelector(".sidebar__toggle");
const menuLinks = document.querySelectorAll(".sidebar__link");

if (sidebar && menuToggle) {
  const menuToggleLabel = menuToggle.querySelector(".visually-hidden");

  const setMenuState = (isOpen) => {
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    if (menuToggleLabel) {
      menuToggleLabel.textContent = isOpen ? "Cerrar menú" : "Abrir menú";
    }
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(sidebar.classList.toggle("sidebar--open"));
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("sidebar--open");
      setMenuState(false);
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
      status.textContent = `Error: ${error.message || "No se ha podido enviar. Prueba por teléfono o email."}`;
      status.dataset.status = "error";
    } finally {
      submitButton.disabled = false;
    }
  });
}

// Friendly 404: gives users time to choose before returning them to the home page.
// WCAG 2.2.1: the countdown stops on any interaction and can be cancelled explicitly.
const redirectCountdown = document.querySelector("[data-redirect-countdown]");
const redirectTarget = document.querySelector("[data-redirect-target]");

if (redirectCountdown && redirectTarget) {
  let secondsLeft = Number.parseInt(redirectCountdown.dataset.redirectCountdown, 10);

  const redirectTimer = window.setInterval(() => {
    secondsLeft -= 1;
    redirectCountdown.textContent = String(Math.max(secondsLeft, 0));

    if (secondsLeft <= 0) {
      window.clearInterval(redirectTimer);
      window.location.href = redirectTarget.href;
    }
  }, 1000);

  const redirectNote = document.querySelector("[data-redirect-note]");

  const cancelRedirect = () => {
    window.clearInterval(redirectTimer);
    if (redirectNote) {
      redirectNote.textContent = "Redirección automática cancelada. Elige una opción cuando quieras.";
    }
  };

  // Safety net for assistive tech that fires click without pointer/key events.
  document.querySelector("[data-redirect-cancel]")?.addEventListener("click", cancelRedirect);

  ["keydown", "pointerdown"].forEach((eventType) => {
    document.addEventListener(eventType, cancelRedirect, { once: true });
  });
}
