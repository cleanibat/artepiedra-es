# PiedraSur — sitio web (Andalucía)

Sitio vitrina + landing de conversión para una empresa de **fachada imitación piedra / revestimiento imitación piedra / mortero imitación piedra / hormigón impreso vertical**, en español de España. Marca propia e independiente: paleta cal blanca · piedra caliza · azul mar profundo · albero, tipografías Outfit + Figtree, copywriting en tono cercano (tú).

Sitio **estático** (HTML/CSS/JS), sin build. Publicado en GitHub Pages.

## Estructura

```
piedrasur-es/
├── index.html         ← página principal (hero + formulario rápido, confianza, servicios, antes/después,
│                         obras, acabados, razones, proceso, zonas por provincia, opiniones, FAQ, formulario)
├── gracias.html       ← página de agradecimiento (conversión Google Ads)
├── aviso-legal.html   ← plantilla legal (rellenar [RAZÓN SOCIAL], [NIF], [DIRECCIÓN])
├── privacidad.html    ← plantilla RGPD (idem)
├── style.css          ← diseño
├── main.js            ← menú, comparador antes/después, animaciones, eventos dataLayer
├── img/               ← fotos de obras (webp)
├── robots.txt · sitemap.xml · favicon.svg · .nojekyll
```

## Antes de lanzar campañas

1. **Formularios** — en `index.html` hay dos (rápido en el hero y completo al final): sustituir `CAMBIAR@EMAIL.es` en ambos `action="https://formsubmit.co/…"` por el email real.
   La primera solicitud dispara un correo de activación de FormSubmit que hay que confirmar.
   Mientras el marcador siga ahí, el formulario funciona en modo demo (muestra la confirmación sin enviar nada).
2. **Teléfono** — reemplazar `600 123 456` / `+34600123456` (varias ocurrencias en `index.html` y `gracias.html`).
3. **Email** — `hola@piedrasur.es` en index, footer, JSON-LD y páginas legales.
   **Fotos** — las fotos de `img/` son provisionales (obras de otra empresa): sustituirlas por obras propias antes de lanzar.
4. **Google Tag Manager** — descomentar el bloque GTM en `<head>` y poner el ID real.
   Eventos ya enviados al dataLayer: `generate_lead`, `click_to_call`, `cta_click`, `form_start`, `ba_slider_used`, `lead_thank_you_page` (en gracias.html).
5. **Dominio** — cuando exista un dominio propio, actualizar las URLs `https://cleanibat.github.io/piedrasur-es/` (canonical, OG, JSON-LD, `_next` del formulario, sitemap, robots).
6. **Zona** — por defecto Andalucía (base Málaga / Costa del Sol + Sevilla, Granada, Córdoba, Cádiz, Almería, Jaén, Huelva). Cambiar en la sección `#zonas`, el FAQ, el JSON-LD y el `<title>`/meta description.
7. **Cifras y opiniones** — «+280 fachadas», «63 opiniones», «4,9/5», «desde 2014» y los testimonios son de ejemplo: sustituir por datos reales.

## Publicación

GitHub Pages sirve la rama `main` desde la raíz. Cada `git push` actualiza el sitio en 1–2 minutos.
