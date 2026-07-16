// Build a connected static site from the section folders.
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = __dirname;
const outDir = path.join(root, 'site');
const assetsDir = path.join(outDir, 'assets');
// Start assets from a clean slate so stale files (old PNGs, renamed images)
// don't linger and bloat the deploy. tw.css is written afterwards by the CLI.
fs.rmSync(assetsDir, { recursive: true, force: true });
fs.mkdirSync(assetsDir, { recursive: true });

// --- Images: optimize source photos to WebP (width = max output width) ------
const images = [
  { from: 'fondo/bc5b47e9-9e73-44e9-b678-bbbba545f417.png',            to: 'hero-wide.webp',          width: 1920, q: 74 },
  { from: 'Info/ChatGPT Image 15 jul 2026, 06_06_43 p.m..png',         to: 'estudio-fisico.webp',     width: 1100, q: 78 },
  { from: 'Info/baeef1c5-f404-4c89-a4fc-3dca5ec9ded6.png',             to: 'estudio-bg.webp',         width: 1920, q: 74 },
  { from: 'Info/b8c11939-8400-44f0-9136-d69e39ec1ddd.png',             to: 'diferenciales-dark.webp', width: 1920, q: 76 },
  { from: 'Fotos/Captura de pantalla 2026-07-16 150852.png',           to: 'proj-gastronomia.webp',   width: 900,  q: 76 },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151008.png',           to: 'proj-cocteleria.webp',    width: 900,  q: 76 },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151052.png',           to: 'proj-moda.webp',          width: 900,  q: 76 },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151201.png',           to: 'proj-nupcial.webp',       width: 900,  q: 76 },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151251.png',           to: 'proj-danza.webp',         width: 900,  q: 76 },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151336.png',           to: 'proj-retrato.webp',       width: 900,  q: 76 },
];

async function processImages() {
  // Favicon monogram (small) — copy as-is.
  fs.copyFileSync(
    path.join(root, 'Info/472154790_2341703699501172_7768970952726760596_n.jpg'),
    path.join(assetsDir, 'pantheon-monogram.jpg')
  );
  for (const img of images) {
    await sharp(path.join(root, img.from))
      .resize({ width: img.width, withoutEnlargement: true })
      .webp({ quality: img.q })
      .toFile(path.join(assetsDir, img.to));
  }
  console.log(`optimized ${images.length} images -> webp`);
}

// --- Location data ----------------------------------------------------------
const MAPS_URL = 'https://www.google.com/maps/place/Pantheon+Studio/@4.1406284,-73.6396253,21z/data=!4m6!3m5!1s0x72f27ecc9ff7773:0x3741a4f662c5f025!8m2!3d4.1406284!4d-73.6394644!16s%2Fg%2F11ss6k95l0?entry=ttu';
const MAPS_EMBED = 'https://www.google.com/maps?q=4.1406284,-73.6394644&z=17&hl=es&output=embed';

// --- WhatsApp ---------------------------------------------------------------
const WHATSAPP_URL = 'https://api.whatsapp.com/send/?phone=573159041646&text&type=phone_number&app_absent=0&utm_source=ig';

// --- Instagram --------------------------------------------------------------
const INSTAGRAM_URL = 'https://www.instagram.com/pantheonstudio.com.co/';

// source folder -> output filename
const pages = [
  { src: 'Home',        out: 'index.html',      sections: ['ubicacion'], title: 'Pantheon Studio | Producción Audiovisual & Fotografía' },
  { src: 'Servicios',   out: 'servicios.html',  sections: ['ubicacion'], title: 'Servicios | Pantheon Studio' },
  { src: 'Proyectos',   out: 'proyectos.html',  sections: [],            title: 'Proyectos | Pantheon Studio' },
  { src: 'Cotización',  out: 'cotizacion.html', sections: ['ubicacion'], title: 'Cotización | Pantheon Studio' },
];

// --- Injected content sections (design-system styled) -----------------------
function hoursRow(days, hours) {
  return `
      <div class="flex justify-between items-baseline gap-6 border-b border-outline-variant/15 pb-4">
        <span class="font-body-md text-body-md text-on-surface">${days}</span>
        <span class="font-body-md text-body-md text-on-surface-variant whitespace-nowrap">${hours}</span>
      </div>`;
}

