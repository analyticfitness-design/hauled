# HAULED Frontend Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign HAULED frontend to production quality — dark brand header/hero, design tokens, fully branded footer, premium product cards, and mobile-first standard across all routes.

**Architecture:** Dark header + full-viewport hero (black bg) flow into light catalog sections (white/grey). CSS Custom Properties tokens centralize all colors and typography. Each component uses scoped styles referencing these tokens. No API changes — data stays in product-data.ts.

**Tech Stack:** Nuxt 4, Vue 3, SCSS, Bootstrap 5 (kept), Raleway + Inter (Google Fonts, already loaded), Pinia

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `app/assets/scss/_tokens.scss` | CREATE | CSS Custom Properties — single source of truth for all colors/typography/spacing |
| `app/assets/scss/main.scss` | MODIFY | Import `_tokens.scss` at top |
| `app/components/header/header-one.vue` | MODIFY | Dark header (#111), correct HAULED logo with subtag, sticky blur |
| `app/components/hauled/HauledHero.vue` | MODIFY | Full-viewport dark hero, 2-col desktop / 1-col mobile, entry animation |
| `app/components/hauled/HauledLines.vue` | MODIFY | Upgrade cards with hover border, remove emoji icons, scroll animation |
| `app/components/hauled/HauledFeatured.vue` | MODIFY | Premium product cards with dual COP+USD price, overlay hover |
| `app/components/hauled/HauledEncargoCTA.vue` | MODIFY | Migrate to tokens, SVG checkmarks |
| `app/components/footer/footer-one.vue` | MODIFY | Complete HAULED-branded footer in Spanish |
| `app/components/shop/shop-area.vue` | MODIFY | HAULED-styled product cards and toolbar |
| `app/components/product-details/product-details-wrapper.vue` | MODIFY | Premium typography, size selector, mobile sticky CTA |

---

## Task 1: Design Tokens

**Files:**
- Create: `app/assets/scss/_tokens.scss`
- Modify: `app/assets/scss/main.scss`

- [ ] **Step 1: Crear `_tokens.scss`**

```scss
// app/assets/scss/_tokens.scss
:root {
  // ── Colors ──────────────────────────────────────
  --h-black:        #111111;
  --h-blue:         #4CC9F0;
  --h-white:        #FFFFFF;
  --h-grey:         #F4F4F4;
  --h-navy:         #0d2233;
  --h-muted:        rgba(255, 255, 255, 0.60);
  --h-muted-dark:   rgba(0, 0, 0, 0.45);
  --h-border-dark:  rgba(255, 255, 255, 0.10);
  --h-border-light: rgba(0, 0, 0, 0.10);

  // ── Typography sizes (clamp = responsive) ───────
  --h-fs-display: clamp(2.8rem, 10vw, 6.5rem);
  --h-fs-h1:      clamp(2rem, 6vw, 3.5rem);
  --h-fs-h2:      clamp(1.4rem, 4vw, 2.2rem);
  --h-fs-h3:      clamp(1.1rem, 3vw, 1.5rem);
  --h-fs-body:    clamp(0.875rem, 3.5vw, 1rem);
  --h-fs-small:   0.8rem;
  --h-fs-label:   0.72rem;

  // ── Letter spacing ───────────────────────────────
  --h-ls-display: -2px;
  --h-ls-title:    3px;
  --h-ls-label:    4px;
  --h-ls-logo:    10px;
  --h-ls-sub:      7px;

  // ── Spacing ──────────────────────────────────────
  --h-section-py: clamp(60px, 8vw, 120px);
  --h-gap-grid:   clamp(12px, 2vw, 24px);

  // ── Transitions ──────────────────────────────────
  --h-ease:     cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --h-dur-fast: 180ms;
  --h-dur-med:  320ms;

  // ── Shadows ──────────────────────────────────────
  --h-shadow-card:  0 4px 20px rgba(0, 0, 0, 0.08);
  --h-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.15);
}

// ── Scroll animation keyframe (global) ──────────────
@keyframes hauled-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hauled-animate {
  animation: hauled-fade-up 0.5s var(--h-ease) both;
}
```

- [ ] **Step 2: Importar tokens en main.scss**

Abre `app/assets/scss/main.scss`. Agrega `@use 'tokens';` como primera línea:

```scss
@use 'tokens';
@forward '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
@forward '../../../node_modules/swiper/swiper-bundle.min.css';
@forward 'theme';
@forward 'components';
@forward 'layout';
```

- [ ] **Step 3: Verificar que dev server compila sin error**

```bash
# En C:\Users\GODSF\Herd\Hauled
npx nuxi dev --port 3001
```
Esperado: servidor arriba en http://localhost:3001 sin errores SCSS en consola.

- [ ] **Step 4: Commit**

```bash
git add app/assets/scss/_tokens.scss app/assets/scss/main.scss
git commit -m "feat: add HAULED CSS design tokens"
```

---

## Task 2: Header Oscuro + Logo Correcto

**Files:**
- Modify: `app/components/header/header-one.vue`

- [ ] **Step 1: Reemplazar header-one.vue completo**

```vue
<template>
  <header>
    <div class="h-header-wrap p-relative z-index-11">

      <!-- Topbar -->
      <div class="h-topbar d-none d-md-block">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <span class="h-topbar-text">✈️ Direct from the States · Envío a todo Colombia</span>
            </div>
            <div class="col-md-6 text-end">
              <a href="https://wa.me/573000000000" target="_blank" class="h-topbar-wa">WhatsApp</a>
              <span class="h-topbar-sep">|</span>
              <nuxt-link href="/login" class="h-topbar-link">Mi cuenta</nuxt-link>
              <span class="h-topbar-sep">|</span>
              <nuxt-link href="/order" class="h-topbar-link">Mis pedidos</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Header principal -->
      <div :class="`h-main ${isSticky ? 'h-main--sticky' : ''}`">
        <div class="container">
          <div class="row align-items-center">

            <!-- Logo -->
            <div class="col-xl-2 col-lg-2 col-md-4 col-6">
              <nuxt-link href="/" class="h-logo">
                <span class="h-logo-word">HAULED</span>
                <span class="h-logo-sub">DIRECT FROM THE STATES</span>
              </nuxt-link>
            </div>

            <!-- Búsqueda desktop -->
            <div class="col-xl-6 col-lg-7 d-none d-lg-block">
              <header-component-search />
            </div>

            <!-- Iconos derecha -->
            <div class="col-xl-4 col-lg-3 col-md-8 col-6">
              <div class="h-actions d-flex align-items-center justify-content-end gap-2">
                <nuxt-link href="/wishlist" class="h-action-btn d-none d-lg-flex">
                  <svg-wishlist />
                  <span class="h-badge">{{ wishlistStore.wishlists.length }}</span>
                </nuxt-link>
                <button @click="cartStore.handleCartOffcanvas" type="button" class="h-action-btn cartmini-open-btn">
                  <svg-cart-bag />
                  <span class="h-badge">{{ cartStore.totalPriceQuantity.quantity }}</span>
                </button>
                <button @click="utilsStore.handleOpenMobileMenu()" type="button" class="h-action-btn d-lg-none tp-offcanvas-open-btn">
                  <svg-menu-icon />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Nav -->
      <div class="h-nav d-none d-lg-block">
        <div class="container">
          <div class="tp-mega-menu-wrapper p-relative">
            <div class="row align-items-center">
              <div class="col-xl-3 col-lg-3">
                <header-component-top-categories />
              </div>
              <div class="col-xl-6 col-lg-6">
                <nav class="tp-main-menu-content main-menu menu-style-1">
                  <header-component-menus />
                </nav>
              </div>
              <div class="col-xl-3 col-lg-3 text-end">
                <span class="h-nav-wa">
                  <a href="https://wa.me/573000000000" target="_blank">+57 300 000 0000</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <offcanvas-cart-sidebar />
  <offcanvas-mobile-sidebar product-type="fashion" />
</template>

<script setup lang="ts">
import { useCartStore } from '@/pinia/useCartStore';
import { useWishlistStore } from '@/pinia/useWishlistStore';
import { useUtilityStore } from '@/pinia/useUtilityStore';

const { isSticky } = useSticky();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilsStore = useUtilityStore();
</script>

<style scoped>
/* ── Topbar ──────────────────────────────────────── */
.h-topbar {
  background: #000;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.h-topbar-text {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.5);
  letter-spacing: 0.5px;
}
.h-topbar-wa {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: #25D366;
  font-weight: 600;
  text-decoration: none;
}
.h-topbar-link {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color var(--h-dur-fast, 180ms);
}
.h-topbar-link:hover { color: var(--h-blue, #4CC9F0); }
.h-topbar-sep { color: rgba(255,255,255,0.12); margin: 0 8px; font-size: 0.7rem; }

/* ── Header principal ────────────────────────────── */
.h-main {
  background: var(--h-black, #111);
  padding: 16px 0;
  border-bottom: 1px solid rgba(76,201,240,0.25);
  position: sticky;
  top: 0;
  z-index: 999;
  transition: background var(--h-dur-med, 320ms), backdrop-filter var(--h-dur-med, 320ms);
}
.h-main--sticky {
  background: rgba(17,17,17,0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ── Logo ────────────────────────────────────────── */
.h-logo {
  display: inline-flex;
  flex-direction: column;
  line-height: 1;
  text-decoration: none;
  gap: 3px;
}
.h-logo-word {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(1.3rem, 4vw, 1.9rem);
  letter-spacing: var(--h-ls-logo, 10px);
  color: #fff;
  text-transform: uppercase;
  transition: color var(--h-dur-fast, 180ms);
}
.h-logo-sub {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.5rem;
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  display: none; /* Visible en >= md */
}
.h-logo:hover .h-logo-word { color: var(--h-blue, #4CC9F0); }

@media (min-width: 576px) { .h-logo-sub { display: block; } }

/* ── Action buttons ──────────────────────────────── */
.h-actions { gap: 8px; }
.h-action-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  border-radius: 6px;
  transition: background var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
}
.h-action-btn:hover { background: rgba(255,255,255,0.08); color: var(--h-blue, #4CC9F0); }
.h-badge {
  position: absolute;
  top: 4px;
  right: 4px;
  min-width: 16px;
  height: 16px;
  background: var(--h-blue, #4CC9F0);
  color: #111;
  font-size: 0.6rem;
  font-weight: 700;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
}

/* ── Nav ─────────────────────────────────────────── */
.h-nav {
  background: var(--h-black, #111);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  padding: 0;
}
.h-nav-wa a {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
}
.h-nav-wa a:hover { color: var(--h-blue, #4CC9F0); }

/* ── Override Bootstrap nav links en dark ─────────── */
:deep(.tp-main-menu-content > ul > li > a),
:deep(.tp-main-menu-content > ul > li > a:hover) {
  color: rgba(255,255,255,0.8) !important;
}
:deep(.tp-main-menu-content > ul > li:hover > a),
:deep(.tp-main-menu-content > ul > li.active > a) {
  color: var(--h-blue, #4CC9F0) !important;
}
</style>
```

- [ ] **Step 2: Verificar en http://localhost:3001**

Abrir navegador. El header debe ser negro con "HAULED" en blanco y subtag azul "DIRECT FROM THE STATES". Al hacer scroll debe quedar semi-transparente con blur.

- [ ] **Step 3: Verificar mobile (375px)**

En DevTools → emular iPhone SE. El logo debe mostrarse, hamburger visible, sin overflow horizontal.

- [ ] **Step 4: Commit**

```bash
git add app/components/header/header-one.vue
git commit -m "feat: dark header with HAULED logo and sticky blur"
```

---

## Task 3: Hero Full-Viewport

**Files:**
- Modify: `app/components/hauled/HauledHero.vue`

- [ ] **Step 1: Reemplazar HauledHero.vue completo**

```vue
<template>
  <section class="h-hero" ref="heroRef">
    <div class="h-hero-bg">
      <!-- Imagen de fondo/derecha: usa el primer producto destacado o placeholder -->
      <div class="h-hero-img-wrap">
        <img
          src="/img/products/gasp/gasp-tactical-backpack-1.jpg"
          alt="HAULED — Direct from the States"
          class="h-hero-img"
        />
        <div class="h-hero-img-overlay" />
      </div>
    </div>

    <div class="container h-hero-container">
      <div class="h-hero-content" :class="{ 'h-hero-content--visible': visible }">
        <!-- Eyebrow -->
        <p class="h-hero-eyebrow">
          <span class="h-eyebrow-line" />
          Direct from the States
        </p>

        <!-- Título display -->
        <h1 class="h-hero-title">
          Moda<br>
          <span class="h-hero-title--accent">Original</span><br>
          de USA
        </h1>

        <!-- Sub -->
        <p class="h-hero-sub">
          Nike, Jordan, Gap, Tommy, GASP — prendas auténticas traídas directamente
          desde outlets de Estados Unidos. Envío a todo Colombia.
        </p>

        <!-- CTAs -->
        <div class="h-hero-ctas">
          <nuxt-link to="/shop" class="h-btn-primary">Ver catálogo</nuxt-link>
          <a
            :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola HAULED, quiero hacer un encargo 📦')}`"
            target="_blank"
            class="h-btn-ghost"
          >Hacer encargo →</a>
        </div>

        <!-- Badges de confianza -->
        <div class="h-hero-trust">
          <span class="h-trust-item">✦ Autenticidad garantizada</span>
          <span class="h-trust-item">✦ Envío nacional</span>
          <span class="h-trust-item">✦ Pago seguro</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="h-scroll-indicator">
      <span class="h-scroll-line" />
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const whatsappNumber = config.public.whatsappNumber as string;

const heroRef = ref<HTMLElement | null>(null);
const visible = ref(false);

onMounted(() => {
  requestAnimationFrame(() => { visible.value = true; });
});
</script>

<style scoped>
/* ── Hero base ────────────────────────────────────── */
.h-hero {
  position: relative;
  min-height: 100svh;
  background: var(--h-black, #111);
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* ── Background image ─────────────────────────────── */
.h-hero-bg {
  position: absolute;
  inset: 0;
}
.h-hero-img-wrap {
  position: absolute;
  inset: 0;
  right: 0;
  left: 45%;
}
@media (max-width: 991px) {
  .h-hero-img-wrap { left: 0; opacity: 0.25; }
}
.h-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.h-hero-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    var(--h-black, #111) 20%,
    rgba(17,17,17,0.7) 60%,
    rgba(17,17,17,0.3) 100%
  );
}
@media (max-width: 991px) {
  .h-hero-img-overlay {
    background: rgba(17,17,17,0.75);
  }
}

/* ── Content ──────────────────────────────────────── */
.h-hero-container {
  position: relative;
  z-index: 2;
  padding-top: clamp(80px, 10vw, 120px);
  padding-bottom: clamp(60px, 8vw, 100px);
}
.h-hero-content {
  max-width: 600px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--h-ease, ease), transform 0.7s var(--h-ease, ease);
}
.h-hero-content--visible {
  opacity: 1;
  transform: translateY(0);
}

/* ── Eyebrow ──────────────────────────────────────── */
.h-hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 20px;
}
.h-eyebrow-line {
  display: inline-block;
  width: 44px;
  height: 2px;
  background: var(--h-blue, #4CC9F0);
  flex-shrink: 0;
}

/* ── Title ────────────────────────────────────────── */
.h-hero-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-display, clamp(2.8rem, 10vw, 6.5rem));
  line-height: 0.9;
  letter-spacing: var(--h-ls-display, -2px);
  color: #fff;
  margin-bottom: 28px;
  text-transform: uppercase;
}
.h-hero-title--accent { color: var(--h-blue, #4CC9F0); }

/* ── Sub ──────────────────────────────────────────── */
.h-hero-sub {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 1rem);
  line-height: 1.65;
  color: var(--h-muted, rgba(255,255,255,0.6));
  max-width: 440px;
  margin-bottom: 36px;
}

/* ── CTAs ─────────────────────────────────────────── */
.h-hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}
.h-btn-primary {
  display: inline-block;
  background: var(--h-blue, #4CC9F0);
  color: #111;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 15px 32px;
  border-radius: 4px;
  text-decoration: none;
  transition: background var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}
.h-btn-primary:hover { background: #fff; color: #111; }
.h-btn-ghost {
  display: inline-flex;
  align-items: center;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.88rem;
  letter-spacing: 1px;
  padding: 15px 24px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  text-decoration: none;
  min-height: 44px;
  transition: border-color var(--h-dur-fast, 180ms), background var(--h-dur-fast, 180ms);
}
.h-btn-ghost:hover { border-color: var(--h-blue, #4CC9F0); color: var(--h-blue, #4CC9F0); }

/* ── Trust badges ─────────────────────────────────── */
.h-hero-trust {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.h-trust-item {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.4);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* ── Scroll indicator ─────────────────────────────── */
.h-scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.h-scroll-line {
  display: block;
  width: 1px;
  height: 48px;
  background: linear-gradient(to bottom, transparent, var(--h-blue, #4CC9F0));
  margin: auto;
  animation: scrollPulse 2s ease infinite;
}
@keyframes scrollPulse {
  0%   { opacity: 0; transform: scaleY(0); transform-origin: top; }
  50%  { opacity: 1; }
  100% { opacity: 0; transform: scaleY(1); transform-origin: top; }
}

/* ── Mobile overrides ─────────────────────────────── */
@media (max-width: 575px) {
  .h-hero { min-height: 85svh; }
  .h-hero-ctas { flex-direction: column; }
  .h-btn-primary, .h-btn-ghost { width: 100%; justify-content: center; }
  .h-hero-trust { gap: 10px; }
}
</style>
```

- [ ] **Step 2: Verificar en http://localhost:3001**

El hero debe ser full-viewport oscuro, con "Moda Original de USA" en tipografía display Raleway 900, imagen a la derecha, botones visibles. Scroll indicator animado en el fondo.

- [ ] **Step 3: Verificar mobile (375px)**

Imagen debe ser overlay semi-transparente. Texto centrado y legible. Botones full-width.

- [ ] **Step 4: Commit**

```bash
git add app/components/hauled/HauledHero.vue
git commit -m "feat: full-viewport dark hero with entry animation"
```

---

## Task 4: HauledLines Upgrade

**Files:**
- Modify: `app/components/hauled/HauledLines.vue`

- [ ] **Step 1: Reemplazar HauledLines.vue**

```vue
<template>
  <section class="hl-section">
    <div class="container">
      <div class="hl-header">
        <p class="hl-eyebrow">Nuestro catálogo</p>
        <h2 class="hl-title">Tres líneas, una misión</h2>
      </div>
      <div class="hl-grid">

        <!-- Originals -->
        <nuxt-link to="/shop?hauledLine=originals" class="hl-card hl-card--originals" ref="card1">
          <div class="hl-card-inner">
            <span class="hl-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
              </svg>
            </span>
            <h3 class="hl-name">Originals</h3>
            <p class="hl-desc">Stock real comprado en outlets de USA. Nike, Gap, Tommy, Jordan, Adidas — prendas auténticas con etiquetas originales.</p>
            <span class="hl-cta">Ver colección <span class="hl-arrow">→</span></span>
          </div>
        </nuxt-link>

        <!-- Basics -->
        <nuxt-link to="/shop?hauledLine=basics" class="hl-card hl-card--basics">
          <div class="hl-card-inner">
            <span class="hl-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 9h6M9 12h6M9 15h4"/>
              </svg>
            </span>
            <h3 class="hl-name">Basics</h3>
            <p class="hl-desc">Prendas premium de marca propia HAULED. Oversize, streetwear minimalista. Calidad de exportación a precios directos.</p>
            <span class="hl-cta">Ver basics <span class="hl-arrow">→</span></span>
          </div>
        </nuxt-link>

        <!-- Encargos -->
        <nuxt-link to="/shop?hauledLine=encargo" class="hl-card hl-card--encargo">
          <div class="hl-card-inner">
            <span class="hl-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M20 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </span>
            <h3 class="hl-name">Encargos</h3>
            <p class="hl-desc">¿Quieres algo que no tenemos en stock? Dinos qué y lo traemos. Tallas, colores, modelos especiales. 15–25 días.</p>
            <span class="hl-cta">Hacer encargo <span class="hl-arrow">→</span></span>
          </div>
        </nuxt-link>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hl-section {
  padding: var(--h-section-py, 80px) 0;
  background: var(--h-black, #111);
}
.hl-header {
  text-align: center;
  margin-bottom: clamp(36px, 5vw, 60px);
}
.hl-eyebrow {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.hl-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, clamp(1.4rem, 4vw, 2.2rem));
  letter-spacing: var(--h-ls-title, 3px);
  text-transform: uppercase;
  color: #fff;
  margin: 0;
}
.hl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--h-gap-grid, 20px);
}
@media (max-width: 768px) { .hl-grid { grid-template-columns: 1fr; } }
@media (min-width: 769px) and (max-width: 991px) { .hl-grid { grid-template-columns: repeat(2, 1fr); } }

.hl-card {
  display: block;
  text-decoration: none;
  border-radius: 6px;
  overflow: hidden;
  transition: transform var(--h-dur-med, 320ms) var(--h-ease, ease),
              box-shadow var(--h-dur-med, 320ms) var(--h-ease, ease);
  border: 1px solid transparent;
}
.hl-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--h-shadow-hover, 0 12px 40px rgba(0,0,0,0.3));
  border-color: var(--h-blue, #4CC9F0);
}
.hl-card-inner { padding: clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px); }

.hl-card--originals { background: #0d2233; color: #fff; }
.hl-card--basics    { background: #1a1a1a; color: #fff; border-color: rgba(255,255,255,0.08) !important; }
.hl-card--encargo   { background: #111; color: #fff; border-color: rgba(76,201,240,0.2) !important; }
.hl-card--basics:hover, .hl-card--originals:hover, .hl-card--encargo:hover {
  border-color: var(--h-blue, #4CC9F0) !important;
}

.hl-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: rgba(76,201,240,0.1);
  border-radius: 6px;
  color: var(--h-blue, #4CC9F0);
  margin-bottom: 20px;
}
.hl-name {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h3, 1.4rem);
  letter-spacing: var(--h-ls-title, 3px);
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 12px;
}
.hl-desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 0.95rem);
  line-height: 1.65;
  color: rgba(255,255,255,0.6);
  margin-bottom: 24px;
}
.hl-cta {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-small, 0.8rem);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
  display: flex;
  align-items: center;
  gap: 6px;
}
.hl-arrow { transition: transform var(--h-dur-fast, 180ms); }
.hl-card:hover .hl-arrow { transform: translateX(4px); }
</style>
```

- [ ] **Step 2: Verificar en browser**

Las 3 cards deben ser oscuras (navy, charcoal, black), con borde azul al hover y flecha que se mueve.

- [ ] **Step 3: Commit**

```bash
git add app/components/hauled/HauledLines.vue
git commit -m "feat: upgrade HauledLines with dark cards and hover animations"
```

---

## Task 5: HauledFeatured — Premium Product Cards

**Files:**
- Modify: `app/components/hauled/HauledFeatured.vue`

- [ ] **Step 1: Reemplazar HauledFeatured.vue**

```vue
<template>
  <section class="hf-section">
    <div class="container">
      <div class="hf-header">
        <div>
          <p class="hf-eyebrow">Colección</p>
          <h2 class="hf-title">Lo más nuevo</h2>
        </div>
        <nuxt-link to="/shop" class="hf-see-all">Ver todo <span>→</span></nuxt-link>
      </div>

      <div class="hf-grid">
        <div
          v-for="(product, i) in featuredProducts"
          :key="product.id"
          class="hf-item"
          :style="`animation-delay: ${i * 60}ms`"
        >
          <nuxt-link :to="`/product-details/${product.id}`" class="hf-img-wrap">
            <img
              :src="product.img || '/img/placeholder.jpg'"
              :alt="product.title"
              class="hf-img"
              loading="lazy"
            />
            <!-- Badge línea -->
            <span v-if="product.hauledLine" class="hf-badge" :class="`hf-badge--${product.hauledLine}`">
              {{ lineBadgeText(product.hauledLine) }}
            </span>
            <!-- Overlay hover -->
            <div class="hf-overlay">
              <span class="hf-overlay-btn">Ver producto</span>
            </div>
          </nuxt-link>

          <div class="hf-info">
            <p class="hf-name">{{ product.title }}</p>
            <div class="hf-prices">
              <template v-if="product.hauledLine === 'encargo'">
                <span class="hf-price-encargo">Cotizar →</span>
              </template>
              <template v-else>
                <span class="hf-price-cop">{{ formatCOP(product.price) }}</span>
                <span v-if="product.priceUsd" class="hf-price-usd">USD ${{ product.priceUsd }}</span>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import product_data from '@/data/product-data';

const featuredProducts = computed(() =>
  product_data.filter(p => p.status === 'New' || p.featured || p.hauledLine).slice(0, 8)
);

const lineBadgeText = (line: string) => {
  if (line === 'originals') return 'USA';
  if (line === 'basics') return 'HAULED';
  return 'Encargo';
};

const formatCOP = (price: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
</script>

<style scoped>
.hf-section {
  padding: var(--h-section-py, 80px) 0;
  background: var(--h-grey, #F4F4F4);
}
.hf-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: clamp(28px, 4vw, 48px);
}
.hf-eyebrow {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 6px;
}
.hf-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, 2rem);
  letter-spacing: var(--h-ls-title, 3px);
  text-transform: uppercase;
  color: var(--h-black, #111);
  margin: 0;
}
.hf-see-all {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--h-black, #111);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  transition: color var(--h-dur-fast, 180ms);
  white-space: nowrap;
}
.hf-see-all:hover { color: var(--h-blue, #4CC9F0); }
.hf-see-all span { transition: transform var(--h-dur-fast, 180ms); display: inline-block; }
.hf-see-all:hover span { transform: translateX(4px); }

/* ── Grid ─────────────────────────────────────────── */
.hf-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--h-gap-grid, 20px);
}
@media (max-width: 991px) { .hf-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 375px)  { .hf-grid { gap: 10px; } }

/* ── Product card ─────────────────────────────────── */
.hf-item { display: flex; flex-direction: column; }

.hf-img-wrap {
  position: relative;
  display: block;
  background: #e8e8e8;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 3 / 4;
  margin-bottom: 14px;
  text-decoration: none;
}
.hf-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--h-dur-med, 320ms) var(--h-ease, ease);
}
.hf-item:hover .hf-img { transform: scale(1.05); }

/* Badge */
.hf-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: 'Inter', sans-serif;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 3px;
  z-index: 1;
}
.hf-badge--originals { background: var(--h-navy, #0d2233); color: var(--h-blue, #4CC9F0); }
.hf-badge--basics    { background: rgba(0,0,0,0.7); color: #fff; }
.hf-badge--encargo   { background: var(--h-black, #111); color: #fff; }

/* Overlay */
.hf-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17,17,17,0.55);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
  opacity: 0;
  transition: opacity var(--h-dur-med, 320ms);
}
.hf-item:hover .hf-overlay { opacity: 1; }
.hf-overlay-btn {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  background: var(--h-blue, #4CC9F0);
  color: #111;
  padding: 10px 22px;
  border-radius: 3px;
}

/* Info */
.hf-info { flex: 1; }
.hf-name {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 0.9rem);
  color: #333;
  margin-bottom: 5px;
  line-height: 1.3;
  font-weight: 500;
}
.hf-prices { display: flex; flex-direction: column; gap: 1px; }
.hf-price-cop {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--h-black, #111);
}
.hf-price-usd {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: var(--h-muted-dark, rgba(0,0,0,0.45));
}
.hf-price-encargo {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--h-blue, #4CC9F0);
}
</style>
```

- [ ] **Step 2: Verificar en browser**

8 productos con cards blancas sobre sección gris. Al hover: imagen hace zoom + overlay azul "Ver producto". Badge de línea visible. Precios COP + USD muted.

- [ ] **Step 3: Commit**

```bash
git add app/components/hauled/HauledFeatured.vue
git commit -m "feat: premium product cards with dual price and hover overlay"
```

---

## Task 6: Footer HAULED Completo

**Files:**
- Modify: `app/components/footer/footer-one.vue`

- [ ] **Step 1: Reemplazar footer-one.vue**

```vue
<template>
  <footer class="hfoot">
    <div class="hfoot-main">
      <div class="container">
        <div class="row hfoot-row">

          <!-- Col 1: Brand -->
          <div class="col-xl-4 col-lg-4 col-md-6 col-12 hfoot-col">
            <div class="hfoot-brand">
              <nuxt-link to="/" class="hfoot-logo">
                <span class="hfoot-logo-word">HAULED</span>
                <span class="hfoot-logo-sub">Direct from the States</span>
              </nuxt-link>
              <p class="hfoot-desc">
                Ropa original de USA traída directamente a Colombia. Nike, Jordan, Gap, GASP y más — autenticidad garantizada, envío nacional.
              </p>
              <div class="hfoot-social">
                <a href="https://instagram.com/hauled.co" target="_blank" aria-label="Instagram" class="hfoot-social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                </a>
                <a href="https://wa.me/573000000000" target="_blank" aria-label="WhatsApp" class="hfoot-social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@hauled.co" target="_blank" aria-label="TikTok" class="hfoot-social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Col 2: Tienda -->
          <div class="col-xl-2 col-lg-2 col-md-6 col-6 hfoot-col">
            <h5 class="hfoot-heading">Tienda</h5>
            <ul class="hfoot-links">
              <li><nuxt-link to="/shop">Catálogo completo</nuxt-link></li>
              <li><nuxt-link to="/shop?hauledLine=originals">Originals USA</nuxt-link></li>
              <li><nuxt-link to="/shop?hauledLine=basics">Basics HAULED</nuxt-link></li>
              <li><nuxt-link to="/shop?hauledLine=encargo">Encargos</nuxt-link></li>
              <li><nuxt-link to="/wishlist">Lista de deseos</nuxt-link></li>
            </ul>
          </div>

          <!-- Col 3: Información -->
          <div class="col-xl-3 col-lg-3 col-md-6 col-6 hfoot-col">
            <h5 class="hfoot-heading">Información</h5>
            <ul class="hfoot-links">
              <li><a href="#">Sobre HAULED</a></li>
              <li><a href="#">Política de envíos</a></li>
              <li><a href="#">Cambios y devoluciones</a></li>
              <li><a href="#">Política de privacidad</a></li>
              <li><a href="#">Términos y condiciones</a></li>
            </ul>
          </div>

          <!-- Col 4: Contacto -->
          <div class="col-xl-3 col-lg-3 col-md-6 col-12 hfoot-col">
            <h5 class="hfoot-heading">Contacto</h5>
            <div class="hfoot-contact">
              <p class="hfoot-contact-line">
                <span class="hfoot-contact-label">WhatsApp</span>
                <a href="https://wa.me/573000000000" target="_blank">+57 300 000 0000</a>
              </p>
              <p class="hfoot-contact-line">
                <span class="hfoot-contact-label">Email</span>
                <a href="mailto:hola@hauled.shop">hola@hauled.shop</a>
              </p>
              <p class="hfoot-contact-line">
                <span class="hfoot-contact-label">Ubicación</span>
                <span>Bogotá, Colombia</span>
              </p>
              <a
                :href="`https://wa.me/573000000000?text=${encodeURIComponent('Hola HAULED, tengo una pregunta 👋')}`"
                target="_blank"
                class="hfoot-wa-btn"
              >
                Escribirnos por WhatsApp
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom bar -->
    <div class="hfoot-bottom">
      <div class="container">
        <div class="hfoot-bottom-inner">
          <p class="hfoot-copy">© {{ new Date().getFullYear() }} HAULED · Bogotá, Colombia · Todos los derechos reservados</p>
          <div class="hfoot-payments">
            <span class="hfoot-payment-badge">Nequi</span>
            <span class="hfoot-payment-badge">Daviplata</span>
            <span class="hfoot-payment-badge">Wompi</span>
            <span class="hfoot-payment-badge">Visa</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
defineProps<{ primary_style?: boolean; style_2?: boolean; style_3?: boolean; }>();
</script>

<style scoped>
.hfoot {
  background: var(--h-black, #111);
  color: #fff;
}
.hfoot-main {
  padding: clamp(48px, 7vw, 96px) 0 clamp(36px, 5vw, 64px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
.hfoot-row { gap: 40px 0; }
.hfoot-col { padding-top: 0; }

/* Brand */
.hfoot-logo {
  display: inline-flex;
  flex-direction: column;
  text-decoration: none;
  margin-bottom: 20px;
  gap: 3px;
}
.hfoot-logo-word {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.8rem;
  letter-spacing: var(--h-ls-logo, 10px);
  color: #fff;
}
.hfoot-logo-sub {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.5rem;
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
}
.hfoot-desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.82rem);
  line-height: 1.7;
  color: rgba(255,255,255,0.45);
  margin-bottom: 24px;
  max-width: 320px;
}
.hfoot-social { display: flex; gap: 10px; }
.hfoot-social-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 6px;
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  transition: border-color var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
}
.hfoot-social-btn:hover { border-color: var(--h-blue, #4CC9F0); color: var(--h-blue, #4CC9F0); }

/* Headings + Links */
.hfoot-heading {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-small, 0.82rem);
  letter-spacing: var(--h-ls-label, 4px);
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 20px;
}
.hfoot-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.hfoot-links a {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.85rem);
  color: rgba(255,255,255,0.45);
  text-decoration: none;
  transition: color var(--h-dur-fast, 180ms);
  padding: 4px 0; /* touch target */
  display: block;
}
.hfoot-links a:hover { color: var(--h-blue, #4CC9F0); }

/* Contact */
.hfoot-contact { display: flex; flex-direction: column; gap: 12px; }
.hfoot-contact-line {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin: 0;
}
.hfoot-contact-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.3);
}
.hfoot-contact-line a,
.hfoot-contact-line span:last-child {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.85rem);
  color: rgba(255,255,255,0.6);
  text-decoration: none;
  transition: color var(--h-dur-fast, 180ms);
}
.hfoot-contact-line a:hover { color: var(--h-blue, #4CC9F0); }
.hfoot-wa-btn {
  display: inline-block;
  background: #25D366;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.82rem;
  padding: 12px 20px;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  margin-top: 8px;
  transition: background var(--h-dur-fast, 180ms);
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hfoot-wa-btn:hover { background: #1aab52; }

/* Bottom bar */
.hfoot-bottom { padding: 20px 0; }
.hfoot-bottom-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}
.hfoot-copy {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.25);
  margin: 0;
}
.hfoot-payments { display: flex; gap: 8px; flex-wrap: wrap; }
.hfoot-payment-badge {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.25);
  border: 1px solid rgba(255,255,255,0.1);
  padding: 3px 8px;
  border-radius: 3px;
}

@media (max-width: 575px) {
  .hfoot-bottom-inner { flex-direction: column; align-items: flex-start; }
  .hfoot-desc { max-width: 100%; }
}
</style>
```

- [ ] **Step 2: Verificar en browser**

Footer oscuro completo con: logo HAULED + subtag, 4 columnas, links en español, redes sociales, WhatsApp CTA, bottom bar con año y métodos de pago.

- [ ] **Step 3: Verificar mobile**

Stack en 1 columna, links con área táctil generosa.

- [ ] **Step 4: Commit**

```bash
git add app/components/footer/footer-one.vue
git commit -m "feat: full HAULED-branded footer in Spanish"
```

---

## Task 7: HauledEncargoCTA — Migrate to Tokens

**Files:**
- Modify: `app/components/hauled/HauledEncargoCTA.vue`

- [ ] **Step 1: Actualizar solo el bloque `<style scoped>` de HauledEncargoCTA.vue**

Reemplaza el bloque `<style scoped>` existente con:

```css
<style scoped>
.hauled-encargo-cta {
  padding: var(--h-section-py, 80px) 0;
  background: var(--h-navy, #0d2233);
}
.hauled-encargo-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(30px, 5vw, 60px);
  align-items: center;
}
@media (max-width: 768px) {
  .hauled-encargo-inner { grid-template-columns: 1fr; gap: 36px; }
}
.hauled-encargo-eyebrow {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  font-weight: 300;
  letter-spacing: var(--h-ls-sub, 7px);
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
  margin-bottom: 16px;
}
.hauled-encargo-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, 2rem);
  letter-spacing: var(--h-ls-title, 2px);
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 16px;
}
.hauled-encargo-desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 0.95rem);
  line-height: 1.7;
  color: var(--h-muted, rgba(255,255,255,0.6));
  margin-bottom: 24px;
  max-width: 480px;
}
.hauled-encargo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hauled-encargo-list li {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.88rem);
  color: rgba(255,255,255,0.75);
  display: flex;
  align-items: center;
  gap: 8px;
}
.hauled-encargo-action {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
  min-width: 250px;
}
@media (max-width: 768px) { .hauled-encargo-action { min-width: 0; } }
.hauled-wa-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25D366;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 1px;
  padding: 16px 28px;
  border-radius: 6px;
  text-decoration: none;
  min-height: 44px;
  transition: background var(--h-dur-fast, 180ms);
}
.hauled-wa-cta:hover { background: #1aab52; }
.hauled-catalog-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--h-blue, #4CC9F0);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--h-fs-small, 0.85rem);
  padding: 14px 28px;
  border: 1px solid var(--h-blue, #4CC9F0);
  border-radius: 6px;
  text-decoration: none;
  min-height: 44px;
  transition: background var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
}
.hauled-catalog-cta:hover { background: var(--h-blue, #4CC9F0); color: #111; }
.hauled-encargo-note {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.3);
  text-align: center;
  margin: 0;
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/hauled/HauledEncargoCTA.vue
git commit -m "feat: migrate HauledEncargoCTA to design tokens"
```

---

## Task 8: Shop Area — HAULED Styles

**Files:**
- Modify: `app/components/shop/shop-area.vue`

- [ ] **Step 1: Agregar bloque `<style>` (no scoped) al final de shop-area.vue**

Abre `app/components/shop/shop-area.vue`. Al final del archivo, AGREGA (no reemplaces):

```vue
<style>
/* ── HAULED Shop Override ─────────────────────────── */
.tp-shop-area {
  background: var(--h-white, #fff);
  padding-bottom: clamp(60px, 8vw, 120px);
}

/* Breadcrumb / topbar */
.tp-shop-top-result p {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.82rem);
  color: rgba(0,0,0,0.45);
}

/* Grid/list toggle buttons */
.tp-shop-top-tab .nav-link {
  background: transparent;
  border: 1px solid var(--h-border-light, rgba(0,0,0,0.1));
  border-radius: 4px;
  color: rgba(0,0,0,0.4);
  padding: 6px 10px;
  transition: all var(--h-dur-fast, 180ms);
}
.tp-shop-top-tab .nav-link.active,
.tp-shop-top-tab .nav-link:hover {
  background: var(--h-black, #111);
  border-color: var(--h-black, #111);
  color: #fff;
}

/* Product card en shop */
.tp-product-item-2 {
  border: none;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
  box-shadow: var(--h-shadow-card, 0 4px 20px rgba(0,0,0,0.06));
  transition: box-shadow var(--h-dur-med, 320ms), transform var(--h-dur-med, 320ms);
}
.tp-product-item-2:hover {
  box-shadow: var(--h-shadow-hover, 0 12px 40px rgba(0,0,0,0.12));
  transform: translateY(-3px);
}
.tp-product-item-2 .tp-product-title a {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  color: var(--h-black, #111);
  font-size: var(--h-fs-body, 0.9rem);
}
.tp-product-item-2 .tp-product-price span {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--h-black, #111);
}
.tp-product-item-2 .new-price {
  color: var(--h-black, #111) !important;
}

/* Sidebar */
.tp-shop-widget {
  border-radius: 8px;
  border: 1px solid var(--h-border-light, rgba(0,0,0,0.08));
  padding: 24px;
  margin-bottom: 20px;
}
.tp-shop-widget-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-small, 0.82rem);
  letter-spacing: var(--h-ls-label, 4px);
  text-transform: uppercase;
  color: var(--h-black, #111);
}
</style>
```

- [ ] **Step 2: Verificar /shop en browser**

La página de catálogo debe verse con cards que tienen sombra suave, hover elevación, tipografía Raleway en precios.

- [ ] **Step 3: Verificar /shop en mobile (375px)**

Grid de 2 columnas, sidebar colapsado (comportamiento Bootstrap existente), sin overflow.

- [ ] **Step 4: Commit**

```bash
git add app/components/shop/shop-area.vue
git commit -m "feat: HAULED-branded shop area styles"
```

---

## Task 9: Product Detail — Premium + Mobile Sticky CTA

**Files:**
- Modify: `app/components/product-details/product-details-wrapper.vue`

- [ ] **Step 1: Agregar bloque `<style>` al final de product-details-wrapper.vue**

Abre `app/components/product-details/product-details-wrapper.vue`. Al final, AGREGA:

```vue
<style>
/* ── Product Detail — HAULED Styles ─────────────────── */
.tp-product-details-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h1, clamp(1.6rem, 4vw, 2.4rem));
  letter-spacing: -0.5px;
  color: var(--h-black, #111);
  line-height: 1.15;
  margin-bottom: 12px;
}

.tp-product-details-price-wrapper {
  margin: 20px 0 24px;
}
.tp-product-details-price.new-price {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(1.5rem, 4vw, 2rem);
  color: var(--h-black, #111);
}
.tp-product-details-price.old-price {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(0,0,0,0.35);
  text-decoration: line-through;
  margin-right: 8px;
}
.hauled-cotizar-price {
  color: var(--h-blue, #4CC9F0) !important;
  font-size: 1.2rem !important;
}

/* Size selector */
.tp-product-details-variation-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-small, 0.82rem);
  letter-spacing: var(--h-ls-label, 4px);
  text-transform: uppercase;
  color: var(--h-black, #111);
  margin-bottom: 12px;
}
.tp-size-variation-btn {
  min-width: 44px !important;
  height: 44px !important;
  border: 1px solid rgba(0,0,0,0.15) !important;
  border-radius: 4px !important;
  font-family: 'Inter', sans-serif !important;
  font-weight: 600 !important;
  font-size: 0.8rem !important;
  color: var(--h-black, #111) !important;
  background: #fff !important;
  cursor: pointer;
  transition: all var(--h-dur-fast, 180ms) !important;
}
.tp-size-variation-btn:hover,
.tp-size-variation-btn.active {
  background: var(--h-black, #111) !important;
  color: #fff !important;
  border-color: var(--h-black, #111) !important;
}

/* Add to cart button */
.tp-product-details-add-btn {
  width: 100%;
  background: var(--h-blue, #4CC9F0) !important;
  color: #111 !important;
  font-family: 'Raleway', sans-serif !important;
  font-weight: 700 !important;
  font-size: 0.85rem !important;
  letter-spacing: 2px !important;
  text-transform: uppercase !important;
  height: 52px !important;
  border-radius: 4px !important;
  border: none !important;
  transition: background var(--h-dur-fast, 180ms) !important;
}
.tp-product-details-add-btn:hover { background: #111 !important; color: #fff !important; }

/* Mobile: sticky bottom CTA */
@media (max-width: 767px) {
  .tp-product-details-add-btn-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background: #fff;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding: 12px 16px;
    box-shadow: 0 -4px 20px rgba(0,0,0,0.08);
  }
}

/* Review stars */
.tp-product-details-rating .fa-star { color: var(--h-blue, #4CC9F0); }

/* Encargo info */
.hauled-encargo-info {
  background: rgba(76,201,240,0.06);
  border: 1px solid rgba(76,201,240,0.2);
  border-radius: 6px;
  padding: 16px;
  margin: 16px 0;
}
.hauled-encargo-row {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.85rem);
  color: rgba(0,0,0,0.65);
  margin-bottom: 8px;
}
.hauled-encargo-row:last-child { margin-bottom: 0; }
.hauled-encargo-icon { font-size: 1rem; }
.hauled-text-toggle {
  color: var(--h-blue, #4CC9F0);
  cursor: pointer;
  font-weight: 600;
  font-size: var(--h-fs-small, 0.85rem);
  margin-left: 4px;
}
.hauled-size-guide {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  color: var(--h-blue, #4CC9F0);
  cursor: pointer;
  margin-left: 8px;
  text-decoration: underline;
  text-transform: none;
  letter-spacing: 0;
}
</style>
```

- [ ] **Step 2: Verificar /product-details/[cualquier-id] en browser**

El título en Raleway 900, precio grande, botón "Agregar al carrito" azul full-width.

- [ ] **Step 3: Verificar en mobile (375px)**

Botón de CTA debe quedar fijo al fondo de la pantalla (sticky bottom bar).

- [ ] **Step 4: Commit**

```bash
git add app/components/product-details/product-details-wrapper.vue
git commit -m "feat: premium product detail styles with mobile sticky CTA"
```

---

## Task 10: Auditoría Mobile Final

**Sin archivos nuevos — verificación en browser**

- [ ] **Step 1: Abrir DevTools → Responsive Mode (375px iPhone SE)**

Revisar cada ruta:

| URL | Check |
|---|---|
| `http://localhost:3001/` | Hero stack, secciones sin overflow-x |
| `http://localhost:3001/shop` | Grid 2-col, sidebar colapsado |
| `http://localhost:3001/product-details/gasp-001` | Sticky CTA bottom |
| `http://localhost:3001/cart` | Totales visibles |

- [ ] **Step 2: Verificar inputs en iOS (font-size mínimo 16px)**

En shop page → buscar inputs de precio en sidebar. Si alguno tiene `font-size < 16px`, agregar override en `shop-area.vue`:

```css
input, select { font-size: 16px !important; }
```

- [ ] **Step 3: Verificar sin overflow horizontal**

En cada ruta, con DevTools abierto, ejecutar en consola:
```js
document.querySelectorAll('*').forEach(el => {
  if (el.scrollWidth > document.documentElement.clientWidth) {
    console.log('OVERFLOW:', el);
  }
});
```

Si hay overflow, identificar el elemento y agregar `overflow-x: hidden` o `max-width: 100%`.

- [ ] **Step 4: Commit final**

```bash
git add -A
git commit -m "feat: complete HAULED frontend redesign — dark brand, design tokens, mobile-first"
```

---

## Verificación Final

Con `nuxt dev` activo en puerto 3001:

1. **/** — Hero oscuro full-viewport + lines dark + featured cards sobre gris + encargo CTA navy + footer negro
2. **/shop** — Grid branded, sidebar styled, cards con sombra
3. **/product-details/gasp-001** — Título Raleway, precio grande, CTA azul
4. **Mobile 375px** — Sin overflow, CTAs accesibles, sticky bottom CTA en product detail
