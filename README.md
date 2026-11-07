# Daniel Díaz · Fisioterapia y Osteopatía
 
Web de [danieldiazfisioterapeuta.es](https://danieldiazfisioterapeuta.es), consulta de fisioterapia y osteopatía en Alcorcón (Madrid).
 
Rediseño completo de la web actual con un objetivo: **convertir visitas en pacientes**. Una página principal orientada a la reserva, páginas por tratamiento para el posicionamiento en Google, medición de conversiones y cumplimiento de la normativa de cookies.
 
> Estado: en desarrollo · Fase 0 (preparación)
 
---
 
## Índice
 
- [Stack](#stack)
- [Requisitos](#requisitos)
- [Puesta en marcha](#puesta-en-marcha)
- [Configuración](#configuración)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Editar el contenido](#editar-el-contenido)
- [Sistema de diseño](#sistema-de-diseño)
- [JavaScript](#javascript)
- [Analítica y cookies](#analítica-y-cookies)
- [SEO](#seo)
- [Despliegue](#despliegue)
- [Flujo de trabajo](#flujo-de-trabajo)
- [Hoja de ruta](#hoja-de-ruta)
- [Checklist antes de publicar](#checklist-antes-de-publicar)
---
 
## Stack
 
Web estática hecha con **HTML, CSS y JavaScript**, sin frameworks, sin librerías de estilos y sin paso de build.
 
| Pieza | Uso |
| --- | --- |
| HTML5 semántico | Todo el contenido escrito directamente en cada página, para que Google lo indexe. |
| CSS con variables (custom properties) | Tokens de la línea visual, componentes con nomenclatura BEM, Flexbox y Grid. |
| JavaScript (módulos ES) | Solo lo imprescindible: menú móvil, filtros de tratamientos, banner de cookies, carga diferida del mapa y eventos de analítica. |
| Google Calendar (citas) | Reserva online, enlazada desde la web. |
| Google Analytics 4 + Consent Mode v2 | Medición de conversiones con consentimiento previo. |
| Google Maps Embed | Mapa de contacto con carga diferida. |
| Prettier (opcional) | Formato de código homogéneo. |
 
## Requisitos
 
- Un navegador actual y un editor (VS Code recomendado).
- Un servidor local sencillo: extensión **Live Server** de VS Code, o Node.js para usar `npx serve`.
- Git.
Abrir los HTML con doble clic (`file://`) no sirve: los módulos JavaScript necesitan un servidor.
 
## Puesta en marcha
 
```bash
git clone <url-del-repositorio>
cd danieldiaz-fisioterapia
npx serve .        # o "Open with Live Server" en VS Code
```
 
## Configuración
 
Los datos que se usan desde JavaScript están centralizados en `js/config.js`, para cambiarlos en un único sitio:
 
| Clave | Descripción |
| --- | --- |
| `bookingUrl` | Enlace a la página de citas de Google Calendar. |
| `whatsappNumber` | Número en formato internacional sin `+` ni espacios. |
| `gaId` | ID de medición de GA4 (`G-XXXXXXXXXX`). |
| `mapsEmbedUrl` | URL del mapa embebido con la clave de Maps Embed API. |
| `reviewsUrl` | Enlace a las reseñas del Perfil de Empresa en Google. |
 
Todos estos valores son públicos (los ve cualquiera en el navegador). **No se guardan contraseñas ni claves privadas en el repositorio.** La clave de Google Maps debe estar **restringida al dominio** en Google Cloud.
 
El teléfono, el email y la dirección se escriben directamente en el HTML, porque Google debe leerlos sin ejecutar JavaScript.
 
## Estructura del proyecto
 
```text
.
├── index.html                  # Página principal (una sola página con secciones)
├── aviso-legal.html
├── privacidad.html
├── cookies.html
├── 404.html
├── tratamientos/
│   ├── _plantilla.html         # Plantilla base para nuevas páginas (no se publica)
│   ├── lumbalgia.html
│   └── ...
├── css/
│   ├── tokens.css              # Variables: colores, tipografía, espaciados, radios
│   ├── base.css                # Reset, fuentes, estilos de elementos
│   ├── components.css          # .btn, .badge, .card, .section-header…
│   ├── layout.css              # Cabecera, pie, contenedores, rejillas
│   └── sections.css            # Estilos propios de cada sección
├── js/
│   ├── config.js               # Datos configurables
│   ├── main.js                 # Punto de entrada
│   ├── menu.js                 # Menú móvil y sección activa
│   ├── filters.js              # Filtros de tratamientos
│   ├── consent.js              # Banner y gestión del consentimiento
│   ├── analytics.js            # Eventos GA4
│   └── map.js                  # Carga diferida del mapa
├── img/                        # Imágenes optimizadas (AVIF/WebP + respaldo)
├── fonts/                      # Fuentes servidas en local
├── icons/                      # Iconos SVG
├── dev/
│   └── componentes.html        # Catálogo de componentes (no se publica)
├── sitemap.xml
├── robots.txt
├── .htaccess                   # Redirecciones 301, HTTPS, caché y cabeceras
└── README.md
```
 
La estructura es orientativa y se ajustará durante el desarrollo.
 
## Editar el contenido
 
Todo el contenido está en el propio HTML. Así la web funciona sin JavaScript y los buscadores leen todo el texto.
 
### Tratamientos
 
Cada tratamiento aparece en dos sitios:
 
1. **Tarjeta en `index.html`**, dentro de la sección de tratamientos, con su categoría en el atributo `data-categoria`. Valores permitidos: `dolor` · `cabeza-mandibula` · `digestivo` · `lesiones`.
2. **Página propia** en `tratamientos/<slug>.html` (Fase 3), creada copiando `tratamientos/_plantilla.html`.
Al añadir un tratamiento nuevo:
 
- [ ] Añadir su tarjeta en `index.html` con la categoría correcta.
- [ ] Crear su página desde la plantilla y rellenar title, description y Open Graph.
- [ ] Añadir la URL a `sitemap.xml`.
- [ ] Revisar la cifra "+N áreas de tratamiento" de la sección "Sobre mí".
### Reseñas
 
Solo se publican **reseñas reales copiadas de Google sin editar**, con el nombre o inicial tal como aparece. Si todavía no hay reseñas, la sección se deja fuera. Nunca se publican reseñas inventadas.
 
### Preguntas frecuentes
 
Cada pregunta está en el acordeón de `index.html` **y** en el bloque JSON-LD `FAQPage` del `<head>`. Si se cambia una, hay que cambiar las dos.
 
### Cabecera y pie
 
Están repetidos en cada archivo HTML. Al modificarlos, hay que actualizar **todas** las páginas: `index.html`, las páginas legales, `404.html` y cada página de `tratamientos/`.
 
### Datos de la consulta
 
Nombre, dirección y teléfono deben ser idénticos en el HTML, en los datos estructurados y en el Perfil de Empresa en Google.
 
## Sistema de diseño
 
Los tokens están en `css/tokens.css` como variables en `:root`.
 
| Variable | Color | Uso |
| --- | --- | --- |
| `--color-brand` | `#11BCAB` | Turquesa de marca · acentos |
| `--color-brand-deep` | `#0B7F74` | Turquesa profundo · botones |
| `--color-night` | `#0A4F49` | Verde noche · bloques oscuros |
| `--color-mint` | `#E7F7F5` | Menta · fondos de iconos y secciones alternas |
| `--color-ink` | `#14302E` | Tinta · textos |
 
- **Tipografía:** sans geométrica en extra negrita para títulos; Inter para texto. Ambas en local con `@font-face` y `font-display: swap`.
- **Nomenclatura CSS:** BEM (`.card`, `.card__title`, `.btn--primary`).
- **Diseño adaptable:** mobile first, con puntos de corte en 768 px y 1024 px.
- **Principios:** espacio en blanco, sin sombras de texto ni degradados, sombras suaves y bordes redondeados, iconografía lineal y fotografía real.
- **Texto:** alineado a la izquierda, nunca justificado.
- **Accesibilidad:** contraste mínimo AA, foco visible, navegación completa por teclado y respeto a `prefers-reduced-motion`.
El catálogo `dev/componentes.html` muestra todos los componentes; no se sube a producción.
 
## JavaScript
 
- Módulos ES cargados con `<script type="module" src="js/main.js">`.
- **Mejora progresiva:** todo el contenido se ve y se puede usar sin JavaScript; el script solo añade comportamiento (filtrar, abrir menú, cargar el mapa).
- Sin librerías externas salvo, si se decide, una de consentimiento de cookies ligera servida desde el propio dominio.
- Objetivo: menos de 30 KB de JavaScript propio en la portada.
## Analítica y cookies
 
Google Analytics **no se carga ni establece cookies hasta que el visitante acepta** en el banner. Consent Mode v2 arranca con todo denegado. "Aceptar" y "Rechazar" tienen el mismo peso visual, y la elección puede cambiarse desde el pie de página.
 
### Eventos medidos
 
| Evento | Se dispara al pulsar | Parámetro `ubicacion` |
| --- | --- | --- |
| `click_reserva` | Cualquier botón de reservar cita | `cabecera`, `hero`, `cta`, `contacto`, `tratamiento` |
| `click_whatsapp` | Botones de WhatsApp | `hero`, `faq`, `flotante` |
| `click_telefono` | Enlaces `tel:` | `cta`, `contacto`, `pie` |
| `click_email` | Enlaces `mailto:` | `contacto`, `pie` |
 
Los botones se identifican con atributos `data-evento` y `data-ubicacion` en el HTML. Los cuatro eventos se marcan como eventos clave en GA4. Para probarlos, usar **DebugView** de GA4 con el consentimiento aceptado.
 
## SEO
 
- Un único H1 por página; H2/H3 ordenados.
- Title, meta description, URL canónica y Open Graph en todas las páginas.
- Datos estructurados en JSON-LD: `Physiotherapy` en la portada, `FAQPage` en preguntas frecuentes y `BreadcrumbList` en las páginas de tratamiento.
- `sitemap.xml` y `robots.txt` mantenidos a mano; el entorno de staging lleva `noindex`.
- Imágenes AVIF/WebP con `<picture>`, `srcset` y `loading="lazy"`; mapa cargado solo al llegar a contacto.
- Las URLs de la web anterior que cambien llevan redirección 301 en `.htaccess`.
**Objetivos de calidad (Lighthouse, móvil):** Rendimiento ≥ 90 · Accesibilidad ≥ 95 · Buenas prácticas ≥ 95 · SEO ≥ 95. Core Web Vitals: LCP < 2,5 s, CLS < 0,1, INP < 200 ms.
 
## Despliegue
 
No hay build: los archivos del repositorio se suben tal cual al servidor, excluyendo `dev/`, `tratamientos/_plantilla.html` y la configuración local del editor.
 
| Entorno | URL | Rama | Notas |
| --- | --- | --- | --- |
| Staging | `staging.danieldiazfisioterapeuta.es` | `develop` | Protegido con contraseña y `noindex`. Revisión del cliente. |
| Producción | `danieldiazfisioterapeuta.es` | `main` | Solo tras aprobación en staging. |
 
Antes del primer despliegue a producción se guarda una copia completa de la web actual para poder volver atrás.
 
El proceso concreto (script con rsync/SFTP o GitHub Actions) se documentará aquí al completar DDF-03.
 
## Flujo de trabajo
 
- El trabajo se organiza en tarjetas `DDF-XX` del tablero Kanban del proyecto.
- **Una tarjeta = una rama = una Pull Request** hacia `develop`.
- Nombres de rama: `feat/DDF-06-hero`, `fix/DDF-08-mapa`, `chore/DDF-03-deploy`.
- Commits con [Conventional Commits](https://www.conventionalcommits.org/es/): `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `style:`.
- Cada PR pasa code review antes de fusionarse, seguida de una retrospectiva breve.
- `main` está protegida: solo recibe fusiones desde `develop` en cada publicación.
### Definición de hecho
 
Una tarjeta está terminada cuando:
 
1. Cumple todos sus criterios de aceptación.
2. Se ve correctamente a 360, 768 y 1280 px.
3. Es navegable con teclado y no hay errores en consola.
4. El HTML pasa el validador del W3C sin errores.
5. No muestra datos de ejemplo.
6. Está desplegada en staging.
## Hoja de ruta
 
| Fase | Objetivo | Tarjetas |
| --- | --- | --- |
| 0 · Preparación | Estructura del proyecto, sistema de diseño, staging y contenido del cliente | DDF-01 – DDF-04 |
| 1 · Impacto inmediato | Nueva portada con reserva, contacto corregido, cookies, medición y SEO base. **Primera publicación.** | DDF-05 – DDF-14 |
| 2 · Diseño completo | Sobre mí, tratamientos en tarjetas, primera sesión, opiniones y accesibilidad | DDF-15 – DDF-19 |
| 3 · Crecimiento | Preguntas frecuentes, páginas por tratamiento, rendimiento y Perfil de Empresa en Google | DDF-20 – DDF-24 |