// Ubicación (mapa) + Horario de atención al final de la misma sección.
const ubicacionSection = `
<!-- Ubicación / Mapa + Horario de atención -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto border-t border-outline-variant/10">
  <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
    <div class="md:col-span-4 mb-12 md:mb-0">
      <p class="font-label-sm text-label-sm text-primary uppercase tracking-widest mb-3">Ubicación</p>
      <h2 class="font-display-md text-display-md mb-8">Visítanos en el estudio</h2>
      <p class="font-body-lg text-body-lg text-on-surface-variant mb-2">Pantheon Studio</p>
      <p class="font-body-md text-body-md text-on-surface-variant mb-10">Villavicencio, Meta — Colombia</p>
      <a href="${MAPS_URL}" target="_blank" rel="noopener" class="inline-flex items-center gap-4 font-label-sm text-label-sm uppercase tracking-widest text-primary hover:gap-6 transition-all">
        Cómo llegar <span class="material-symbols-outlined">arrow_right_alt</span>
      </a>
    </div>
    <div class="md:col-span-8">
      <div class="aspect-video overflow-hidden border border-outline-variant/30 bg-surface-container">
        <iframe src="${MAPS_EMBED}" width="100%" height="100%" style="border:0; filter: grayscale(0.4) invert(0.92) contrast(0.85) brightness(0.9);" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Ubicación Pantheon Studio"></iframe>
      </div>
    </div>
  </div>

  <!-- Horario de atención -->
  <div class="mt-16 pt-12 border-t border-outline-variant/20 grid grid-cols-1 md:grid-cols-12 gap-gutter">
    <p class="md:col-span-4 font-label-sm text-label-sm text-primary uppercase tracking-widest">Horario de atención</p>
    <div class="md:col-span-8 space-y-4">
      ${hoursRow('Lunes a Viernes', '8:00 a.m. – 10:00 p.m.')}
      ${hoursRow('Sábados, Domingos y Festivos', '8:00 a.m. – 10:00 p.m.')}
    </div>
  </div>
</section>
`;

const sectionHtml = { ubicacion: ubicacionSection };

// --- Brand logo (vector recreation of the wordmark, transparent, crisp) -----
// "PANTHEON" in Bodoni Moda + "studio" in Inter Light — the real brand fonts,
// already loaded on every page, so it renders at infinite quality with no bg.
const LOGO_CSS = `
<style id="pantheon-logo">
  .ph-logo{display:inline-flex;align-items:center;gap:.34em;line-height:1;white-space:nowrap;color:#f4f1ea;text-decoration:none;}
  .ph-logo__word{font-family:'Bodoni Moda',serif;font-weight:400;font-size:1em;letter-spacing:.05em;}
  .ph-logo__sub{font-family:'Inter',sans-serif;font-weight:300;font-size:.34em;letter-spacing:.42em;text-transform:lowercase;padding-left:.06em;opacity:.92;}
  .ph-logo:hover .ph-logo__sub{color:#dac49a;opacity:1;transition:color .3s;}
  /* CTA "Cotizar proyecto": sin recuadro, se ilumina al pasar el cursor */
  .cta-glow{border:0;background:transparent;color:#dac49a;font-family:'Inter',sans-serif;font-weight:600;font-size:12px;line-height:1;letter-spacing:.12em;text-transform:uppercase;cursor:pointer;padding:.5rem .25rem;white-space:nowrap;transition:color .4s ease,text-shadow .4s ease;}
  .cta-glow:hover{color:#f7e0b4;text-shadow:0 0 10px rgba(218,196,154,.9),0 0 22px rgba(218,196,154,.5);}
</style>
`;

// No aria-label: the visible wordmark ("PANTHEON studio") is the accessible
// name, so it never mismatches (axe: label-content-name-mismatch).
const WORDMARK_NAV = '<a href="index.html" class="ph-logo shrink-0 text-[20px] md:text-[26px]"><span class="ph-logo__word">PANTHEON</span><span class="ph-logo__sub">studio</span></a>';
const WORDMARK_FOOTER = '<span class="ph-logo text-[34px] md:text-[48px] mb-10"><span class="ph-logo__word">PANTHEON</span><span class="ph-logo__sub">studio</span></span>';

function applyLogos(html) {
  // Nav brand: any <a>/<div> with tracking-tighter whose text is Pantheon/PANTHEON
  html = html.replace(
    /<(a|div)\b[^>]*tracking-tighter[^>]*>\s*(?:PANTHEON|Pantheon)\s*<\/(a|div)>/g,
    WORDMARK_NAV
  );
  // Footer brand: <div>/<h2> with font-display-lg whose text is PANTHEON
  html = html.replace(
    /<(div|h2)\b[^>]*font-display-lg[^>]*>\s*PANTHEON\s*<\/(div|h2)>/g,
    WORDMARK_FOOTER
  );
  return html;
}

// --- Home hero: full studio image as a fixed background (uncropped, max
// quality). The hero is a transparent full-screen spacer so the image shows
// through; the scrolling content sits on a solid backdrop; a top arrow toggles
// the whole interface so the background can be admired on its own. -----------
const NEW_HERO = `<!-- Cinematic Hero -->
<section id="hero-section" class="relative w-full h-screen overflow-hidden bg-[#0e0e0e]">
<img class="hero-main absolute inset-0 w-full h-full object-cover" src="assets/hero-wide.webp" alt="Pantheon Studio — set de producción con el monograma iluminado" width="1672" height="941" fetchpriority="high" decoding="async"/>
</section>
`;

