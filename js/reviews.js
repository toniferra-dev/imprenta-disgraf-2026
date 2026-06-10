/**
 * Google reviews preview for the home page.
 * Public Google reviews captured on 2026-05-02 and summarized for on-site display.
 */

const reviewsSection = document.querySelector("[data-reviews-section]");
const reviewsList = document.querySelector("[data-reviews-list]");

const googleReviews = [
  {
    name: "Weronika Kacperski",
    rating: 5,
    dateLabel: "Hace 3 días",
    comment: "Destaca la calidad, rapidez, flexibilidad y trato humano de la imprenta."
  },
  {
    name: "Es Trasto",
    rating: 5,
    dateLabel: "2 semanas atrás",
    comment: "Valora muy positivamente al equipo y la experiencia con Disgraf."
  },
  {
    name: "Siauying Kam Paw",
    rating: 5,
    dateLabel: "Editado 2 semanas atrás",
    comment: "Cliente habitual para carteles, resalta colores, acabados profesionales y buen trato."
  },
  {
    name: "Sandra Perciante",
    rating: 5,
    dateLabel: "Hace un mes",
    comment: "Subraya el trato cercano y una entrega antes de la fecha prevista."
  },
  {
    name: "Amanda Barriga",
    rating: 5,
    dateLabel: "Hace un mes",
    comment: "Resume su experiencia como un trabajo profesional y muy satisfactorio."
  },
  {
    name: "Barbara Jimenez",
    rating: 5,
    dateLabel: "Hace un mes",
    comment: "Recomienda el servicio por el trato, la calidad y el trabajo realizado en una camiseta."
  },
  {
    name: "Jose Company",
    rating: 5,
    dateLabel: "Hace 4 meses",
    comment: "Encargó camisetas para un evento y destaca el resultado, la seriedad y el equipo."
  },
  {
    name: "Lola Abstracta",
    rating: 5,
    dateLabel: "Hace 4 meses",
    comment: "Considera a Disgraf una imprenta de referencia en Palma por trato, calidad, servicio y precio."
  },
  {
    name: "Neus PMI85",
    rating: 5,
    dateLabel: "Hace 5 meses",
    comment: "Destaca el trato personal, la sonrisa al recibir al cliente y un trabajo impecable."
  },
  {
    name: "Rosa Marina Prieto García",
    rating: 5,
    dateLabel: "Hace 7 meses",
    comment: "Valora la calidad de los trabajos y la variedad de encargos que puede resolver la imprenta."
  },
  {
    name: "Lluch Benjamín Durán Niell",
    rating: 5,
    dateLabel: "Hace 7 meses",
    comment: "Agradece la solución rápida de un imprevisto y la buena calidad de impresión."
  },
  {
    name: "Dayanara Tellez",
    rating: 5,
    dateLabel: "Hace 8 meses",
    comment: "Destaca rapidez, explicación técnica y ayuda para elegir el mejor papel."
  },
  {
    name: "Caterina Mas Coves",
    rating: 5,
    dateLabel: "Hace 8 meses",
    comment: "Resume el servicio como profesional, amable y muy recomendable."
  },
  {
    name: "Eli Lopez",
    rating: 5,
    dateLabel: "Hace 9 meses",
    comment: "Destaca la atención excelente y la profesionalidad del equipo."
  },
  {
    name: "miguel coll",
    rating: 5,
    dateLabel: "Hace 11 meses",
    comment: "Valora el servicio rápido, correcto y con buen precio."
  },
  {
    name: "Alba Mondejar Mellado",
    rating: 5,
    dateLabel: "Hace 11 meses",
    comment: "Recomienda la imprenta por eficacia, profesionalidad y amabilidad en la atención."
  },
  {
    name: "Jhoselyn Rojas",
    rating: 5,
    dateLabel: "Hace 11 meses",
    comment: "Cliente recurrente que afirma que Disgraf cumple y supera sus expectativas."
  },
  {
    name: "Alina Alina",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Encargó un lienzo y destaca la calidad de impresión, los colores y el resultado final."
  },
  {
    name: "corina gitlin",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Valora la eficiencia, la atención amable y el cumplimiento de plazos."
  },
  {
    name: "Harald Bunge",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Resume su experiencia con buen servicio, personal amable y precios adecuados."
  },
  {
    name: "Mirja Hukill",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Destaca servicio excelente, buena calidad y precio justo."
  },
  {
    name: "Isabel Cuesta",
    rating: 5,
    dateLabel: "Editado Hace un año",
    comment: "Recomienda la imprenta por atención, producto final y experiencia general."
  },
  {
    name: "Lorenzo Horrach Bautista",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Ha encargado camisetas, polos, lienzos y otros trabajos, destacando atención y resultado."
  },
  {
    name: "Venusia Marciano",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Valora la amabilidad del equipo, la profesionalidad y el buen trabajo realizado."
  },
  {
    name: "P M",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Destaca la atención amable y la calidad de impresión recibida."
  },
  {
    name: "Lulitas Designs",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Señala que entendieron bien lo que necesitaba y que la relación calidad precio fue buena."
  },
  {
    name: "francesca corso",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Valora el servicio rápido, las impresiones cuidadas y la intención de repetir."
  },
  {
    name: "Sebastiano Savoia",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Destaca profesionalidad, disponibilidad y puntualidad en sus necesidades de impresión."
  },
  {
    name: "Marta Miranda Garijo",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Agradece la atención, la mejora de la idea inicial y el cuidado en el resultado."
  },
  {
    name: "lupe moreno",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Recomienda Disgraf por calidad, servicio, amabilidad y capacidad resolutiva."
  },
  {
    name: "Eli Lorente",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Cliente de confianza durante años para distintos tipos de trabajos impresos."
  },
  {
    name: "Iván Pol Yebes",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Destaca rapidez y calidad en el trabajo realizado."
  },
  {
    name: "Antonia Barcelo",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Recomienda totalmente la imprenta por el trabajo y el trato recibido."
  },
  {
    name: "Sergio Pelaez Lavesiera",
    rating: 5,
    dateLabel: "Hace un año",
    comment: "Encargó tarjetas y valora la rapidez de entrega."
  },
  {
    name: "Vanessa Campos",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Recomienda el servicio por eficiencia y amabilidad."
  },
  {
    name: "Fernando",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Destaca profesionalidad, eficiencia y propuestas adaptadas a sus necesidades."
  },
  {
    name: "Ana Trallero",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Valora el servicio de imprenta y una atención especialmente amable."
  },
  {
    name: "Maria",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Encargó copias de un libro con rapidez y agradece la ayuda con la portada."
  },
  {
    name: "Melina Orellano",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Destaca el trabajo realizado y la atención recibida."
  },
  {
    name: "Valentín Alassia",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Resume su experiencia como excelente atención y servicio."
  },
  {
    name: "Pablo Rosillo",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Aprecia la rapidez, la amabilidad y la explicación previa antes de confirmar el encargo."
  },
  {
    name: "carlos cantallops molina",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Pidió una impresión para regalo y destaca el resultado, la rapidez y el trato."
  },
  {
    name: "Rosa Muntaner Cañellas",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Subraya la calidad del trabajo y un trato cercano y amable."
  },
  {
    name: "Estefania Fernandez",
    rating: 5,
    dateLabel: "Editado Hace 2 años",
    comment: "Valora la puntualidad, la buena actitud del equipo y la confianza que transmiten."
  },
  {
    name: "Sandra Jurado",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Destaca buen trato, calidad y variedad de trabajos, desde fotocopias hasta rótulos."
  },
  {
    name: "Antoni Morey Ramonell",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Agradece la solución para imprimir pegatinas y el precio razonable."
  },
  {
    name: "Sara",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Define Disgraf como nuevo sitio de confianza por servicio y rapidez."
  },
  {
    name: "Nelson Mendoza",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Destaca servicio excelente, amabilidad y calidad."
  },
  {
    name: "Kaja Ast",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Recomienda la imprenta tras su experiencia."
  },
  {
    name: "Eva Rivas Castell",
    rating: 5,
    dateLabel: "Hace 2 años",
    comment: "Encargó flyers, tarjetas y material para feria, destacando rapidez y buen trabajo."
  }
];

