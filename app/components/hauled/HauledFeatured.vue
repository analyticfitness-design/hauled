<template>
  <section class="hf-section">
    <div class="container">
      <div class="hf-header">
        <div>
          <p class="hf-eyebrow">Colección</p>
          <h2 class="hf-title">Lo más nuevo</h2>
        </div>
        <nuxt-link to="/shop" class="hf-see-all">Ver todo <span class="hf-see-arrow">→</span></nuxt-link>
      </div>

      <div class="hf-grid">
        <div
          v-for="(product, i) in featuredProducts"
          :key="product.id"
          class="hf-item"
          :style="`animation-delay: ${i * 55}ms`"
        >
          <nuxt-link :to="`/product-details/${product.id}`" class="hf-img-wrap">
            <img
              :src="product.img || '/img/placeholder.jpg'"
              :alt="product.title"
              class="hf-img"
              loading="lazy"
            />
            <span v-if="product.hauledLine" class="hf-badge" :class="`hf-badge--${product.hauledLine}`">
              {{ lineBadgeText(product.hauledLine) }}
            </span>
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

/* ── Header ───────────────────────────────────────── */
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
  font-size: var(--h-fs-small, 0.85rem);
  font-weight: 600;
  color: var(--h-black, #111);
  text-decoration: none;
  border-bottom: 1px solid currentColor;
  padding-bottom: 2px;
  white-space: nowrap;
  transition: color var(--h-dur-fast, 180ms);
}
.hf-see-all:hover { color: var(--h-blue, #4CC9F0); }
.hf-see-arrow { display: inline-block; transition: transform var(--h-dur-fast, 180ms); }
.hf-see-all:hover .hf-see-arrow { transform: translateX(4px); }

/* ── Grid ─────────────────────────────────────────── */
.hf-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--h-gap-grid, 20px);
}
@media (max-width: 991px) { .hf-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 375px)  { .hf-grid { gap: 10px; } }

/* ── Card ─────────────────────────────────────────── */
.hf-item { display: flex; flex-direction: column; }

.hf-img-wrap {
  position: relative;
  display: block;
  background: #e4e4e4;
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
  font-size: 0.58rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 3px;
  z-index: 1;
}
.hf-badge--originals { background: var(--h-navy, #0d2233); color: var(--h-blue, #4CC9F0); }
.hf-badge--basics    { background: rgba(0,0,0,0.65); color: #fff; }
.hf-badge--encargo   { background: var(--h-black, #111); color: #fff; }

/* Overlay */
.hf-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17,17,17,0.5);
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
  font-size: 0.76rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  background: var(--h-blue, #4CC9F0);
  color: #111;
  padding: 10px 22px;
  border-radius: 3px;
}

/* Info */
.hf-info { flex: 1; }
.hf-name {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.88rem);
  font-weight: 500;
  color: #333;
  margin-bottom: 5px;
  line-height: 1.35;
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
  color: var(--h-muted-dark, rgba(0,0,0,0.4));
}
.hf-price-encargo {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--h-blue, #4CC9F0);
}
</style>