// "Selected Projects" -> grilla editorial con fotos reales del estudio.
const projects = [
  { img: 'proj-gastronomia.webp', w: 600, h: 873, cat: 'Gastronomía',        title: 'Alta Cocina',        alt: 'Fotografía gastronómica de un plato de sashimi sobre lino' },
  { img: 'proj-cocteleria.webp',  w: 587, h: 869, cat: 'Coctelería',          title: 'Mixología de Autor', alt: 'Fotografía de coctelería, un cóctel sobre mesa de madera' },
  { img: 'proj-moda.webp',        w: 680, h: 852, cat: 'Editorial de Moda',   title: 'Statement',          alt: 'Editorial de moda con botas plataforma blancas en estudio' },
  { img: 'proj-nupcial.webp',     w: 593, h: 859, cat: 'Retrato Editorial',   title: 'Serenidad',          alt: 'Retrato editorial de una mujer con ramo de flores' },
  { img: 'proj-danza.webp',       w: 636, h: 857, cat: 'Danza & Movimiento',  title: 'Ingravidez',         alt: 'Bailarina en salto dentro del estudio' },
  { img: 'proj-retrato.webp',     w: 634, h: 868, cat: 'Retrato',             title: 'Carácter',           alt: 'Retrato de estudio de una mujer con chaqueta de cuero' },
];

const projectCards = projects.map((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  return `
    <article class="break-inside-avoid mb-gutter group relative overflow-hidden bg-surface-container cursor-pointer">
      <img class="block w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" src="assets/${p.img}" alt="${p.alt}" width="${p.w}" height="${p.h}" loading="lazy" decoding="async"/>
      <span class="absolute inset-0 z-20 ring-1 ring-inset ring-outline-variant/15 group-hover:ring-primary/30 transition-colors duration-500 pointer-events-none"></span>
      <div class="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/15 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500"></div>
      <div class="absolute inset-x-0 bottom-0 z-20 p-6 flex items-end justify-between gap-4">
        <div class="translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
          <span class="font-label-xs text-label-xs text-primary uppercase tracking-[0.2em]">${p.cat}</span>
          <h3 class="font-headline-md text-headline-md mt-1 leading-tight">${p.title}</h3>
          <div class="mt-3 h-px w-8 bg-primary/50 group-hover:w-16 transition-all duration-500"></div>
        </div>
        <span class="font-display-md text-display-md leading-none text-on-surface/25 group-hover:text-primary/70 transition-colors duration-500">${n}</span>
      </div>
    </article>`;
}).join('\n');

const SELECTED_PROJECTS = `<!-- Selected Projects Editorial Grid -->
<section class="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
  <div class="flex flex-col md:flex-row md:justify-between md:items-end mb-16 md:mb-24 gap-6">
    <div>
      <p class="font-label-sm text-label-sm text-primary uppercase tracking-[0.25em] mb-4">Portafolio</p>
      <h2 class="font-display-md text-display-md leading-[1.02]">Selected Projects</h2>
    </div>
    <p class="font-body-md text-body-md text-on-surface-variant max-w-xs md:text-right">Una selección de nuestro trabajo en fotografía y producción visual para marcas exigentes.</p>
  </div>
  <div class="columns-1 sm:columns-2 lg:columns-3 gap-gutter [column-fill:balance]">
${projectCards}
  </div>
</section>
`;

// Remodelación de "Why Pantheon" (Diferenciales) -> solo la imagen a ancho
// completo, mostrada íntegra (16:9) para no recortar el texto integrado.
const DIFERENCIALES = `<!-- Why Pantheon -->
<section class="w-full bg-background overflow-hidden">
  <img src="assets/diferenciales-dark.webp" alt="Diferenciales de Pantheon Studio: Narrativa Cinematográfica, Diseño de Set y Calidad Publicitaria" width="1672" height="941" loading="lazy" decoding="async" class="block w-full h-auto"/>
</section>
`;

// Remodelación de "Studio Showcase" -> imagen del interior como fondo,
// con el texto en la esquina inferior izquierda (no tapa el wordmark ni la escena).
const STUDIO_SHOWCASE = `<!-- Studio Showcase -->
<section class="relative min-h-[85vh] flex items-end overflow-hidden bg-[#0e0e0e]">
  <img src="assets/estudio-bg.webp" alt="Interior del estudio Pantheon durante una producción, con iluminación cinematográfica" width="1672" height="941" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover object-center"/>
  <!-- Degradado para legibilidad: oscurece la base sin tapar el centro. -->
  <div class="absolute inset-0 bg-gradient-to-t from-background via-background/45 via-30% to-transparent to-70% pointer-events-none"></div>
  <!-- Texto: esquina inferior derecha (zona marcada) -->
  <div class="relative z-10 w-full px-margin-mobile md:px-margin-desktop pb-16 md:pb-24">
    <div class="max-w-md md:ml-auto">
      <h2 class="font-display-md text-headline-lg leading-[1.1] mb-6">Un espacio preparado para producir</h2>
      <p class="font-body-lg text-body-lg text-on-surface-variant max-w-md mb-8">
        Tecnología de vanguardia y ambientes controlados, diseñados para la máxima creatividad visual.
      </p>
      <a href="cotizacion.html" class="inline-flex items-center gap-4 font-label-sm text-label-sm uppercase tracking-widest text-primary hover:gap-6 transition-all">
        Tour del estudio <span class="material-symbols-outlined">arrow_right_alt</span>
      </a>
    </div>
  </div>
</section>
`;

