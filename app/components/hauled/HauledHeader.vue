<script setup lang="ts">
// HauledHeader — chrome de la tienda: topbar (sello USA→CO) + barra principal
// (wordmark, nav con mega-menú GASP, buscar/wishlist/carrito con contador).
// Sticky con blur al scrollear. Tokens de _tokens.scss, cero hardcode.
import { ref, onMounted, onBeforeUnmount } from 'vue';

withDefaults(defineProps<{ cartCount?: number; wishCount?: number }>(), {
  cartCount: 0, wishCount: 0,
});
const emit = defineEmits<{ (e: 'open-cart'): void; (e: 'search'): void }>();

const stuck = ref(false);
const megaOpen = ref(false);
const onScroll = () => { stuck.value = window.scrollY > 8; };
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll));

const cats = ['Camisetas & Tanks', 'Pantalonetas', 'Pantalones', 'Accesorios', 'Zapatos'];
const cols = ['Originals USA', 'Nuevos ingresos', 'Más vendidos', 'HAULED Basics'];
</script>

<template>
  <header class="h-hdr" :class="{ 'is-stuck': stuck }">
    <!-- Topbar -->
    <div class="h-hdr__top">
      <span class="h-hdr__sello">HAULED · USA → CO</span>
      <span class="h-hdr__topnote">Envío a todo Colombia · Atención 24/7</span>
    </div>

    <!-- Barra principal -->
    <div class="h-hdr__main">
      <div class="h-hdr__inner">
        <a href="/" class="h-hdr__logo">
          <span class="h-hdr__word">HAULED</span>
          <span class="h-hdr__sub">Moda que Habla</span>
        </a>

        <nav class="h-hdr__nav" aria-label="Principal">
          <a class="h-hdr__link" href="/">Inicio</a>
          <div
            class="h-hdr__item"
            @mouseenter="megaOpen = true"
            @mouseleave="megaOpen = false"
          >
            <a class="h-hdr__link h-hdr__link--drop" href="/shop">
              GASP
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <div class="h-mega" :class="{ 'is-open': megaOpen }">
              <div class="h-mega__inner">
                <div class="h-mega__col">
                  <p class="h-mega__head">Categorías</p>
                  <a v-for="c in cats" :key="c" class="h-mega__link" href="/shop">{{ c }}</a>
                </div>
                <div class="h-mega__col">
                  <p class="h-mega__head">Colecciones</p>
                  <a v-for="c in cols" :key="c" class="h-mega__link" href="/shop">{{ c }}</a>
                </div>
                <a class="h-mega__promo" href="/encargos">
                  <span class="h-mega__sello">📦 Encargos</span>
                  <span class="h-mega__promotxt">¿No está tu talla?<br>Lo traemos de USA</span>
                  <span class="h-mega__cta">Hacer encargo →</span>
                </a>
              </div>
            </div>
          </div>
          <a class="h-hdr__link" href="/shop">Catálogo</a>
          <a class="h-hdr__link h-hdr__link--accent" href="/encargos">Encargos</a>
        </nav>

        <div class="h-hdr__actions">
          <button class="h-hdr__icon" aria-label="Buscar" @click="emit('search')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
          </button>
          <button class="h-hdr__icon" aria-label="Favoritos">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.5-1.5 3-3.3 3-5.5A3.5 3.5 0 0 0 12 6 3.5 3.5 0 0 0 2 8.5C2 10.7 3.5 12.5 5 14l7 7z"/></svg>
            <span v-if="wishCount" class="h-hdr__count">{{ wishCount }}</span>
          </button>
          <button class="h-hdr__icon h-hdr__cart" aria-label="Carrito" @click="emit('open-cart')">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            <span v-if="cartCount" class="h-hdr__count h-hdr__count--accent">{{ cartCount }}</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.h-hdr { position: sticky; top: 0; z-index: 50; }

