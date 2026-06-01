# Hauled (frontend)

## Project Overview
**Hauled — "Moda que Habla"**: e-commerce de moda/streetwear colombiano. Catálogo, carrito, checkout con Wompi, **encargos** (traído de USA / importación) y a futuro **marca propia**. Diferenciador: **acceso a lo que en Colombia no se consigue.**
Este repo es el **frontend Nuxt 4 SSR**. La API vive en `../hauled-api` (Laravel 13 + Filament). Producción: `https://hauled.shop`.

## Repos del proyecto
| Repo | Ruta | Propósito |
|---|---|---|
| **Hauled** (este) | `C:\Users\GODSF\Herd\Hauled` | Frontend Nuxt 4 SSR |
| **hauled-api** | `C:\Users\GODSF\Herd\hauled-api` | API Laravel 13 + Filament admin |

## Tech Stack
- **Nuxt 4.2.0** (Vue 3, SSR, Nitro · preset Vercel/EasyPanel) · TypeScript
- **Pinia** (estado) · **Bootstrap 5.3 + SCSS** (⚠️ NO Tailwind)
- vee-validate + yup (forms) · vue3-toastify · swiper + vue3-carousel · dayjs
- `nuxt-security` · `dompurify` (sanitización)
- Wompi (composable `useWompi.ts`)

## Architecture
- Frontend y API son **repos separados**; el front consume la API por `$fetch`/`useFetch`/`useAsyncData`. URL de la API en `runtimeConfig.public.appUrl`.
- SSR habilitado. Cuidar hidratación y no filtrar secretos al cliente (solo `runtimeConfig.public.*` es público).
- Auth: token Bearer de Sanctum guardado en cookie/localStorage → enviado como `Authorization: Bearer`.
- Admin NO está aquí (es Filament en la API).

## Estructura (app/)
```
app/
├── pages/         rutas (index, shop, cart, checkout, product-details, wishlist, login, register, profile, order, search, contact, encargos, about, admin/*)
├── components/    por dominio (cart, checkout, product, product-details, header, footer, hero-banner, ...)
├── composables/   useClickOutside, useSeo, useSticky, useWompi
├── pinia/         useCartStore, useCompareStore, useProductFilterStore, useProductStore, useUtilityStore, useWishlistStore
├── assets/scss/   main.scss, _tokens.scss, theme/, layout/, components/, utils/
├── layouts/       default.vue, admin.vue, layout-one.vue
└── server/routes/ Nitro server-side
```

## Design System — 🎯 nivel Gymshark (ejecución), identidad propia Hauled
- **Norte:** el **nivel** de gymshark.com (audaz, alto contraste, display bold, foto full-bleed protagonista, conversión mobile-first, app-like) **con identidad propia — NO copiar a Gymshark.** Hauled es **moda/streetwear** con sello "traído de USA". Fuente de verdad: `08-DIRECCION-VISUAL-GYMSHARK.md` (§principio rector + §Parte A identidad) y `09-DIRECCION-TECNOLOGICA.md`.
- **Identidad confirmada (2026-06-01 — ver `08` §A):**
  - **Acento:** Cyan eléctrico `#4CC9F0` (rec.) · alt. Voltio `#CBFF2E`. Disciplina: poco y con intención. El color real lo pone la foto.
  - **Tipografía:** display **Raleway / Raleway** (grotesca bold, MAYÚS, tracking amplio — NO condensada, NO Raleway) · cuerpo **Inter** · sellos **Space Mono**.
  - **Firma de marca:** sistema "Cargo Tag / Sello Aduana" → overline-sello mono, glifo `USA → CO`, badge con esquina recortada (`clip-path`), motion "snap reveal" (M01).
- **Bootstrap 5.3 + SCSS custom = andamiaje invisible.** Tokens propios en `assets/scss/theme/_tokens.scss` / `_theme.scss` — **usar variables, no hardcodear**; sobrescribir Bootstrap (mapa de variables en `09` §2.1) para que **nunca se lea como "Bootstrap por defecto"**. Cero `!important`.
- Esquinas **rectas/secas** (editorial moda), no redondeo "app". Alto contraste WCAG AA. Cero glassmorphism, cero gradiente morado/pastel. Mobile-first real (390px primero). Hero/footer dark, catálogo claro; soportar dark mode por tokens.
- Motion con **M-codes** y presupuesto (`08` §B.7); la visibilidad en reposo **nunca** depende de una animación.
- Agentes de diseño: `hauled-design-tokens-architect`, `hauled-design-system-reconciler`, `hauled-design-reviewer`, `claude-design-prompt-architect`, `hauled-motion`, `a11y-axe-core-runner`, `mcp-chrome-pixel-perfect`, `hauled-visual-regression-guardian`. Gobernanza visual: `bots-especializados/DIRECTOR-VISUAL-HAULED.md`.