const getRandomReviews = (reviews, amount = 3) => {
  const favorableReviews = reviews.filter((review) => review.rating >= 4);

  return favorableReviews
    .map((review) => ({ review, sort: Math.random() }))
    .sort((current, next) => current.sort - next.sort)
    .slice(0, amount)
    .map(({ review }) => review);
};

const formatReviewDate = (isoDate, dateLabel) => {
  if (dateLabel) {
    return dateLabel;
  }

  const date = new Date(`${isoDate}T00:00:00`);

  return new Intl.DateTimeFormat("es-ES", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const createReviewCard = ({ name, rating, date, dateLabel, comment }) => {
  const card = document.createElement("article");
  card.className = "review-card";

  const header = document.createElement("div");
  header.className = "review-card__header";

  const title = document.createElement("h3");
  title.className = "review-card__name";
  title.textContent = name;

  const stars = document.createElement("p");
  stars.className = "review-card__stars";

  const starsVisual = document.createElement("span");
  starsVisual.setAttribute("aria-hidden", "true");
  starsVisual.textContent = "★".repeat(rating) + "☆".repeat(5 - rating);

  const starsText = document.createElement("span");
  starsText.className = "visually-hidden";
  starsText.textContent = `Valoración: ${rating} de 5 estrellas`;

  stars.append(starsVisual, starsText);

  const meta = document.createElement("p");
  meta.className = "review-card__meta";
  meta.textContent = `Google · ${formatReviewDate(date, dateLabel)}`;

  const text = document.createElement("p");
  text.className = "review-card__text";
  text.textContent = comment;

  header.append(title, stars);
  card.append(header, meta, text);

  return card;
};

if (reviewsSection && reviewsList) {
  const randomReviews = getRandomReviews(googleReviews);

  if (randomReviews.length === 0) {
    reviewsSection.hidden = true;
  } else {
    const fragment = document.createDocumentFragment();

    randomReviews.forEach((review) => {
      fragment.append(createReviewCard(review));
    });

    reviewsList.append(fragment);
  }
}
