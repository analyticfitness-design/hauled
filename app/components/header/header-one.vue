<template>
  <header>
    <div class="h-wrap">

      <!-- ═══ TOPBAR MARQUEE ══════════════════════════ -->
      <div class="h-topbar">
        <div class="h-marquee">
          <div class="h-marquee-track">
            <span v-for="n in 6" :key="n" class="h-marquee-group">
              <span class="h-marquee-item">✦ Direct from the States</span>
              <span class="h-marquee-item">✦ Autenticidad garantizada</span>
              <span class="h-marquee-item">✦ Envío gratis en Bucaramanga</span>
              <span class="h-marquee-item">✦ Atención 24/7</span>
              <span class="h-marquee-item">✦ Pago seguro con Wompi</span>
            </span>
          </div>
        </div>
        <div class="h-topbar-right">
          <a :href="`https://wa.me/${whatsappNumber}`" target="_blank" class="h-topbar-wa">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp
          </a>
          <span class="h-topbar-div">|</span>
          <nuxt-link to="/login" class="h-topbar-link">Mi cuenta</nuxt-link>
          <span class="h-topbar-div">|</span>
          <nuxt-link to="/order" class="h-topbar-link">Pedidos</nuxt-link>
        </div>
      </div>

      <!-- ═══ HEADER PRINCIPAL ════════════════════════ -->
      <div :class="`h-main ${isSticky ? 'h-main--sticky' : ''}`">
        <div class="container">
          <div class="h-main-inner">

            <!-- Logo -->
            <nuxt-link to="/" class="h-logo">
              <span class="h-logo-word">HAULED</span>
              <span class="h-logo-sub">Direct from the States</span>
            </nuxt-link>

            <!-- Nav desktop -->
            <nav class="h-nav-desktop">
              <ul class="h-menu">
                <li class="h-menu-item">
                  <nuxt-link to="/" class="h-menu-link">Inicio</nuxt-link>
                </li>

                <!-- GASP mega dropdown -->
                <li class="h-menu-item h-menu-item--mega">
                  <a class="h-menu-link h-menu-link--has-drop">
                    GASP
                    <svg class="h-menu-caret" width="10" height="10" viewBox="0 0 10 6" fill="none">
                      <path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </a>
                  <div class="h-mega">
                    <div class="h-mega-inner">
                      <div class="h-mega-col">
                        <p class="h-mega-heading">Categorías</p>
                        <ul class="h-mega-list">
                          <li><nuxt-link to="/shop?category=camisetas" class="h-mega-link">Camisetas &amp; Tanks</nuxt-link></li>
                          <li><nuxt-link to="/shop?category=pantalonetas" class="h-mega-link">Pantalonetas</nuxt-link></li>
                          <li><nuxt-link to="/shop?category=pantalones" class="h-mega-link">Pantalones</nuxt-link></li>
                          <li><nuxt-link to="/shop?category=accesorios" class="h-mega-link">Accesorios</nuxt-link></li>
                          <li><nuxt-link to="/shop?category=zapatos" class="h-mega-link">Zapatos</nuxt-link></li>
                        </ul>
                      </div>
                      <div class="h-mega-col">
                        <p class="h-mega-heading">Colecciones</p>
                        <ul class="h-mega-list">
                          <li><nuxt-link to="/shop?hauledLine=originals" class="h-mega-link">Originals USA</nuxt-link></li>
                          <li><nuxt-link to="/shop?status=New" class="h-mega-link">Nuevos ingresos</nuxt-link></li>
                          <li><nuxt-link to="/shop?featured=true" class="h-mega-link">Más vendidos</nuxt-link></li>
                          <li><nuxt-link to="/shop?hauledLine=basics" class="h-mega-link">HAULED Basics</nuxt-link></li>
                        </ul>
                      </div>
                      <div class="h-mega-promo">
                        <img :src="megaImg" alt="GASP Collection" class="h-mega-img" />
                        <div class="h-mega-promo-text">
                          <span class="h-mega-promo-label">Encargos</span>
                          <p class="h-mega-promo-sub">¿No está tu talla?<br>Lo traemos de USA</p>
                          <nuxt-link to="/encargos" class="h-mega-promo-cta">Hacer encargo →</nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li class="h-menu-item">
                  <nuxt-link to="/shop" class="h-menu-link">Catálogo</nuxt-link>
                </li>
                <li class="h-menu-item">
                  <nuxt-link to="/encargos" class="h-menu-link h-menu-link--accent">Encargos</nuxt-link>
                </li>
                <li class="h-menu-item">
                  <nuxt-link to="/contact" class="h-menu-link">Contacto</nuxt-link>
                </li>
              </ul>
            </nav>

            <!-- Búsqueda + Acciones -->
            <div class="h-actions-group">
              <!-- Search inline -->
              <div class="h-search-wrap d-none d-xl-flex" ref="searchWrapRef">
                <button class="h-search-toggle" @click="searchOpen = !searchOpen" type="button" aria-label="Buscar">
                  <svg-search />
                </button>
                <Transition name="searchExpand">
                  <div v-if="searchOpen" class="h-search-box">
                    <input
                      ref="searchInputRef"
                      v-model="searchQuery"
                      type="text"
                      placeholder="Buscar GASP..."
                      @keydown.enter="doSearch"
                      @keydown.esc="searchOpen = false"
                    />
                    <button type="button" @click="doSearch" class="h-search-go">→</button>
                  </div>
                </Transition>
              </div>

              <!-- Wishlist -->
              <nuxt-link to="/wishlist" class="h-icon-btn d-none d-lg-inline-flex" aria-label="Lista de deseos">
                <svg-wishlist />
                <span v-if="wishlistStore.wishlists.length" class="h-badge">{{ wishlistStore.wishlists.length }}</span>
              </nuxt-link>

              <!-- Cart -->
              <button @click="cartStore.handleCartOffcanvas" type="button" class="h-icon-btn h-cart-btn" aria-label="Carrito">
                <svg-cart-bag />
                <span v-if="cartStore.totalPriceQuantity.quantity" class="h-badge h-badge--cart">
                  {{ cartStore.totalPriceQuantity.quantity }}
                </span>
              </button>

              <!-- Hamburger mobile -->
              <button @click="utilsStore.handleOpenMobileMenu()" type="button" class="h-icon-btn h-hamburger d-lg-none" aria-label="Menú">
                <svg-menu-icon />
              </button>
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

