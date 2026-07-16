// Build a connected static site from the section folders.
const fs = require('fs');
const path = require('path');

const root = __dirname;
const outDir = path.join(root, 'site');
const assetsDir = path.join(outDir, 'assets');
fs.mkdirSync(assetsDir, { recursive: true });

// --- Brand assets (from /Info) ---------------------------------------------
const brandAssets = [
  { from: 'Info/Captura de pantalla 2026-07-15 162100.png', to: 'pantheon-wordmark.png' },
  { from: 'Info/472154790_2341703699501172_7768970952726760596_n.jpg', to: 'pantheon-monogram.jpg' },
  { from: 'fondo/bc5b47e9-9e73-44e9-b678-bbbba545f417.png', to: 'hero-wide.png' },
  { from: 'Info/ChatGPT Image 15 jul 2026, 06_06_43 p.m..png', to: 'estudio-fisico.png' },
  { from: 'Info/baeef1c5-f404-4c89-a4fc-3dca5ec9ded6.png', to: 'estudio-bg.png' },
  { from: 'Info/b8c11939-8400-44f0-9136-d69e39ec1ddd.png', to: 'diferenciales-dark.png' },
  { from: 'Fotos/Captura de pantalla 2026-07-16 150852.png', to: 'proj-gastronomia.png' },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151008.png', to: 'proj-cocteleria.png' },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151052.png', to: 'proj-moda.png' },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151201.png', to: 'proj-nupcial.png' },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151251.png', to: 'proj-danza.png' },
  { from: 'Fotos/Captura de pantalla 2026-07-16 151336.png', to: 'proj-retrato.png' },
];
for (const a of brandAssets) {
  fs.copyFileSync(path.join(root, a.from), path.join(assetsDir, a.to));
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
  { src: 'Home',        out: 'index.html',      sections: ['ubicacion'] },
  { src: 'Servicios',   out: 'servicios.html',  sections: ['ubicacion'] },
  { src: 'Proyectos',   out: 'proyectos.html',  sections: [] },
  { src: 'Cotización',  out: 'cotizacion.html', sections: ['ubicacion'] },
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

const WORDMARK_NAV = '<a href="index.html" aria-label="Pantheon Studio - Inicio" class="ph-logo shrink-0 text-[20px] md:text-[26px]"><span class="ph-logo__word">PANTHEON</span><span class="ph-logo__sub">studio</span></a>';
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
<img class="hero-main absolute inset-0 w-full h-full object-cover" src="assets/hero-wide.png" alt="Pantheon Studio — set de producción con el monograma iluminado"/>
</section>
`;

// "Selected Projects" -> grilla editorial con fotos reales del estudio.
const projects = [
  { img: 'proj-gastronomia.png', cat: 'Gastronomía',        title: 'Alta Cocina',        alt: 'Fotografía gastronómica de un plato de sashimi sobre lino' },
  { img: 'proj-cocteleria.png',  cat: 'Coctelería',          title: 'Mixología de Autor', alt: 'Fotografía de coctelería, un cóctel sobre mesa de madera' },
  { img: 'proj-moda.png',        cat: 'Editorial de Moda',   title: 'Statement',          alt: 'Editorial de moda con botas plataforma blancas en estudio' },
  { img: 'proj-nupcial.png',     cat: 'Retrato Editorial',   title: 'Serenidad',          alt: 'Retrato editorial de una mujer con ramo de flores' },
  { img: 'proj-danza.png',       cat: 'Danza & Movimiento',  title: 'Ingravidez',         alt: 'Bailarina en salto dentro del estudio' },
  { img: 'proj-retrato.png',     cat: 'Retrato',             title: 'Carácter',           alt: 'Retrato de estudio de una mujer con chaqueta de cuero' },
];

const projectCards = projects.map((p, i) => {
  const n = String(i + 1).padStart(2, '0');
  return `
    <article class="break-inside-avoid mb-gutter group relative overflow-hidden bg-surface-container cursor-pointer">
      <img class="block w-full h-auto object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.06]" src="assets/${p.img}" alt="${p.alt}"/>
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
  <img src="assets/diferenciales-dark.png" alt="Diferenciales de Pantheon Studio: Narrativa Cinematográfica, Diseño de Set y Calidad Publicitaria" class="block w-full h-auto"/>
</section>
`;

// Remodelación de "Studio Showcase" -> imagen del interior como fondo,
// con el texto en la esquina inferior izquierda (no tapa el wordmark ni la escena).
const STUDIO_SHOWCASE = `<!-- Studio Showcase -->
<section class="relative min-h-[85vh] flex items-end overflow-hidden bg-[#0e0e0e]">
  <img src="assets/estudio-bg.png" alt="Interior del estudio Pantheon durante una producción, con iluminación cinematográfica" class="absolute inset-0 w-full h-full object-cover object-center"/>
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
      <img src="assets/estudio-fisico.png" alt="Fachada de Pantheon Studio en Villavicencio, Colombia" class="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"/>
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
  /* Efecto diapositiva: cada sección se ancla al hacer scroll. */
  html{scroll-behavior:smooth;}
  @media (min-width:768px){
    html{scroll-snap-type:y proximity;}
    #hero-section{scroll-snap-align:start;scroll-snap-stop:always;}
    #after-hero > section{scroll-snap-align:start;}
  }
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
  // 3b. Lower the nav elements a bit.
  html = html.replace('px-margin-desktop py-base', 'px-margin-desktop pt-6 pb-2');
  // 3c. Breathing illumination on the "Selected Clients" logos.
  html = html.replace('opacity-40 grayscale contrast-125', 'contrast-110');
  html = html.replace(/font-display-md text-headline-md tracking-tighter/g, 'font-display-md text-headline-md tracking-tighter client-logo');
  // 4. Wrap the scrolling content (below the hero) so it can be hidden and snapped.
  html = html.replace('<!-- Trust Strip -->', '<div id="after-hero" class="ui-hideable relative bg-background">\n<!-- Trust Strip -->');
  html = html.replace('</main>', '</div>\n</main>');
  // 5. Interface toggle right after <body>.
  html = html.replace(/(<body[^>]*>)/, '$1\n' + UI_TOGGLE);
  // 6. Home styles + toggle script.
  html = html.replace('</head>', HOME_CSS + '</head>');
  html = html.replace('</body>', UI_TOGGLE_SCRIPT + '</body>');
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

function addHeadExtras(html) {
  html = html.replace(
    '<meta charset="utf-8"/>',
    '<meta charset="utf-8"/>\n<link rel="icon" type="image/jpeg" href="assets/pantheon-monogram.jpg"/>'
  );
  // Inject the logo styles at the end of <head>.
  html = html.replace('</head>', LOGO_CSS + '</head>');
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

function injectSections(html, keys) {
  if (!keys || !keys.length) return html;
  // Wrap in a solid backdrop; ui-hideable so it hides with the rest on Home.
  const block = '<div class="ui-hideable relative z-10 bg-background">\n' + keys.map(k => sectionHtml[k]).join('\n') + '\n</div>';
  // Place new sections right before the footer.
  if (html.includes('<footer')) return html.replace('<footer', block + '\n<footer');
  return html.replace('</main>', block + '\n</main>');
}

// --- Build ------------------------------------------------------------------
for (const p of pages) {
  let html = fs.readFileSync(path.join(root, p.src, 'code.html'), 'utf8');
  if (p.src === 'Home') html = homeTransform(html);
  html = addHeadExtras(html);
  html = applyLogos(html);
  html = ctaGlow(html);
  html = injectSections(html, p.sections);
  html = wireLinks(html);
  fs.writeFileSync(path.join(outDir, p.out), html, 'utf8');
  console.log(`built ${p.out}  <-  ${p.src}/code.html  [${p.sections.join(', ') || 'no extra sections'}]`);
}
console.log('Done. Output in /site');
