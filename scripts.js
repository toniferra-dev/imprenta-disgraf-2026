/**
 * Small progressive enhancements for the static site.
 * The page remains usable without JavaScript: navigation anchors and mailto form still work.
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

// Keep the active sidebar state aligned with the section currently in view.
const observedSections = [...document.querySelectorAll("main section[id]")];
const linksById = new Map(
  [...menuLinks]
    .map((link) => [link.getAttribute("href")?.replace("#", ""), link])
    .filter(([id]) => id)
);

if ("IntersectionObserver" in window && observedSections.length > 0) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      menuLinks.forEach((link) => {
        link.classList.remove("sidebar__link--active");
        link.removeAttribute("aria-current");
      });

      const activeLink = linksById.get(visible.target.id);
      if (activeLink) {
        activeLink.classList.add("sidebar__link--active");
        activeLink.setAttribute("aria-current", "page");
      }
    },
    { rootMargin: "-30% 0px -55% 0px", threshold: [0.2, 0.6] }
  );

  observedSections.forEach((section) => observer.observe(section));
}
