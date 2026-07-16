# Pantheon Studio

Sitio web de **Pantheon Studio** — estudio de producción audiovisual y fotografía en Villavicencio, Colombia. Estética *Cinematic Editorial* (dark, minimalista, premium).

## Estructura

Cada carpeta es una sección/página del sitio, con su `code.html` fuente:

- `Home/`, `Servicios/`, `Proyectos/`, `Cotización/` — páginas fuente
- `Info/`, `Fotos/`, `fondo/` — imágenes y assets de marca
- `build.js` — genera el sitio conectado en `site/` (navegación, logos, secciones, WhatsApp, etc.)
- `server.js` — servidor estático local
- `site/` — salida del build (generada, no versionada)

## Desarrollo

```bash
node build.js     # construye el sitio en /site
node server.js    # sirve en http://localhost:5173
```

## Deploy

Configurado para Vercel (`vercel.json`): `buildCommand: node build.js`, `outputDirectory: site`.
