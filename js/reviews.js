/**
 * Google reviews preview for the home page.
 * Replace the sample data with verified Google Business Profile reviews before production.
 */

const reviewsSection = document.querySelector("[data-reviews-section]");
const reviewsList = document.querySelector("[data-reviews-list]");

const googleReviews = [
  {
    name: "María G.",
    rating: 5,
    date: "2026-04-12",
    comment: "Muy buen trato y asesoramiento. Nos ayudaron con unas tarjetas de visita y el resultado quedó muy profesional.",
  },
  {
    name: "Comercio local",
    rating: 5,
    date: "2026-03-20",
    comment: "Rapidez, cercanía y buena calidad de impresión. Ideal poder hablar el trabajo directamente en la imprenta.",
  },
  {
    name: "Carlos R.",
    rating: 4,
    date: "2026-02-08",
    comment: "Nos prepararon material para una campaña en tienda y revisaron los archivos antes de imprimir. Todo correcto.",
  },
  {
    name: "Empresa de Palma",
    rating: 5,
    date: "2026-01-17",
    comment: "Buen acabado en catálogos y atención clara desde el primer presupuesto. Repetiremos para próximas tiradas.",
  },
  {
    name: "Laura M.",
    rating: 5,
    date: "2025-12-11",
    comment: "Trabajo cuidado y comunicación fácil por email. La recogida en Calle Manacor fue muy cómoda.",
  },
  {
    name: "Cliente de Mallorca",
    rating: 4,
    date: "2025-11-05",
    comment: "Nos orientaron con materiales y tamaños para un photocall. Resultado sólido y entregado en plazo.",
  },
];

const getMonthlySeed = () => {
  const today = new Date();

  return today.getFullYear() * 100 + today.getMonth() + 1;
};

const seededRandom = (seed) => {
  let value = seed % 2147483647;

  if (value <= 0) {
    value += 2147483646;
  }

  return () => {
    value = (value * 16807) % 2147483647;

    return (value - 1) / 2147483646;
  };
};

const getMonthlyReviews = (reviews, amount = 3) => {
  const favorableReviews = reviews.filter((review) => review.rating >= 4);
  const random = seededRandom(getMonthlySeed());

  return favorableReviews
    .map((review) => ({ review, sort: random() }))
    .sort((current, next) => current.sort - next.sort)
    .slice(0, amount)
    .map(({ review }) => review);
};

const formatReviewDate = (isoDate) => {
  const date = new Date(`${isoDate}T00:00:00`);

  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const createReviewCard = ({ name, rating, date, comment }) => {
  const card = document.createElement("article");
  card.className = "review-card";

  const header = document.createElement("div");
  header.className = "review-card__header";

  const title = document.createElement("h3");
  title.className = "review-card__name";
  title.textContent = name;

  const stars = document.createElement("p");
  stars.className = "review-card__stars";
  stars.setAttribute("aria-label", `${rating} de 5 estrellas`);
  stars.textContent = "★".repeat(rating) + "☆".repeat(5 - rating);

  const meta = document.createElement("p");
  meta.className = "review-card__meta";
  meta.textContent = `Google · ${formatReviewDate(date)}`;

  const text = document.createElement("p");
  text.className = "review-card__text";
  text.textContent = comment;

  header.append(title, stars);
  card.append(header, meta, text);

  return card;
};

if (reviewsSection && reviewsList) {
  const monthlyReviews = getMonthlyReviews(googleReviews);

  if (monthlyReviews.length === 0) {
    reviewsSection.hidden = true;
  } else {
    const fragment = document.createDocumentFragment();

    monthlyReviews.forEach((review) => {
      fragment.append(createReviewCard(review));
    });

    reviewsList.append(fragment);
  }
}