// Remodelación de "Strategic Statement" -> vitrina del estudio físico.
// Imagen a sangre por la izquierda (full-bleed) y de gran tamaño; texto a la derecha.
const EL_ESTUDIO = `<!-- El Estudio -->
<section class="bg-surface-container-lowest overflow-hidden">
  <div class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
    <!-- Imagen del estudio físico (full-bleed izquierda, altura completa, esquinas rectas) -->
    <figure class="md:col-span-6 lg:col-span-6 relative h-[60vh] md:h-[90vh] overflow-hidden bg-surface-container group">
      <img src="assets/estudio-fisico.webp" alt="Fachada de Pantheon Studio en Villavicencio, Colombia" width="991" height="1588" loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"/>
      <span class="absolute inset-0 ring-1 ring-inset ring-outline-variant/20 pointer-events-none"></span>
    </figure>
    <!-- Texto -->
    <div class="md:col-span-5 md:col-start-8 px-margin-mobile md:px-0 md:pr-margin-desktop py-16 md:py-0">
      <p class="font-label-sm text-label-sm text-primary uppercase tracking-[0.25em] mb-6">El Estudio</p>
      <h2 class="font-display-md text-display-md leading-[1.05] mb-8">Un espacio propio, diseñado para <span class="italic text-primary">crear</span>.</h2>
      <p class="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-12 max-w-xl">
        En el corazón de Villavicencio reunimos set, iluminación y postproducción bajo un mismo techo. Un entorno controlado, cuidado hasta el último detalle, donde cada producción cobra vida con precisión cinematográfica.
      </p>
      <div class="w-full h-px bg-outline-variant/20 mb-8"></div>
      <div class="flex flex-wrap items-center justify-between gap-6">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-xl">location_on</span>
          <span class="font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant">Villavicencio, Meta — Colombia</span>
        </div>
        <a href="cotizacion.html" class="inline-flex items-center gap-3 font-label-sm text-label-sm uppercase tracking-widest text-primary hover:gap-5 transition-all">
          Agenda una visita <span class="material-symbols-outlined">arrow_right_alt</span>
        </a>
      </div>
    </div>
  </div>
</section>
`;

const UI_TOGGLE = `
<!-- Mostrar / ocultar interfaz -->
<button id="ui-toggle" type="button" aria-label="Ocultar la interfaz" aria-pressed="false" title="Ocultar / mostrar la interfaz"><span class="material-symbols-outlined">expand_more</span></button>
`;

const HOME_CSS = `
<style id="home-hero">
  /* Hero panorámico a pantalla completa: la imagen ancha cubre todo con
     recorte mínimo, sin espacios ni difuminado. */
  #hero-section{height:100vh;height:100svh;}
  #hero-section .hero-main{object-fit:cover;object-position:center;}
  /* Scroll nativo normal (sin snap): baja de forma fluida y sin cortes. */
  /* Ocultar/mostrar interfaz (el hero permanece visible). */
  nav,footer,.ui-hideable,.wa-fab{transition:opacity .6s ease;}
  body.ui-hidden nav,body.ui-hidden footer,body.ui-hidden .ui-hideable,body.ui-hidden .wa-fab{opacity:0;pointer-events:none;}
  #ui-toggle{position:fixed;top:4.25rem;left:50%;transform:translateX(-50%);z-index:60;display:flex;align-items:center;justify-content:center;border:none;background:transparent;color:#dac49a;cursor:pointer;padding:6px;transition:top .5s cubic-bezier(0.16,1,0.3,1),color .3s ease;}
  #ui-toggle:hover{color:#f4f1ea;}
  #ui-toggle .material-symbols-outlined{font-size:20px;transition:transform .5s ease;filter:drop-shadow(0 1px 3px rgba(0,0,0,.7));}
  body.ui-hidden #ui-toggle{top:0.75rem;}
  body.ui-hidden #ui-toggle .material-symbols-outlined{transform:rotate(180deg);}
  /* Logos de clientes: iluminación estilo respiración (glow champagne pulsante) */
  @keyframes clientBreath{0%,100%{opacity:.32;text-shadow:0 0 0 rgba(218,196,154,0);}50%{opacity:.92;text-shadow:0 0 22px rgba(218,196,154,.5),0 0 6px rgba(218,196,154,.35);}}
  .client-logo{color:#d8cfc0;animation:clientBreath 4.5s ease-in-out infinite;will-change:opacity,text-shadow;}
  .client-logo:nth-child(2){animation-delay:.7s;}
  .client-logo:nth-child(3){animation-delay:1.4s;}
  .client-logo:nth-child(4){animation-delay:2.1s;}
  .client-logo:nth-child(5){animation-delay:2.8s;}
  @media (prefers-reduced-motion:reduce){.client-logo{animation:none;opacity:.5;}}
</style>
`;