## Commands
```bash
npm install
npm run dev        # localhost:3000
npm run build      # build producción (Nitro)
npm run preview    # preview del build
npm run generate   # SSG
```

## Deploy Workflow (CI/CD automatizado)
1. Correr gates locales (ver `/ship`): typecheck + `npm run build`.
2. `git add` → `git commit` → `git push`.
3. **GitHub Actions** buildea la imagen y la sube a `ghcr.io/analyticfitness-design/hauled:latest`.
4. **EasyPanel** hace `docker pull` + restart (`hauled.shop`, puerto 3000).
- ⚠️ El build se hace **en GitHub Actions, NUNCA en el container**.

## Delegación a agentes (instalados en `.claude/agents/`)
| Tarea | Agente |
|---|---|
| Componentes Vue/Nuxt, composables, Pinia, SSR, `useFetch` | **nuxt-frontend** |
| SCSS, Bootstrap tokens, responsive, dark mode | **scss-bootstrap-ds** |
| UX de catálogo/carrito/checkout/conversión | **ecommerce-ux** |
| SEO, meta/OG, schema.org, sitemap, Core Web Vitals | **seo-growth** |
| Integración Wompi en el front | **wompi-checkout-frontend** |
| E2E (login, carrito, checkout) | **e2e-runner** |
| Review / arquitectura / seguridad | **code-reviewer** / **architecture-reviewer** / **security-reviewer** |
| Errores de build/tipos | **build-error-resolver** |
| Planning de features | **planner** |
| **DISEÑO** — tokens SCSS (grado Gymshark, identidad propia) | **hauled-design-tokens-architect** |
| **DISEÑO** — sistema/catálogo de componentes | **hauled-design-system-reconciler** |
| **DISEÑO** — revisión visual ("¿nivel + sello Hauled?") | **hauled-design-reviewer** |
| **DISEÑO** — armar prompt para Claude Design | **claude-design-prompt-architect** |
| **DISEÑO** — UX/IA, flujos, fricción | **hauled-ux-ia-director** |
| **DISEÑO** — motion/microinteracciones (M-codes) | **hauled-motion** |
| **DISEÑO** — accesibilidad WCAG | **a11y-axe-core-runner** |
| **DISEÑO** — pixel-perfect vs mockup | **mcp-chrome-pixel-perfect** |
| **DISEÑO** — regresión visual / stories | **hauled-visual-regression-guardian** |
| **CONTENIDO** — voz de marca en copy | **hauled-brand-voice-guardian** |
| **CONTENIDO** — redes (IG/TikTok) | **hauled-ig-strategy** |
| **CONTENIDO** — landing/blog/email | **hauled-content-marketing** |
| **Orquestar / multi-dominio** | ver `bots-especializados/00-DIRECTOR-ORQUESTA-HAULED.md` |

> Para tareas del **backend** (Laravel), trabajar en `../hauled-api`, que tiene su propio roster `la-XX`.

## Skill obligatoria
Usar la skill **`critical-honest-advisor`** SIEMPRE que se pida feedback/opinión/revisión, se compartan planes o se comparen opciones. Invocar antes de responder en esos casos.

## Rules (safety-critical)
- Todo el trabajo en este directorio o en `../hauled-api`. **NUNCA** modificar proyectos ajenos (`wellcore-laravel`, etc.).
- Usar tokens SCSS de `_tokens.scss` — no hardcodear colores/tipografía. Cero `!important`.
- La URL de la API se lee de `runtimeConfig.public.appUrl`. Wompi: dev `pub_test_*`, prod por env. **Cero secretos en el repo/docs** (solo placeholders).
- **NEVER** atribución de IA en commits/PRs (cero `Co-Authored-By`, `Generated with`, 🤖, "AI-assisted").
- **NEVER** commitear `.env`, `node_modules/`, tokens. **NEVER** `npm install <pkg>` sin estar en `package.json` (supply-chain).
- **NEVER** `git push --force` a `main`. **NEVER** `npm run build` en el container EasyPanel.
- Voz cliente-facing = **"Moda que Habla"** (tuteo neutro CO, cero voseo, honesta, sin humo). Ver skill `hauled-voice` y doc `05-LENGUAJE-Y-VOZ-HAULED`.

## Behavioral Rules
- Exhaustivo primer pase · razonamiento visible en decisiones complejas · anti-especulación ("no lo sé") · parar si trabado >2 intentos.
- Honestidad sin sugar-coating · listar suposiciones · pre-mortem en cambios >3 archivos.
- Bias hacia la acción. Formato: 1 frase + bullets (máx 5) + siguiente acción.
- Karpathy: pensar antes de codear · simplicidad · cambios quirúrgicos · éxito verificable.

@.claude/docs/agents.md
