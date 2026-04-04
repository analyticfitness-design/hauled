<template>
  <section class="hauled-featured">
    <div class="container">
      <div class="hauled-featured-header">
        <h2 class="hauled-featured-title">Lo más nuevo</h2>
        <nuxt-link to="/shop" class="hauled-featured-all">Ver todo →</nuxt-link>
      </div>

      <div class="hauled-featured-grid">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="hauled-featured-item"
        >
          <nuxt-link :to="`/product-details/${product.id}`" class="hauled-featured-img-wrap">
            <img
              :src="product.img || '/img/placeholder.jpg'"
              :alt="product.title"
              class="hauled-featured-img"
            />
            <span v-if="product.hauledLine" class="hauled-featured-badge" :class="`badge-${product.hauledLine}`">
              {{ lineBadgeText(product.hauledLine) }}
            </span>
          </nuxt-link>
          <div class="hauled-featured-info">
            <p class="hauled-featured-name">{{ product.title }}</p>
            <p class="hauled-featured-price">
              <template v-if="product.price > 0">
                {{ formatCOP(product.price) }}
              </template>
              <span v-else class="hauled-encargo-price">Cotizar →</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { product_data } from '@/data/product-data';

const featuredProducts = computed(() =>
  product_data.filter(p => p.status === 'New' || p.hauledLine).slice(0, 8)
);

const lineBadgeText = (line: string) => {
  if (line === 'originals') return '🇺🇸 USA';
  if (line === 'basics') return 'HAULED';
  return '📦 Encargo';
};

const formatCOP = (price: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);
</script>

<style scoped>
.hauled-featured {
  padding: 80px 0;
  background: #fafafa;
}
.hauled-featured-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 40px;
}
.hauled-featured-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.8rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #111;
}
.hauled-featured-all {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #4cc9f0;
  text-decoration: none;
  font-weight: 600;
}
.hauled-featured-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}
@media (max-width: 992px) { .hauled-featured-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 576px) { .hauled-featured-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; } }
.hauled-featured-img-wrap {
  position: relative;
  display: block;
  background: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 3/4;
  margin-bottom: 12px;
}
.hauled-featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.hauled-featured-item:hover .hauled-featured-img { transform: scale(1.04); }
.hauled-featured-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 3px;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.badge-originals { background: #0d2233; color: #4cc9f0; }
.badge-basics { background: #e8e8e8; color: #111; }
.badge-encargo { background: #111; color: #fff; }
.hauled-featured-name {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #333;
  margin-bottom: 4px;
}
.hauled-featured-price {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #111;
}
.hauled-encargo-price { color: #4cc9f0; }
</style>