const UI_TOGGLE_SCRIPT = `
<script>
  (function () {
    var t = document.getElementById('ui-toggle');
    if (!t) return;
    t.addEventListener('click', function () {
      var hidden = document.body.classList.toggle('ui-hidden');
      t.setAttribute('aria-pressed', hidden ? 'true' : 'false');
      t.setAttribute('aria-label', hidden ? 'Mostrar la interfaz' : 'Ocultar la interfaz');
      if (hidden) window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  })();
</script>
`;

function homeTransform(html) {
  // 0. Integrate real studio photos into "Selected Projects" (before 0a, which
  //    consumes the <!-- Strategic Statement --> boundary marker).
  html = html.replace(/<!-- Selected Projects Editorial Grid -->[\s\S]*?<!-- Strategic Statement -->/, SELECTED_PROJECTS + '<!-- Strategic Statement -->');
  // 0a. Remodel the "Strategic Statement" into an "El Estudio" showcase.
  html = html.replace(/<!-- Strategic Statement -->[\s\S]*?<!-- Services Grid -->/, EL_ESTUDIO + '<!-- Services Grid -->');
  // 0b. Remove the "Expertise" (Services Grid) and "El Proceso" (Process) sections.
  html = html.replace(/<!-- Services Grid -->[\s\S]*?<!-- Studio Showcase -->/, '<!-- Studio Showcase -->');
  // 0c. Remodel the "Studio Showcase" into a single centered studio image.
  html = html.replace(/<!-- Studio Showcase -->[\s\S]*?<!-- Why Pantheon -->/, STUDIO_SHOWCASE + '<!-- Why Pantheon -->');
  // 0d. Replace the "Diferenciales" (Why Pantheon) section with a single image.
  html = html.replace(/<!-- Why Pantheon -->[\s\S]*?<!-- Final CTA -->/, DIFERENCIALES + '<!-- Final CTA -->');
  // 1. Hero -> in-flow full-screen studio image (scrolls away like a slide).
  html = html.replace(/<!-- Cinematic Hero -->[\s\S]*?<!-- Trust Strip -->/, NEW_HERO + '<!-- Trust Strip -->');
  // 2. Drop top padding so the hero fills the viewport under a transparent nav.
  html = html.replace('<main class="pt-24">', '<main class="pt-0">');
  // 3. Transparent nav so the studio image shows through at the top.
  html = html.replace(
    'bg-transparent backdrop-blur-xl dark:bg-background/80 border-b border-outline-variant/20',
    'bg-transparent border-b border-outline-variant/10'
  );
  // 3b. Lower the nav elements a bit + use mobile padding on small screens.
  html = html.replace('px-margin-desktop py-base', 'px-margin-mobile md:px-margin-desktop pt-6 pb-2');
  // 3c. Breathing illumination on the "Selected Clients" logos.
  html = html.replace('opacity-40 grayscale contrast-125', 'contrast-110');
  html = html.replace(/font-display-md text-headline-md tracking-tighter/g, 'font-display-md text-headline-md tracking-tighter client-logo');
  // 4. Wrap the scrolling content (below the hero) so it can be hidden and snapped.
  html = html.replace('<!-- Trust Strip -->', '<div id="after-hero" class="ui-hideable relative bg-background">\n<!-- Trust Strip -->');
  html = html.replace('</main>', '</div>\n</main>');
  // 5. Home styles (scroll-snap + client-logo animation).
  html = html.replace('</head>', HOME_CSS + '</head>');
  return html;
}

// "Cotizar proyecto" CTA: strip its box, keep other attrs, add the glow class.
function ctaGlow(html) {
  return html.replace(
    /<(button|a)\b([^>]*)>\s*Cotizar proyecto\s*<\/\1>/g,
    function (m, tag, attrs) {
      const rest = attrs.replace(/\sclass="[^"]*"/, '');
      return '<' + tag + rest + ' class="cta-glow">Cotizar proyecto</' + tag + '>';
    }
  );
}

// Replace the external grain texture (grainy-gradients.vercel.app/noise.svg,
// which 404s) with an equivalent self-contained inline SVG — no network request,
// no console error, works offline.
const NOISE_DATA_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E" +
  "%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E" +
  "%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E";

