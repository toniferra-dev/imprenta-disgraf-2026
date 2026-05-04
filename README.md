# Imprenta Disgraf 2026

Sitio web estático para Imprenta Disgraf, imprenta física ubicada en Palma de Mallorca. El proyecto está construido con HTML, CSS y JavaScript vanilla, con foco en SEO local, rendimiento, accesibilidad básica y mantenimiento sencillo antes del despliegue en Vercel.

## Repositorio

- GitHub: `https://github.com/toniferra-dev/imprenta-disgraf-2026`
- Web: `https://www.imprentadisgraf.com`

## Inicio rápido

```bash
git clone https://github.com/toniferra-dev/imprenta-disgraf-2026.git
cd imprenta-disgraf-2026
python3 -m http.server 8000
```

## Objetivo

Crear una web multipágina clara para Google y útil para clientes locales:

- Imprenta en Palma de Mallorca.
- Servicios concretos con una intención SEO por URL.
- Contacto presencial, teléfono, email y Google Maps como vías principales de conversión.
- Sin ecommerce ni pedidos online.
- Presupuesto personalizado y recogida física en Calle Manacor 36.
- Rotulación enfocada a negocios, escaparates, interiores, eventos y vehículos comerciales, sin crear una landing específica de rotulación de vehículos.

## Stack

- HTML semántico.
- CSS vanilla con metodología BEM.
- JavaScript vanilla progresivo.
- Imágenes responsive con `<picture>`, AVIF y JPG fallback.
- Sitemap y robots preparados para producción.

No hay framework, bundler ni paso de build obligatorio.

## Estructura

```txt
website/
|-- index.html
|-- servicios-imprenta-palma.html
|-- rotulos-rotulacion-mallorca.html
|-- tarjetas-visita-palma.html
|-- photocall-mallorca.html
|-- impresion-catalogos-mallorca.html
|-- camisetas-personalizadas-mallorca.html
|-- impresion-digital-palma.html
|-- trabajos-imprenta-mallorca.html
|-- presupuesto-imprenta-palma.html
|-- contacto-imprenta-palma.html
|-- 404.html
|-- aviso-legal.html
|-- condiciones-uso.html
|-- cookies.html
|-- politica-privacidad.html
|-- css/
|   |-- modern-normalize.css
|   `-- styles.css
|-- js/
|   |-- main.js
|   |-- cookies.js
|   `-- reviews.js
|-- api/
|   `-- presupuesto.js
|-- img/
|-- favicon.svg
|-- site.webmanifest
|-- robots.txt
`-- sitemap.xml
```

## Páginas SEO principales

| Página | Intención |
| --- | --- |
| `index.html` | Imprenta en Palma de Mallorca |
| `servicios-imprenta-palma.html` | Hub de servicios de imprenta |
| `rotulos-rotulacion-mallorca.html` | Rótulos y rotulación genérica |
| `tarjetas-visita-palma.html` | Tarjetas de visita en Palma |
| `photocall-mallorca.html` | Photocalls personalizados en Mallorca |
| `impresion-catalogos-mallorca.html` | Catálogos impresos en Mallorca |
| `camisetas-personalizadas-mallorca.html` | Camisetas personalizadas en Mallorca |
| `impresion-digital-palma.html` | Impresión digital en Palma |
| `trabajos-imprenta-mallorca.html` | Portfolio de trabajos |
| `presupuesto-imprenta-palma.html` | Solicitud de presupuesto |
| `contacto-imprenta-palma.html` | Contacto, dirección y Google Maps |

Las páginas legales están marcadas como `noindex, follow` y no están incluidas en el sitemap.

## Ver en local

Como es una web estática, se puede abrir directamente:

```txt
file:///ruta/al/proyecto/website/index.html
```

También se puede servir con cualquier servidor estático local:

```bash
python3 -m http.server 8000
```

Después abrir:

```txt
http://localhost:8000
```

## SEO

El proyecto incluye:

- `title` y `meta description` por página.
- `canonical` por URL.
- Open Graph en páginas indexables.
- `robots.txt`.
- `sitemap.xml` con `lastmod`.
- `404.html` amable, con `noindex` y redirección suave a inicio.
- Datos estructurados `LocalBusiness`, `Service`, `CollectionPage` e `ImageObject` donde aplica.
- Arquitectura multipágina basada en intención de búsqueda.

No se añade schema de reseñas para evitar riesgos con reseñas propias/self-serving.

## Imágenes

Las imágenes raster se implementan con:

- `<picture>`.
- AVIF como formato preferente.
- JPG como fallback.
- `srcset` y `sizes`.
- `width` y `height`.
- `fetchpriority="high"` en imágenes hero.
- `loading="lazy"` en imágenes no críticas.

El logo está en SVG.

## JavaScript

### `main.js`

Mejoras progresivas:

- Menú lateral responsive.
- Estado activo de navegación.
- Formulario de presupuesto conectado a la API serverless de Vercel.

### `api/presupuesto.js`

Endpoint serverless para enviar solicitudes de presupuesto por email usando Resend.

Variables de entorno necesarias en Vercel:

- `RESEND_API_KEY`: API key de Resend.
- `QUOTE_TO_EMAIL`: email receptor final, `info@imprentadisgraf.com`.
- `QUOTE_FROM_EMAIL`: remitente verificado en Resend, `Imprenta Disgraf <info@imprentadisgraf.com>`.

El formulario incluye validación básica, campo honeypot antispam y `reply_to` con el email introducido por el cliente.

### `cookies.js`

Gestor de consentimiento:

- Categorías: necesarias, analítica, personalización y marketing.
- Persistencia en `localStorage` y cookie propia.
- Modal accesible con `aria-modal`, `aria-describedby`, focus trap y retorno de foco.
- API global: `window.DisgrafCookies.hasConsent(category)`.

### `reviews.js`

Muestra 3 reseñas aleatorias en cada carga de la home.

El array contiene 50 resúmenes de reseñas públicas de Google capturadas el `2026-05-02`. Los textos están resumidos para uso editorial en la web.

## Contacto real

- Teléfono: `971 60 69 59`
- Móvil: `678 53 56 91`
- Email: `info@imprentadisgraf.com`
- Dirección: `Calle Manacor 36, 07006 Palma de Mallorca`

## Antes de desplegar

Checklist recomendado:

- Revisar que el dominio definitivo sea `https://www.imprentadisgraf.com/`.
- Confirmar si se mantienen URLs con `.html` o se configuran URLs limpias en Vercel.
- Configurar `RESEND_API_KEY`, `QUOTE_TO_EMAIL` y `QUOTE_FROM_EMAIL` en Vercel.
- Revisar email final del formulario de presupuesto antes de activar producción.
- Conectar Google Search Console tras deploy.
- Enviar `sitemap.xml` en Search Console.
- Actualizar el enlace de la web en Google Business Profile.
- Revisar reseñas de Google periódicamente.

## Git

El repositorio incluye `.gitignore` para evitar subir archivos locales de macOS, configuración de editores, variables de entorno, logs, dependencias, salidas de build, metadatos locales de Vercel y artefactos de test.

## Autoría

Proyecto diseñado y desarrollado por Toni Ferrà.

- Estrategia SEO local.
- Arquitectura web.
- Diseño UI.
- Desarrollo HTML, CSS y JavaScript.
- Preparación para GitHub y despliegue en Vercel.

## Licencia y uso

Proyecto creado para Imprenta Disgraf. El contenido, imágenes, diseño y código se preparan para este cliente y no deberían reutilizarse como plantilla pública sin autorización.
