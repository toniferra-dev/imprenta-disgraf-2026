/**
 * Lightweight consent manager for the static site.
 * Non-essential scripts must check window.DisgrafCookies.hasConsent(category).
 */

const cookieConsentConfig = {
  storageKey: "disgraf_cookie_consent",
  cookieName: "disgraf_cookie_consent",
  version: "2026-05-02",
  categories: {
    necessary: true,
    analytics: false,
    personalization: false,
    marketing: false,
  },
};

const cookieCopy = {
  analytics: {
    title: "Analítica",
    text: "Nos ayuda a medir visitas y entender qué páginas funcionan mejor. No se activará sin permiso.",
  },
  personalization: {
    title: "Personalización",
    text: "Permite recordar preferencias de navegación o configuración cuando añadamos funciones que lo necesiten.",
  },
  marketing: {
    title: "Marketing",
    text: "Permitiría medir campañas o activar píxeles publicitarios. Actualmente no se carga nada de marketing sin consentimiento.",
  },
};

const readConsent = () => {
  try {
    const storedConsent = window.localStorage.getItem(cookieConsentConfig.storageKey);
    return storedConsent ? JSON.parse(storedConsent) : null;
  } catch {
    return null;
  }
};

const writeConsentCookie = (consent) => {
  const encodedConsent = encodeURIComponent(JSON.stringify({
    version: consent.version,
    categories: consent.categories,
  }));

  document.cookie = `${cookieConsentConfig.cookieName}=${encodedConsent}; Max-Age=15552000; Path=/; SameSite=Lax`;
};

const saveConsent = (categories) => {
  const consent = {
    version: cookieConsentConfig.version,
    updatedAt: new Date().toISOString(),
    categories: {
      ...cookieConsentConfig.categories,
      ...categories,
      necessary: true,
    },
  };

  window.localStorage.setItem(cookieConsentConfig.storageKey, JSON.stringify(consent));
  writeConsentCookie(consent);
  window.dispatchEvent(new CustomEvent("disgraf:cookie-consent", { detail: consent }));

  return consent;
};

const hasConsent = (category) => {
  const consent = readConsent();
  return Boolean(consent?.categories?.[category]);
};

const removeConsentUi = () => {
  document.querySelector("[data-cookie-consent]")?.remove();
  document.querySelector("[data-cookie-preferences]")?.remove();
  document.body.classList.remove("cookie-modal-open");
};

const buildToggle = (category, checked = false) => {
  const copy = cookieCopy[category];

  return `
    <label class="cookie-toggle">
      <span class="cookie-toggle__text">
        <strong>${copy.title}</strong>
        <span>${copy.text}</span>
      </span>
      <input class="cookie-toggle__input" type="checkbox" name="${category}" ${checked ? "checked" : ""}>
      <span class="cookie-toggle__control" aria-hidden="true"></span>
    </label>
  `;
};

const openPreferences = () => {
  const currentConsent = readConsent();
  const categories = currentConsent?.categories || cookieConsentConfig.categories;

  document.querySelector("[data-cookie-preferences]")?.remove();
  document.body.classList.add("cookie-modal-open");

  const modal = document.createElement("div");
  modal.className = "cookie-modal";
  modal.dataset.cookiePreferences = "";
  modal.innerHTML = `
    <div class="cookie-modal__dialog" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
      <div class="cookie-modal__header">
        <p class="section-kicker">Preferencias de privacidad</p>
        <h2 class="cookie-modal__title" id="cookie-modal-title">Configurar cookies</h2>
        <button class="cookie-modal__close" type="button" data-cookie-close aria-label="Cerrar preferencias">×</button>
      </div>
      <div class="cookie-modal__body">
        <div class="cookie-toggle cookie-toggle--locked">
          <span class="cookie-toggle__text">
            <strong>Necesarias</strong>
            <span>Imprescindibles para recordar tu elección, seguridad básica y funcionamiento del sitio. Siempre activas.</span>
          </span>
          <input class="cookie-toggle__input" type="checkbox" checked disabled>
          <span class="cookie-toggle__control" aria-hidden="true"></span>
        </div>
        ${buildToggle("analytics", categories.analytics)}
        ${buildToggle("personalization", categories.personalization)}
        ${buildToggle("marketing", categories.marketing)}
      </div>
      <div class="cookie-modal__actions">
        <button class="button button--secondary" type="button" data-cookie-reject>Rechazar no esenciales</button>
        <button class="button button--secondary" type="button" data-cookie-save>Guardar selección</button>
        <button class="button button--primary" type="button" data-cookie-accept>Aceptar todas</button>
      </div>
    </div>
  `;

  document.body.append(modal);
  modal.querySelector("[data-cookie-close]").focus();
};

const showBanner = () => {
  if (document.querySelector("[data-cookie-consent]")) return;

  const banner = document.createElement("aside");
  banner.className = "cookie-banner";
  banner.dataset.cookieConsent = "";
  banner.setAttribute("aria-label", "Aviso de cookies");
  banner.innerHTML = `
    <div class="cookie-banner__content">
      <p class="section-kicker">Privacidad</p>
      <h2 class="cookie-banner__title">Control de cookies</h2>
      <p class="cookie-banner__text">Usamos cookies necesarias para que la web funcione. Las cookies de analítica, personalización o marketing solo se activarán si las aceptas o configuras.</p>
    </div>
    <div class="cookie-banner__actions">
      <button class="button button--secondary" type="button" data-cookie-reject>Rechazar no esenciales</button>
      <button class="button button--secondary" type="button" data-cookie-settings>Configurar</button>
      <button class="button button--primary" type="button" data-cookie-accept>Aceptar todas</button>
    </div>
  `;

  document.body.append(banner);
};

const acceptAll = () => {
  saveConsent({
    analytics: true,
    personalization: true,
    marketing: true,
  });
  removeConsentUi();
};

const rejectAll = () => {
  saveConsent({
    analytics: false,
    personalization: false,
    marketing: false,
  });
  removeConsentUi();
};

const saveSelection = () => {
  const modal = document.querySelector("[data-cookie-preferences]");
  if (!modal) return;

  saveConsent({
    analytics: modal.querySelector("[name='analytics']")?.checked || false,
    personalization: modal.querySelector("[name='personalization']")?.checked || false,
    marketing: modal.querySelector("[name='marketing']")?.checked || false,
  });
  removeConsentUi();
};

document.addEventListener("click", (event) => {
  const target = event.target.closest("button");
  if (!target) return;

  if (target.matches("[data-cookie-accept]")) acceptAll();
  if (target.matches("[data-cookie-reject]")) rejectAll();
  if (target.matches("[data-cookie-settings]")) openPreferences();
  if (target.matches("[data-cookie-save]")) saveSelection();
  if (target.matches("[data-cookie-close]")) removeConsentUi();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") removeConsentUi();
});

window.DisgrafCookies = {
  hasConsent,
  openPreferences,
  readConsent,
};

document.addEventListener("DOMContentLoaded", () => {
  const consent = readConsent();
  const needsRefresh = consent?.version !== cookieConsentConfig.version;

  document.querySelectorAll("[data-cookie-open]").forEach((button) => {
    button.addEventListener("click", openPreferences);
  });

  if (!consent || needsRefresh) {
    showBanner();
  }
});