.h-hdr__top {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; height: 34px; padding: 0 clamp(16px, 4vw, 48px);
  background: #000; color: rgba(255,255,255,.6);
}
.h-hdr__sello {
  font-family: var(--hauled-font-mono, "Space Mono", monospace);
  font-size: .68rem; letter-spacing: var(--hauled-track-caps, .14em);
  text-transform: uppercase; color: var(--hauled-accent, #4CC9F0);
}
.h-hdr__topnote {
  font-family: var(--hauled-font-body, "Inter"); font-size: .68rem;
  letter-spacing: .04em; color: rgba(255,255,255,.42);
}
@media (max-width: 640px) { .h-hdr__topnote { display: none; } }

.h-hdr__main {
  background: var(--hauled-surface, #101010);
  border-bottom: 1px solid rgba(255,255,255,.08);
  transition: background var(--hauled-dur-med, 320ms) var(--hauled-ease);
}
.is-stuck .h-hdr__main {
  background: rgba(16,16,16,.86);
  backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
}
.h-hdr__inner {
  display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 24px;
  height: 66px; max-width: 1320px; margin: 0 auto; padding: 0 clamp(16px, 4vw, 48px);
}

.h-hdr__logo { display: inline-flex; flex-direction: column; line-height: 1; gap: 3px; }
.h-hdr__word {
  font-family: var(--hauled-font-display, "Raleway", sans-serif); font-weight: 800;
  font-size: 1.4rem; letter-spacing: .16em; text-transform: uppercase; color: #fff;
  transition: color var(--hauled-dur-fast, 200ms);
}
.h-hdr__logo:hover .h-hdr__word { color: var(--hauled-accent, #4CC9F0); }
.h-hdr__sub {
  font-family: var(--hauled-font-mono, "Space Mono", monospace); font-weight: 400;
  font-size: .44rem; letter-spacing: .34em; text-transform: uppercase; color: var(--hauled-accent, #4CC9F0);
}

.h-hdr__nav { display: flex; justify-content: center; align-items: center; gap: 4px; }
@media (max-width: 860px) { .h-hdr__nav { display: none; } }
.h-hdr__link {
  display: inline-flex; align-items: center; gap: 6px; padding: 8px 16px;
  font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; font-size: .78rem;
  letter-spacing: .08em; text-transform: uppercase; color: rgba(255,255,255,.72);
  position: relative; cursor: pointer; transition: color var(--hauled-dur-fast, 200ms);
}
.h-hdr__link::after {
  content: ''; position: absolute; left: 16px; right: 16px; bottom: 4px; height: 2px;
  background: var(--hauled-accent, #4CC9F0); transform: scaleX(0); transform-origin: left;
  transition: transform 260ms var(--hauled-ease);
}
.h-hdr__item:hover .h-hdr__link, .h-hdr__link:hover { color: #fff; }
.h-hdr__item:hover .h-hdr__link::after, .h-hdr__link:hover::after { transform: scaleX(1); }
.h-hdr__link--accent { color: var(--hauled-accent, #4CC9F0); }
.h-hdr__item { position: relative; }
.h-hdr__item:hover .h-hdr__link--drop svg { transform: rotate(180deg); }
.h-hdr__link--drop svg { transition: transform 220ms; opacity: .6; }

/* Mega-menú */
.h-mega {
  position: absolute; top: 100%; left: 50%; transform: translateX(-50%) translateY(8px);
  min-width: 580px; padding-top: 12px; opacity: 0; pointer-events: none;
  transition: opacity 200ms var(--hauled-ease), transform 200ms var(--hauled-ease);
}
.h-mega.is-open { opacity: 1; pointer-events: auto; transform: translateX(-50%) translateY(0); }
.h-mega__inner {
  display: grid; grid-template-columns: 1fr 1fr 200px; background: #141414;
  border: 1px solid rgba(76, 201, 240,.18); box-shadow: 0 24px 60px rgba(0,0,0,.7); overflow: hidden;
}
.h-mega__col { padding: 26px 24px; border-right: 1px solid rgba(255,255,255,.05); }
.h-mega__head {
  margin: 0 0 14px; font-family: var(--hauled-font-mono, "Space Mono"); font-size: .62rem;
  letter-spacing: .16em; text-transform: uppercase; color: var(--hauled-accent, #4CC9F0);
}
.h-mega__link {
  display: block; padding: 7px 0; font-family: var(--hauled-font-body, "Inter"); font-size: .86rem;
  color: rgba(255,255,255,.66); transition: color 150ms, padding-left 150ms;
}
.h-mega__link:hover { color: #fff; padding-left: 6px; }
.h-mega__promo {
  display: flex; flex-direction: column; justify-content: flex-end; gap: 6px; padding: 22px 18px;
  background: linear-gradient(180deg, #1a1a1a, #0d0d0d);
}
.h-mega__sello {
  font-family: var(--hauled-font-mono, "Space Mono"); font-size: .62rem; letter-spacing: .14em;
  text-transform: uppercase; color: var(--hauled-accent, #4CC9F0);
}
.h-mega__promotxt { font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; font-size: .9rem; color: #fff; line-height: 1.3; }
.h-mega__cta { font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; font-size: .7rem; letter-spacing: .08em; text-transform: uppercase; color: var(--hauled-accent, #4CC9F0); margin-top: 4px; }

.h-hdr__actions { display: flex; align-items: center; gap: 2px; justify-content: flex-end; }
.h-hdr__icon {
  position: relative; width: 44px; height: 44px; display: grid; place-items: center;
  border: 0; background: transparent; color: rgba(255,255,255,.8); cursor: pointer; border-radius: 4px;
  transition: background var(--hauled-dur-fast, 200ms), color var(--hauled-dur-fast, 200ms);
}
.h-hdr__icon:hover { background: rgba(76, 201, 240,.10); color: var(--hauled-accent, #4CC9F0); }
.h-hdr__cart { background: rgba(76, 201, 240,.08); border: 1px solid rgba(76, 201, 240,.22); }
.h-hdr__count {
  position: absolute; top: 4px; right: 4px; min-width: 16px; height: 16px; padding: 0 3px;
  display: grid; place-items: center; border-radius: 8px; font-family: var(--hauled-font-title, "Raleway");
  font-size: .56rem; font-weight: 700; background: #fff; color: #111;
}
.h-hdr__count--accent { background: var(--hauled-accent, #4CC9F0); color: #111; }
</style>