function inlineNoise(html) {
  return html.replace(
    /url\(["']?https:\/\/grainy-gradients\.vercel\.app\/noise\.svg["']?\)/g,
    'url("' + NOISE_DATA_URI + '")'
  );
}

// Swap the Tailwind CDN runtime for the pre-compiled static stylesheet.
function staticTailwind(html) {
  html = html.replace(
    /<script src="https:\/\/cdn\.tailwindcss\.com[^"]*"><\/script>/,
    '<link rel="stylesheet" href="assets/tw.css"/>'
  );
  html = html.replace(/\s*<script id="tailwind-config">[\s\S]*?<\/script>/, '');
  return html;
}

const HEAD_META =
  '<meta charset="utf-8"/>\n' +
  '<link rel="icon" type="image/jpeg" href="assets/pantheon-monogram.jpg"/>\n' +
  '<meta name="theme-color" content="#131313"/>\n' +
  '<meta name="description" content="Pantheon Studio — estudio de producción audiovisual y fotografía en Villavicencio. Estética cinematográfica para marcas: campañas, editorial, gastronomía y más."/>\n' +
  '<link rel="preconnect" href="https://fonts.googleapis.com"/>\n' +
  '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>';

// One consolidated Google Fonts request with ONLY the weights the site uses:
// Bodoni Moda 400 (regular + italic), Inter 300/400/600/700, and the icon font
// pinned to weight 400 with FILL toggle — instead of three render-blocking tags
// pulling the full 100..900 / 100..700 ranges (huge, most weights unused).
const FONT_HREF =
  'https://fonts.googleapis.com/css2?' +
  'family=Bodoni+Moda:ital@0;1' +
  '&family=Inter:wght@300;400;600;700' +
  '&family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0..1,0' +
  '&display=swap';

// Load the stylesheet without blocking the first paint: `media="print"` keeps it
// off the critical path, then `onload` flips it to `all`. <noscript> is the
// no-JS fallback. This removes fonts from the render-blocking-resources audit.
const FONT_LINKS =
  '<link rel="preload" as="style" href="' + FONT_HREF + '"/>\n' +
  '<link rel="stylesheet" href="' + FONT_HREF + '" media="print" onload="this.media=\'all\'"/>\n' +
  '<noscript><link rel="stylesheet" href="' + FONT_HREF + '"/></noscript>';

// Strip every existing Google Fonts <link ... rel="stylesheet"> and replace the
// first occurrence with the optimized non-blocking loader (rest removed).
function optimizeFonts(html) {
  let replaced = false;
  html = html.replace(
    /<link\b[^>]*href="https:\/\/fonts\.googleapis\.com\/css2[^"]*"[^>]*\/?>/g,
    () => {
      if (replaced) return '';
      replaced = true;
      return FONT_LINKS;
    }
  );
  return html;
}

function addHeadExtras(html, page) {
  html = html.replace('<meta charset="utf-8"/>', HEAD_META);
  html = optimizeFonts(html);
  // Preload the LCP image on the Home hero so it starts downloading immediately.
  if (page && page.src === 'Home') {
    html = html.replace(
      '</head>',
      '<link rel="preload" as="image" href="assets/hero-wide.webp" fetchpriority="high"/>\n</head>'
    );
  }
  // Inject the logo styles at the end of <head>.
  html = html.replace('</head>', LOGO_CSS + '</head>');
  return html;
}

// --- Mobile navigation ------------------------------------------------------
// The source nav hides its links behind `hidden md:flex` with no working mobile
// menu, so phones can't navigate. Inject a wired hamburger + full-screen menu.
const HAMBURGER =
  '<button id="nav-burger" type="button" aria-label="Abrir menú" aria-expanded="false" ' +
  'class="md:hidden flex items-center justify-center text-on-surface hover:text-primary transition-colors p-1 ml-3">' +
  '<span class="material-symbols-outlined">menu</span></button>';

const MOBILE_MENU = `
<!-- Menú móvil -->
<div id="mobile-menu" class="fixed inset-0 z-[9999] md:hidden opacity-0 pointer-events-none transition-opacity duration-300 bg-background/[0.97] backdrop-blur-xl flex flex-col">
  <div class="flex justify-between items-center px-margin-mobile pt-6 pb-2">
    <span class="ph-logo text-[20px]"><span class="ph-logo__word">PANTHEON</span><span class="ph-logo__sub">studio</span></span>
    <button id="nav-close" type="button" aria-label="Cerrar menú" class="text-on-surface hover:text-primary transition-colors p-1"><span class="material-symbols-outlined">close</span></button>
  </div>
  <nav class="flex-1 flex flex-col justify-center gap-6 px-margin-mobile" aria-label="Menú principal">
    <a href="proyectos.html" class="font-display-md text-headline-lg leading-none text-on-surface hover:text-primary hover:pl-2 transition-all">Proyectos</a>
    <a href="servicios.html" class="font-display-md text-headline-lg leading-none text-on-surface hover:text-primary hover:pl-2 transition-all">Servicios</a>
    <a href="cotizacion.html" class="font-display-md text-headline-lg leading-none text-on-surface hover:text-primary hover:pl-2 transition-all">Contacto</a>
    <a href="cotizacion.html" class="mt-8 self-start cta-glow !text-[13px]">Cotizar proyecto</a>
    <a href="${WHATSAPP_URL}" target="_blank" rel="noopener" class="mt-2 inline-flex items-center gap-3 font-label-sm text-label-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">WhatsApp <span class="material-symbols-outlined text-base">arrow_right_alt</span></a>
  </nav>
</div>
`;

