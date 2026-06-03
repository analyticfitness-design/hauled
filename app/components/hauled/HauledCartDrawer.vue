<script setup lang="ts">
// HauledCartDrawer — drawer lateral del carrito. Slide-in (M05) + scrim.
// Subtotal en COP, badges de encargo, ruta vacía, CTA "PAGAR".
import { computed } from 'vue';

interface CartItem {
  id: string | number; title: string; img: string;
  priceCop?: number; qty: number; size?: string; line?: 'stock' | 'encargo';
}

const props = withDefaults(defineProps<{ open: boolean; items: CartItem[] }>(), {
  open: false, items: () => [],
});
const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'remove', id: CartItem['id']): void;
  (e: 'checkout'): void;
}>();

const fmtCop = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n);

const subtotal = computed(() =>
  props.items.filter(i => i.line !== 'encargo').reduce((s, i) => s + (i.priceCop ?? 0) * i.qty, 0));
</script>

<template>
  <div class="h-cart__scrim" :class="{ 'is-open': open }" @click="emit('close')" />
  <aside class="h-cart" :class="{ 'is-open': open }" role="dialog" aria-label="Tu carrito" aria-modal="true">
    <header class="h-cart__head">
      <span class="h-cart__title">
        Tu carrito <span class="h-cart__n">{{ items.length }}</span>
      </span>
      <button class="h-cart__x" aria-label="Cerrar" @click="emit('close')">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
      </button>
    </header>

    <div class="h-cart__body">
      <div v-if="!items.length" class="h-cart__empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <p>Tu carrito está vacío.</p>
        <a class="h-cart__link" href="/shop">Mira lo nuevo →</a>
      </div>

      <article v-for="it in items" :key="it.id" class="h-cart__item">
        <img class="h-cart__img" :src="it.img" :alt="it.title" />
        <div class="h-cart__meta">
          <p class="h-cart__name">{{ it.title }}</p>
          <p class="h-cart__line">
            {{ it.line === 'encargo' ? 'Encargo · cotizar' : `Talla ${it.size} · x${it.qty}` }}
          </p>
          <p class="h-cart__price">{{ it.line === 'encargo' ? 'Cotizar →' : fmtCop((it.priceCop ?? 0) * it.qty) }}</p>
        </div>
        <button class="h-cart__rm" aria-label="Quitar" @click="emit('remove', it.id)">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </article>
    </div>

    <footer v-if="items.length" class="h-cart__foot">
      <div class="h-cart__sub">
        <span>Subtotal</span>
        <span class="h-cart__subv">{{ fmtCop(subtotal) }}</span>
      </div>
      <p class="h-cart__note">Ves el costo de envío y encargo antes de pagar.</p>
      <button class="h-cart__btn" @click="emit('checkout')">IR A PAGAR</button>
      <button class="h-cart__cont" @click="emit('close')">Seguir comprando</button>
    </footer>
  </aside>
</template>

<style scoped>
.h-cart__scrim {
  position: fixed; inset: 0; background: rgba(10,10,10,.55); z-index: 90;
  opacity: 0; pointer-events: none; transition: opacity var(--hauled-dur-med, 320ms) var(--hauled-ease);
}
.h-cart__scrim.is-open { opacity: 1; pointer-events: auto; }

.h-cart {
  position: fixed; top: 0; right: 0; height: 100%; width: min(400px, 92vw); z-index: 91;
  background: #fff; display: flex; flex-direction: column;
  transform: translateX(100%); transition: transform var(--hauled-dur-med, 320ms) var(--hauled-ease);
  box-shadow: -16px 0 48px rgba(0,0,0,.30);
}
.h-cart.is-open { transform: translateX(0); }

.h-cart__head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 18px 22px; background: var(--hauled-ink, #0A0A0A); color: #fff;
}
.h-cart__title {
  display: inline-flex; align-items: center; gap: 10px;
  font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; font-size: .92rem;
  letter-spacing: .1em; text-transform: uppercase;
}
.h-cart__n {
  min-width: 20px; height: 20px; padding: 0 5px; display: grid; place-items: center; border-radius: 10px;
  background: var(--hauled-accent, #4CC9F0); color: #111; font-size: .64rem;
}
.h-cart__x { width: 40px; height: 40px; display: grid; place-items: center; border: 0; background: transparent; color: rgba(255,255,255,.8); cursor: pointer; }
.h-cart__x:hover { color: var(--hauled-accent, #4CC9F0); }

.h-cart__body { flex: 1; overflow-y: auto; padding: 12px 22px; }
.h-cart__empty {
  height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; color: #bdbdbd; text-align: center;
}
.h-cart__empty p { margin: 0; font-size: .9rem; color: var(--hauled-g-600, #555); }
.h-cart__link { font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; font-size: .78rem; text-transform: uppercase; letter-spacing: .06em; color: var(--hauled-accent, #4CC9F0); }

.h-cart__item { display: flex; gap: 14px; padding: 14px 0; border-bottom: 1px solid var(--hauled-line, #E6E6E6); }
.h-cart__img { width: 66px; height: 84px; object-fit: cover; background: #000; flex-shrink: 0; }
.h-cart__meta { flex: 1; min-width: 0; }
.h-cart__name { margin: 0 0 4px; font-size: .84rem; font-weight: 500; color: #111; }
.h-cart__line { margin: 0 0 6px; font-size: .7rem; color: var(--hauled-g-500, #8A8A8A); }
.h-cart__price { margin: 0; font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; font-size: .86rem; color: #0A0A0A; }
.h-cart__rm { width: 30px; height: 30px; display: grid; place-items: center; border: 0; background: transparent; color: #bbb; cursor: pointer; align-self: flex-start; }
.h-cart__rm:hover { color: #111; }

.h-cart__foot { padding: 18px 22px; border-top: 1px solid var(--hauled-line, #E6E6E6); }
.h-cart__sub {
  display: flex; align-items: baseline; justify-content: space-between;
  font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: #0A0A0A;
}
.h-cart__subv { font-size: 1.15rem; }
.h-cart__note { margin: 6px 0 12px; font-size: .72rem; color: var(--hauled-g-500, #8A8A8A); }
.h-cart__btn {
  width: 100%; min-height: 52px; border: 0; cursor: pointer;
  font-family: var(--hauled-font-title, "Raleway"); font-weight: 700; font-size: .85rem;
  letter-spacing: .08em; text-transform: uppercase; background: var(--hauled-accent, #4CC9F0); color: #111; border-radius: 4px;
  transition: background var(--hauled-dur-fast, 200ms), color var(--hauled-dur-fast, 200ms);
}
.h-cart__btn:hover { background: #0A0A0A; color: #fff; }
.h-cart__cont { width: 100%; margin-top: 8px; padding: 8px; border: 0; background: transparent; cursor: pointer; font-size: .78rem; color: var(--hauled-g-600, #555); }
.h-cart__cont:hover { color: #111; }
</style>