const config = useRuntimeConfig();
const whatsappNumber = config.public.whatsappNumber as string;

const { isSticky } = useSticky();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilsStore = useUtilityStore();

const megaImg = '/img/hero/gasp-zz-4.jpg';

// Search
const searchOpen = ref(false);
const searchQuery = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);
const searchWrapRef = ref<HTMLElement | null>(null);
const router = useRouter();

watch(searchOpen, (v) => {
  if (v) nextTick(() => searchInputRef.value?.focus());
});

const doSearch = () => {
  if (!searchQuery.value.trim()) return;
  router.push(`/search?searchText=${encodeURIComponent(searchQuery.value)}`);
  searchOpen.value = false;
  searchQuery.value = '';
};

const closeSearch = () => { searchOpen.value = false; };
const searchCloseRef = useClickOutside(closeSearch);
</script>

<style scoped>
/* ════════════════════════════════════════════════════
   TOPBAR
════════════════════════════════════════════════════ */
.h-topbar {
  background: #000;
  height: 36px;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
}

/* Marquee */
.h-marquee {
  flex: 1;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%);
}
.h-marquee-track {
  display: flex;
  width: max-content;
  animation: marqueeScroll 30s linear infinite;
}
.h-marquee-track:hover { animation-play-state: paused; }
.h-marquee-group {
  display: flex;
  align-items: center;
  gap: 0;
  padding-right: 0;
}
.h-marquee-item {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.68rem;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.4);
  text-transform: uppercase;
  padding: 0 28px;
  white-space: nowrap;
}
@keyframes marqueeScroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

