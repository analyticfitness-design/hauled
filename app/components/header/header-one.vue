<template>
  <header>
    <div class="tp-header-area p-relative z-index-11">

      <!-- Top bar: tagline + WhatsApp -->
      <div class="hauled-header-topbar d-none d-md-block">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-md-6">
              <span class="hauled-topbar-text">
                ✈️ Direct from the States · Envío a todo Colombia
              </span>
            </div>
            <div class="col-md-6 text-end">
              <a href="https://wa.me/573000000000" target="_blank" class="hauled-topbar-wa">
                💬 WhatsApp
              </a>
              <span class="hauled-topbar-sep">|</span>
              <nuxt-link href="/login" class="hauled-topbar-link">Mi cuenta</nuxt-link>
              <span class="hauled-topbar-sep">|</span>
              <nuxt-link href="/order" class="hauled-topbar-link">Mis pedidos</nuxt-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Header principal -->
      <div class="tp-header-main tp-header-sticky hauled-header-main">
        <div class="container">
          <div class="row align-items-center">

            <!-- Logo HAULED (texto, no imagen) -->
            <div class="col-xl-2 col-lg-2 col-md-4 col-6">
              <nuxt-link href="/" class="hauled-logo">HAULED</nuxt-link>
            </div>

            <!-- Búsqueda -->
            <div class="col-xl-6 col-lg-7 d-none d-lg-block">
              <header-component-search />
            </div>

            <!-- Iconos derecha -->
            <div class="col-xl-4 col-lg-3 col-md-8 col-6">
              <header-component-main-right />
            </div>

          </div>
        </div>
      </div>

      <!-- Menú de navegación -->
      <div class="tp-header-bottom tp-header-bottom-border d-none d-lg-block">
        <div class="container">
          <div class="tp-mega-menu-wrapper p-relative">
            <div class="row align-items-center">
              <div class="col-xl-3 col-lg-3">
                <header-component-top-categories />
              </div>
              <div class="col-xl-6 col-lg-6">
                <div class="main-menu menu-style-1">
                  <nav class="tp-main-menu-content">
                    <header-component-menus />
                  </nav>
                </div>
              </div>
              <div class="col-xl-3 col-lg-3">
                <div class="tp-header-contact d-flex align-items-center justify-content-end">
                  <div class="tp-header-contact-content">
                    <h5 style="color:#4cc9f0;font-size:0.7rem;letter-spacing:2px">WHATSAPP</h5>
                    <p><a href="https://wa.me/573000000000" target="_blank">+57 300 000 0000</a></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Header sticky -->
    <div id="header-sticky-2" :class="`tp-header-sticky-area ${isSticky ? 'header-sticky-2' : ''}`">
      <div class="container">
        <div class="tp-mega-menu-wrapper p-relative">
          <div class="row align-items-center">
            <div class="col-xl-3 col-lg-3 col-md-3 col-6">
              <nuxt-link href="/" class="hauled-logo hauled-logo-sm">HAULED</nuxt-link>
            </div>
            <div class="col-xl-6 col-lg-6 col-md-6 d-none d-lg-block">
              <div class="tp-header-sticky-menu main-menu menu-style-1">
                <nav id="mobile-menu">
                  <header-component-menus />
                </nav>
              </div>
            </div>
            <div class="col-xl-3 col-lg-3 col-md-3 col-6">
              <div class="tp-header-action d-flex align-items-center justify-content-end ml-50">
                <div class="tp-header-action-item d-none d-lg-block">
                  <nuxt-link href="/wishlist" class="tp-header-action-btn">
                    <svg-wishlist />
                    <span class="tp-header-action-badge">{{ wishlistStore.wishlists.length }}</span>
                  </nuxt-link>
                </div>
                <div class="tp-header-action-item">
                  <button @click="cartStore.handleCartOffcanvas" type="button" class="tp-header-action-btn cartmini-open-btn">
                    <svg-cart-bag />
                    <span class="tp-header-action-badge">{{ cartStore.totalPriceQuantity.quantity }}</span>
                  </button>
                </div>
                <div class="tp-header-action-item d-lg-none">
                  <button @click="utilsStore.handleOpenMobileMenu()" type="button" class="tp-header-action-btn tp-offcanvas-open-btn">
                    <svg-menu-icon />
                  </button>
                </div>
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
.hauled-header-topbar {
  background: #111;
  padding: 8px 0;
}
.hauled-topbar-text {
  font-size: 0.78rem;
  color: #aaa;
  letter-spacing: 0.5px;
}
.hauled-topbar-wa {
  font-size: 0.78rem;
  color: #25D366;
  font-weight: 700;
  text-decoration: none;
}
.hauled-topbar-link {
  font-size: 0.78rem;
  color: #aaa;
  text-decoration: none;
}
.hauled-topbar-link:hover { color: #4cc9f0; }
.hauled-topbar-sep { color: #333; margin: 0 8px; font-size: 0.75rem; }
.hauled-header-main {
  border-bottom: 2px solid #4cc9f0;
}
.hauled-logo {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.8rem;
  letter-spacing: 6px;
  color: #111 !important;
  text-decoration: none;
  display: inline-block;
}
.hauled-logo-sm {
  font-size: 1.4rem;
  letter-spacing: 4px;
}
.hauled-logo:hover { color: #4cc9f0 !important; }
</style>