const MOBILE_MENU_SCRIPT = `
<script>
(function(){
  var b=document.getElementById('nav-burger'),m=document.getElementById('mobile-menu'),c=document.getElementById('nav-close');
  if(!b||!m)return;
  function set(o){m.classList.toggle('opacity-0',!o);m.classList.toggle('pointer-events-none',!o);b.setAttribute('aria-expanded',o?'true':'false');document.body.style.overflow=o?'hidden':'';}
  b.addEventListener('click',function(){set(true);});
  if(c)c.addEventListener('click',function(){set(false);});
  m.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){set(false);});});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')set(false);});
})();
</script>
`;

function addMobileNav(html) {
  // Hide the nav's "Cotizar proyecto" CTA on mobile — it clutters the bar next
  // to the logo and is already available inside the mobile menu. (First .cta-glow
  // in the document is the nav one.)
  html = html.replace('class="cta-glow"', 'class="cta-glow hidden md:inline-block"');
  // Reuse the page's own (dead) mobile button if present; else add a hamburger
  // as the last item in the nav bar.
  const dead = /<button class="md:hidden text-on-background">\s*<span class="material-symbols-outlined">menu<\/span>\s*<\/button>/;
  if (dead.test(html)) {
    html = html.replace(dead, HAMBURGER);
  } else {
    html = html.replace(/<\/div>\s*<\/nav>/, HAMBURGER + '\n</div>\n</nav>');
  }
  html = html.replace('</body>', MOBILE_MENU + MOBILE_MENU_SCRIPT + '</body>');
  return html;
}

// Wire nav/footer links by their visible anchor text.
function removeMenuItems(html) {
  for (const w of ['Estudio', 'Nosotros']) {
    html = html.replace(new RegExp('<li>\\s*<a[^>]*>\\s*' + w + '\\s*<\\/a>\\s*<\\/li>', 'g'), '');
    html = html.replace(new RegExp('<a[^>]*>\\s*' + w + '\\s*<\\/a>', 'g'), '');
  }
  return html;
}

function wireLinks(html) {
  html = removeMenuItems(html);
  html = html.replace(/href="#">(\s*)Proyectos(\s*)<\/a>/g, 'href="proyectos.html">$1Proyectos$2</a>');
  html = html.replace(/href="#">(\s*)Servicios(\s*)<\/a>/g, 'href="servicios.html">$1Servicios$2</a>');
  html = html.replace(/href="#">(\s*)Contacto(\s*)<\/a>/g,  'href="cotizacion.html">$1Contacto$2</a>');
  html = html.replace(/href="\/">(\s*)Return Home(\s*)<\/a>/g, 'href="index.html">$1Return Home$2</a>');
  // Footer "Location" -> Google Maps
  html = html.replace(/href="#">(\s*)Location(\s*)<\/a>/g, `href="${MAPS_URL}" target="_blank" rel="noopener">$1Location$2</a>`);
  // Footer "WhatsApp" -> WhatsApp chat
  html = html.replace(/href="#">(\s*)WhatsApp(\s*)<\/a>/g, `href="${WHATSAPP_URL}" target="_blank" rel="noopener">$1WhatsApp$2</a>`);
  // Footer "Instagram" -> Instagram profile
  html = html.replace(/href="#">(\s*)Instagram(\s*)<\/a>/g, `href="${INSTAGRAM_URL}" target="_blank" rel="noopener">$1Instagram$2</a>`);
  // Remove the email button (mailto: ...) wherever it appears.
  html = html.replace(/<a\b[^>]*href="mailto:[^"]*"[^>]*>[\s\S]*?<\/a>/g, '');
  // "Cotizar ..." anchors -> cotización page
  html = html.replace(/(<a[^>]*?)href="#"([^>]*>\s*Cotizar[^<]*<\/a>)/g, '$1href="cotizacion.html"$2');

  const buttonNav = `
<script>
  // Connect non-anchor CTA buttons to their destination pages.
  document.querySelectorAll('button').forEach(function (b) {
    var t = (b.textContent || '').trim().toLowerCase();
    if (t.includes('cotizar') || t.includes('consulta') || t.includes('iniciar')) {
      b.style.cursor = 'pointer';
      b.addEventListener('click', function () { window.location.href = 'cotizacion.html'; });
    } else if (t.includes('ver proyecto')) {
      b.style.cursor = 'pointer';
      b.addEventListener('click', function () { window.location.href = 'proyectos.html'; });
    }
  });
</script>
`;

  // Floating WhatsApp contact button (all pages).
  const whatsappFab = `
<a href="${WHATSAPP_URL}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp"
   class="wa-fab fixed bottom-6 right-6 z-[9998] flex items-center justify-center w-14 h-14 rounded-full border border-primary/60 bg-background/60 backdrop-blur-md text-primary hover:bg-primary hover:text-on-primary hover:border-primary hover:shadow-[0_0_22px_rgba(218,196,154,0.65)] transition-all duration-300">
  <svg viewBox="0 0 24 24" fill="currentColor" class="w-7 h-7" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.892c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.945a11.821 11.821 0 00-3.48-8.418z"/>
  </svg>
</a>
`;
  html = html.replace('</body>', buttonNav + whatsappFab + '</body>');
  return html;
}

