# HAULED Frontend Redesign — Spec

**Fecha:** 2026-04-05  
**Enfoque:** B — Dark Brand + Light Catalog  
**Alcance:** Solo local, sin deploy

---

## Objetivo

Rediseñar el frontend de HAULED al nivel de producción: header oscuro con logo correcto, hero full-viewport, design tokens globales, catálogo branded, product detail premium, footer HAULED completo. Mobile-first en todas las páginas y componentes.

---

## Arquitectura

### Stack actual
- Nuxt 4 (app/ directory)
- SCSS + Bootstrap 5
- Pinia stores
- Datos en `app/data/product-data.ts` (estático local)
- API Laravel en `hauled-api` (no se modifica en este ciclo)

### Patrón de estilos
- **Design tokens** en `app/assets/scss/_tokens.scss` como CSS Custom Properties
- Cada componente usa `scoped` styles que referencian los tokens
- No se elimina Bootstrap — se superpone con clases hauled-*
- Font stack: Raleway 900 (display) + Inter (body) — ya cargados en nuxt.config.ts

---

## Design Tokens (`_tokens.scss`)

```scss
:root {
  // Colors
  --h-black:       #111111;
  --h-blue:        #4CC9F0;
  --h-white:       #FFFFFF;
  --h-grey:        #F4F4F4;
  --h-navy:        #0d2233;
  --h-muted:       rgba(255,255,255,0.6);
  --h-muted-dark:  rgba(0,0,0,0.45);

  // Typography — clamp() responsive
  --h-fs-display:  clamp(2.8rem, 10vw, 6.5rem);
  --h-fs-h1:       clamp(2rem, 6vw, 3.5rem);
  --h-fs-h2:       clamp(1.4rem, 4vw, 2.2rem);
  --h-fs-h3:       clamp(1.1rem, 3vw, 1.5rem);
  --h-fs-body:     clamp(0.875rem, 3.5vw, 1rem);
  --h-fs-small:    0.8rem;
  --h-fs-label:    0.72rem;

  // Letter spacing
  --h-ls-display:  -2px;
  --h-ls-title:    3px;
  --h-ls-label:    4px;
  --h-ls-logo:     10px;
  --h-ls-sub:      7px;

  // Spacing
  --h-section-py:  clamp(60px, 8vw, 120px);
  --h-gap-grid:    clamp(12px, 2vw, 24px);

  // Transitions
  --h-ease:        cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --h-dur-fast:    180ms;
  --h-dur-med:     320ms;

  // Shadows
  --h-shadow-card: 0 4px 20px rgba(0,0,0,0.08);
  --h-shadow-hover: 0 12px 40px rgba(0,0,0,0.15);
}
```

---

## Componentes a Crear / Refactorizar

### 1. `_tokens.scss` — NUEVO
Design tokens globales como CSS Custom Properties.

### 2. `header-one.vue` — REFACTORIZAR
- Fondo: `#111` permanente (no blanco)
- Logo: "HAULED" Raleway 900 blanco + subtag "DIRECT FROM THE STATES" azul
- Sticky: backdrop-filter blur al hacer scroll
- Mobile: hamburger accesible, touch targets 44px

### 3. `HauledHero.vue` — REFACTORIZAR
- Height: `100svh` (safe viewport height para mobile)
- Layout: 2 col desktop (texto izq, imagen der) → 1 col mobile (texto arriba)
- Tipografía: `var(--h-fs-display)` Raleway 900, line-height 0.88
- Fondo: `#111` con imagen lifestyle del producto destacado
- CTAs: botón primario azul sólido + botón ghost blanco
- Eyebrow: "DIRECT FROM THE STATES" Inter 300, azul
- Scroll indicator animado (CSS animation)
- Animación entry: fade-up en mount

### 4. `HauledLines.vue` — REFACTORIZAR
- Cards con hover: border azul aparece al hover
- Icono: reemplazar emojis por SVG inline
- Mobile: 1 columna, padding reducido
- Animación: `animation-timeline: view()` para fade-in en scroll (con fallback)

