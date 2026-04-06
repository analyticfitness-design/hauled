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
                <span class="h-logo-sub">Direct from the States</span>
              </nuxt-link>
            </div>

            <!-- Búsqueda desktop -->
            <div class="col-xl-6 col-lg-7 d-none d-lg-block">
              <header-component-search />
            </div>

            <!-- Iconos derecha -->
            <div class="col-xl-4 col-lg-3 col-md-8 col-6">
              <div class="h-actions d-flex align-items-center justify-content-end">
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

      <!-- Nav desktop -->
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
  color: rgba(255,255,255,0.45);
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
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: color var(--h-dur-fast, 180ms);
}
.h-topbar-link:hover { color: var(--h-blue, #4CC9F0); }
.h-topbar-sep { color: rgba(255,255,255,0.1); margin: 0 8px; font-size: 0.7rem; }

/* ── Header principal ────────────────────────────── */
.h-main {
  background: var(--h-black, #111);
  padding: 14px 0;
  border-bottom: 1px solid rgba(76,201,240,0.2);
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
  font-size: 0.46rem;
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  display: none;
}
.h-logo:hover .h-logo-word { color: var(--h-blue, #4CC9F0); }
@media (min-width: 576px) { .h-logo-sub { display: block; } }

/* ── Actions ─────────────────────────────────────── */
.h-actions { gap: 4px; }
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
  text-decoration: none;
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
  font-size: 0.58rem;
  font-weight: 700;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  line-height: 1;
}

/* ── Nav ─────────────────────────────────────────── */
.h-nav {
  background: var(--h-black, #111);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.h-nav-wa a {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.4);
  text-decoration: none;
  transition: color var(--h-dur-fast, 180ms);
}
.h-nav-wa a:hover { color: var(--h-blue, #4CC9F0); }

/* ── Override nav menu links en dark ─────────────── */
:deep(.tp-main-menu-content > ul > li > a) {
  color: rgba(255,255,255,0.75) !important;
}
:deep(.tp-main-menu-content > ul > li:hover > a),
:deep(.tp-main-menu-content > ul > li.active > a) {
  color: var(--h-blue, #4CC9F0) !important;
}

/* ── Categories dropdown en dark ─────────────────── */
:deep(.tp-category-menu-title) {
  color: rgba(255,255,255,0.8) !important;
}
:deep(.tp-category-menu-wrap) {
  background: var(--h-black, #111) !important;
  border-color: rgba(255,255,255,0.08) !important;
}
</style>