// Accessibility / SEO polish applied to the final HTML of every page.
function a11ySeoFixes(html, p) {
  // 1. The tiny uppercase "overlines" are styled with the label-sm/xs tokens but
  //    were marked as <h3>/<h4>, which breaks the heading outline. They are
  //    decorative, so demote them to <p> (fixes axe: heading-order).
  html = html.replace(
    /<h([2-6])\b([^>]*(?:label-sm|label-xs)[^>]*)>([\s\S]*?)<\/h\1>/g,
    '<p$2>$3</p>'
  );
  // 2. Proyectos jumps h1 -> h3 (no h2). Promote the featured project title so
  //    the first heading after the h1 is an h2.
  if (p.out === 'proyectos.html') {
    html = html.replace(/<h3(\b[^>]*font-headline-lg[^>]*)>([\s\S]*?)<\/h3>/, '<h2$1>$2</h2>');
  }
  // 2b. The gallery pulls large images from an external host (googleusercontent).
  //     Preconnect to it and preload the first (LCP) image so LCP is fast and
  //     doesn't swing with connection-setup latency.
  if (/lh3\.googleusercontent\.com/.test(html)) {
    const first = html.match(/<img\b[^>]*\ssrc="(https:\/\/lh3\.googleusercontent\.com[^"]+)"/);
    let inject = '<link rel="preconnect" href="https://lh3.googleusercontent.com" crossorigin/>';
    if (first) inject += '\n<link rel="preload" as="image" href="' + first[1] + '" fetchpriority="high"/>';
    html = html.replace('</head>', inject + '\n</head>');
  }
  // 3. Gallery images keep their description in data-alt; expose it as a real
  //    alt attribute (fixes axe/seo: image-alt). Lazy-load all EXCEPT the first
  //    — that one is the LCP element, so it stays eager + high priority.
  let firstDataImg = true;
  html = html.replace(/<img\b([^>]*?)\sdata-alt=/g, (m, pre) => {
    if (firstDataImg) {
      firstDataImg = false;
      return '<img' + pre + ' fetchpriority="high" decoding="async" alt=';
    }
    return '<img' + pre + ' loading="lazy" decoding="async" alt=';
  });
  // 4. Guarantee a <title> (Proyectos had none).
  if (!/<title>[\s\S]*?<\/title>/.test(html) && p.title) {
    html = html.replace('</head>', '<title>' + p.title + '</title>\n</head>');
  }
  // 5. Inactive wizard step labels used /40 opacity (fails color-contrast). Bump
  //    to /70 in both the markup and the JS that re-applies it on step change.
  html = html.replace(/text-on-surface-variant\/40/g, 'text-on-surface-variant/70');
  // 6. Faint decorative index watermarks: hide from the a11y tree (screen readers
  //    shouldn't announce "01 02 03…") and lift the color to clear the 3:1
  //    large-text contrast minimum while staying subtle.
  html = html.replace(
    /<span class="([^"]*)text-outline-variant opacity-30([^"]*)">/g,
    '<span aria-hidden="true" class="$1text-[#6f6a5e]$2">'
  );
  return html;
}

function injectSections(html, keys) {
  if (!keys || !keys.length) return html;
  // Wrap in a solid backdrop; ui-hideable so it hides with the rest on Home.
  const block = '<div class="ui-hideable relative z-10 bg-background">\n' + keys.map(k => sectionHtml[k]).join('\n') + '\n</div>';
  // Place new sections right before the footer.
  if (html.includes('<footer')) return html.replace('<footer', block + '\n<footer');
  return html.replace('</main>', block + '\n</main>');
}

// --- Build ------------------------------------------------------------------
(async () => {
  await processImages();
  for (const p of pages) {
    let html = fs.readFileSync(path.join(root, p.src, 'code.html'), 'utf8');
    if (p.src === 'Home') html = homeTransform(html);
    html = staticTailwind(html);
    html = inlineNoise(html);
    html = addHeadExtras(html, p);
    html = applyLogos(html);
    html = ctaGlow(html);
    html = injectSections(html, p.sections);
    html = wireLinks(html);
    html = addMobileNav(html);
    html = a11ySeoFixes(html, p);
    fs.writeFileSync(path.join(outDir, p.out), html, 'utf8');
    console.log(`built ${p.out}  <-  ${p.src}/code.html  [${p.sections.join(', ') || 'no extra sections'}]`);
  }
  console.log('Done. Output in /site');
})().catch((e) => { console.error(e); process.exit(1); });