### 5. `HauledFeatured.vue` — REFACTORIZAR
- Sección sobre fondo `#F4F4F4`
- Product cards: imagen 3:4, fondo blanco, precio dual COP+USD
- Hover: scale + overlay con botón "Ver producto"
- Grid: 4 col → 2 col tablet → 2 col mobile

### 6. `HauledEncargoCTA.vue` — MEJORA MENOR
- Tipografía migrada a tokens
- Checkmarks reemplazados por SVG
- Mobile: padding ajustado

### 7. `footer-one.vue` — REFACTORIZAR COMPLETO
- Fondo: `#111`
- Logo HAULED completo (texto + subtag)
- 3 columnas en español: Tienda / Información / Contacto
- Links relevantes: Catálogo, Encargos, Mi cuenta, Política de envíos
- WhatsApp CTA
- Bottom bar: `© 2025 HAULED · Bogotá, Colombia · Todos los derechos reservados`
- Mobile: stack full-width

### 8. `shop-area.vue` — MEJORA DE ESTILOS
- Inyectar CSS scoped con tokens HAULED
- Product cards: mismo estilo que HauledFeatured
- Sidebar: fondo blanco, títulos con font HAULED
- Breadcrumb: styled con tokens

### 9. `product-details-area.vue` — MEJORA DE ESTILOS
- Título: Raleway 900 token h1
- Precio: COP grande + USD muted debajo
- Selector de tallas: botones styled (borde azul al seleccionar)
- CTA "Añadir al carrito": botón azul full-width
- Mobile: sticky bottom bar con precio + botón add-to-cart

---

## Mobile Standard (transversal)

| Ruta | Punto crítico mobile |
|---|---|
| `/` | Hero stack vertical, secciones 1-col |
| `/shop` | Grid 2-col, sidebar collapsable |
| `/product-details/[id]` | Sticky CTA bottom bar |
| `/cart` | Totales siempre visibles |
| `/checkout` | Formulario legible, inputs 16px mínimo |

**Reglas:**
- `font-size` mínimo 13px en cualquier elemento visible
- `line-height` mínimo 1.4 en párrafos
- Inputs: `font-size: 16px` para evitar zoom automático en iOS
- Touch targets: mínimo 44×44px
- Sin overflow-x en ninguna ruta
- Imágenes: siempre `object-fit: cover` con aspect-ratio definido

---

## Scroll Animations

Implementar con CSS `@keyframes` + `IntersectionObserver` (compatible con todos los browsers):

```css
@keyframes hauled-fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
.hauled-animate {
  animation: hauled-fade-up 0.5s var(--h-ease) both;
}
```

Usar `animation-delay` escalonado en grids para efecto cascada.

Para browsers que soporten `animation-timeline: view()`, usar como progressive enhancement.

---

## Archivos Tocados

| Archivo | Acción |
|---|---|
| `app/assets/scss/_tokens.scss` | CREAR |
| `app/assets/scss/main.scss` | Importar `_tokens.scss` |
| `app/components/header/header-one.vue` | Refactorizar |
| `app/components/hauled/HauledHero.vue` | Refactorizar completo |
| `app/components/hauled/HauledLines.vue` | Refactorizar |
| `app/components/hauled/HauledFeatured.vue` | Refactorizar |
| `app/components/hauled/HauledEncargoCTA.vue` | Mejora menor |
| `app/components/footer/footer-one.vue` | Refactorizar completo |
| `app/components/shop/shop-area.vue` | Mejora estilos |
| `app/components/product-details/product-details-area.vue` | Mejora estilos |

---

## Fuera de Alcance

- Deploy a EasyPanel o Vercel
- Backend / API (no se toca hauled-api)
- Integración Wompi (ya existe)
- Nuevos productos
- Autenticación