/* Topbar right */
.h-topbar-right {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0 16px;
  flex-shrink: 0;
}
@media (max-width: 768px) { .h-topbar-right { display: none; } }
.h-topbar-wa {
  display: flex;
  align-items: center;
  gap: 5px;
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  color: #25D366;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.5px;
  transition: opacity 180ms;
}
.h-topbar-wa:hover { opacity: 0.8; }
.h-topbar-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  color: rgba(255,255,255,0.38);
  text-decoration: none;
  letter-spacing: 0.3px;
  transition: color 180ms;
}
.h-topbar-link:hover { color: var(--h-blue, #4CC9F0); }
.h-topbar-div { color: rgba(255,255,255,0.1); margin: 0 10px; font-size: 0.6rem; }

/* ════════════════════════════════════════════════════
   HEADER PRINCIPAL
════════════════════════════════════════════════════ */
.h-main {
  background: var(--h-black, #111);
  border-bottom: 1px solid rgba(76,201,240,0.12);
  position: sticky;
  top: 0;
  z-index: 999;
  transition: background 320ms ease, backdrop-filter 320ms ease, box-shadow 320ms ease;
}
.h-main--sticky {
  background: rgba(12,12,12,0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  box-shadow: 0 1px 0 rgba(76,201,240,0.15), 0 8px 32px rgba(0,0,0,0.5);
}

.h-main-inner {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  height: 68px;
}
@media (max-width: 991px) {
  .h-main-inner { grid-template-columns: 1fr auto; }
  .h-nav-desktop { display: none !important; }
}

/* ════════════════════════════════════════════════════
   LOGO
════════════════════════════════════════════════════ */
.h-logo {
  display: inline-flex;
  flex-direction: column;
  line-height: 1;
  text-decoration: none;
  gap: 3px;
  flex-shrink: 0;
}
.h-logo-word {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(1.2rem, 3vw, 1.75rem);
  letter-spacing: 10px;
  color: #fff;
  text-transform: uppercase;
  transition: color 180ms;
}
.h-logo-sub {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.42rem;
  letter-spacing: 6px;
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
}
.h-logo:hover .h-logo-word { color: var(--h-blue, #4CC9F0); }

/* ════════════════════════════════════════════════════
   NAV DESKTOP
════════════════════════════════════════════════════ */
.h-nav-desktop {
  display: flex;
  justify-content: center;
}
.h-menu {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0;
}
.h-menu-item {
  position: relative;
}

/* Link base */
.h-menu-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.7);
  text-decoration: none;
  position: relative;
  cursor: pointer;
  transition: color 180ms;
}
.h-menu-link::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 16px;
  right: 16px;
  height: 2px;
  background: var(--h-blue, #4CC9F0);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 280ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.h-menu-item:hover > .h-menu-link,
.h-menu-link.router-link-active {
  color: #fff;
}
.h-menu-item:hover > .h-menu-link::after,
.h-menu-link.router-link-active::after {
  transform: scaleX(1);
}

/* Accent link (Encargos) */
.h-menu-link--accent {
  color: var(--h-blue, #4CC9F0) !important;
}
.h-menu-link--accent::after {
  background: var(--h-blue, #4CC9F0);
}

/* Caret */
.h-menu-caret {
  transition: transform 220ms ease;
  opacity: 0.5;
}
.h-menu-item:hover .h-menu-caret { transform: rotate(180deg); opacity: 1; }

/* ════════════════════════════════════════════════════
   MEGA MENU
════════════════════════════════════════════════════ */
.h-mega {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(8px);
  min-width: 580px;
  padding-top: 14px; /* Puente invisible que evita perder el hover al bajar el mouse */
  opacity: 0;
  pointer-events: none;
  transition: opacity 220ms ease, transform 220ms ease;
  z-index: 100;
}
.h-menu-item--mega:hover .h-mega,
.h-menu-item--mega:focus-within .h-mega {
  opacity: 1;
  pointer-events: auto;
  transform: translateX(-50%) translateY(0);
}

.h-mega-inner {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 0;
  background: #141414;
  border: 1px solid rgba(76,201,240,0.15);
  border-radius: 10px;
  box-shadow: 0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03);
  overflow: hidden;
}
.h-mega-col {
  padding: 28px 24px;
  border-right: 1px solid rgba(255,255,255,0.05);
}
.h-mega-heading {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.65rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
  margin-bottom: 16px;
}
.h-mega-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.h-mega-link {
  display: block;
  padding: 7px 0;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.65);
  text-decoration: none;
  transition: color 160ms, padding-left 160ms;
}
.h-mega-link:hover { color: #fff; padding-left: 6px; }

/* Promo card */
.h-mega-promo {
  width: 180px;
  position: relative;
  overflow: hidden;
}
.h-mega-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  display: block;
  transition: transform 0.4s ease;
}
.h-mega-promo:hover .h-mega-img { transform: scale(1.06); }
.h-mega-promo-text {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 50%, rgba(0,0,0,0.2) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px 16px;
  gap: 4px;
}
.h-mega-promo-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.62rem;
  font-weight: 300;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
}
.h-mega-promo-sub {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  color: #fff;
  line-height: 1.3;
  margin: 0;
}
.h-mega-promo-cta {
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
  text-decoration: none;
  margin-top: 6px;
  transition: letter-spacing 200ms;
}
.h-mega-promo-cta:hover { letter-spacing: 2.5px; }

/* ════════════════════════════════════════════════════
   ACTIONS GROUP
════════════════════════════════════════════════════ */
.h-actions-group {
  display: flex;
  align-items: center;
  gap: 2px;
  justify-content: flex-end;
}

/* Icon buttons */
.h-icon-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: rgba(255,255,255,0.75);
  border-radius: 8px;
  text-decoration: none;
  transition: background 180ms, color 180ms;
}
.h-icon-btn:hover {
  background: rgba(76,201,240,0.08);
  color: var(--h-blue, #4CC9F0);
}

/* Cart pill */
.h-cart-btn {
  background: rgba(76,201,240,0.06);
  border: 1px solid rgba(76,201,240,0.2);
}
.h-cart-btn:hover { background: rgba(76,201,240,0.14); border-color: var(--h-blue, #4CC9F0); }

/* Badge */
.h-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  min-width: 15px;
  height: 15px;
  background: var(--h-blue, #4CC9F0);
  color: #111;
  font-size: 0.55rem;
  font-weight: 700;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  line-height: 1;
}

/* ════════════════════════════════════════════════════
   SEARCH EXPAND
════════════════════════════════════════════════════ */
.h-search-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}
.h-search-toggle {
  @extend .h-icon-btn;
  background: transparent;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  color: rgba(255,255,255,0.7);
  border-radius: 8px;
  transition: color 180ms, background 180ms;
}
.h-search-toggle:hover { color: var(--h-blue, #4CC9F0); background: rgba(76,201,240,0.08); }
.h-search-box {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(76,201,240,0.25);
  border-radius: 6px;
  overflow: hidden;
}
.h-search-box input {
  background: transparent;
  border: none;
  outline: none;
  padding: 8px 14px;
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #fff;
  width: 200px;
}
.h-search-box input::placeholder { color: rgba(255,255,255,0.3); }
.h-search-go {
  padding: 0 12px;
  height: 100%;
  background: rgba(76,201,240,0.1);
  border: none;
  color: var(--h-blue, #4CC9F0);
  font-size: 1rem;
  cursor: pointer;
  transition: background 180ms;
  align-self: stretch;
  display: flex;
  align-items: center;
}
.h-search-go:hover { background: rgba(76,201,240,0.2); }

/* Search transition */
.searchExpand-enter-active,
.searchExpand-leave-active { transition: opacity 200ms ease, transform 200ms ease; }
.searchExpand-enter-from,
.searchExpand-leave-to { opacity: 0; transform: scaleX(0.8); transform-origin: right; }
</style>
