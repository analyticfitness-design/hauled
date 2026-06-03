<template>
  <div class="hk-scope">
    <!-- ── page header ──────────────────────────────────── -->
    <section class="hk-page-header">
      <img
        src="/img/hero/gasp-hero-2.jpg"
        alt=""
        class="hk-page-header-img"
      />
      <div class="hk-page-header-overlay" />
      <div class="hk-page-header-content">
        <p class="hk-eyebrow">
          <span class="hk-eyebrow-line" />
          HAULED · Originals USA
        </p>
        <h1 class="hk-page-title">Catálogo</h1>
        <nav class="hk-bc" aria-label="Ruta de navegación">
          <NuxtLink to="/">Inicio</NuxtLink>
          <span class="hk-bc-sep" aria-hidden="true">/</span>
          <span class="hk-bc-cur">Catálogo</span>
        </nav>
      </div>
    </section>

    <!-- ── shop body ────────────────────────────────────── -->
    <section class="hk-shop">
      <!-- chips + count -->
      <div class="hk-shop-bar">
        <div class="hk-chips" role="group" aria-label="Filtrar por categoría">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            :class="['hk-chip', { 'is-active': activeCategory === cat }]"
            :aria-pressed="activeCategory === cat"
            @click="setCategory(cat)"
          >
            {{ cat }}
          </button>
        </div>
        <span class="hk-shop-count" aria-live="polite">
          {{ visibleProducts.length }} producto{{ visibleProducts.length !== 1 ? 's' : '' }}
        </span>
      </div>

      <!-- skeleton while loading -->
      <div v-if="loading" class="hk-grid-4" aria-busy="true" aria-label="Cargando productos">
        <div
          v-for="n in 8"
          :key="`sk-${n}`"
          class="hk-prod-skeleton"
          aria-hidden="true"
        />
      </div>

      <!-- error state -->
      <div v-else-if="fetchError" class="hk-shop-error" role="alert">
        <p>No pudimos cargar el catálogo. Intenta de nuevo más tarde.</p>
      </div>

      <!-- empty state -->
      <div v-else-if="visibleProducts.length === 0" class="hk-shop-empty">
        <p>Sin productos en esta categoría por ahora.</p>
      </div>

      <!-- grid -->
      <div v-else class="hk-grid-4">
        <div
          v-for="(item, i) in visibleProducts"
          :key="item.id"
          class="hk-fade"
          :style="{ animationDelay: `${i * 45}ms` }"
        >
          <HauledProductCard :item="item" @quote="handleQuote" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useProductFilterStore } from '@/pinia/useProductFilterStore'
import { useProducts } from '@/composables/useProducts'
import type { IProduct } from '@/types/product-type'

const route = useRoute()
const router = useRouter()
const store = useProductFilterStore()

// ── SSR data fetch ───────────────────────────────────────────────────────────
// Build a stable serializable key so concurrent SSR requests stay isolated.
const queryKey = computed(() => JSON.stringify({ ...route.query }))

const {
  data: ssrProducts,
  pending,
  error: fetchError,
} = await useAsyncData<IProduct[]>(
  `shop-products-${queryKey.value}`,
  async () => {
    const { products: mapped, fetchProducts: run } = useProducts()
    await run({ per_page: '60' })
    return mapped.value
  },
  { watch: [queryKey] }
)

// Hydrate store on both server and client — same tree, no hydration mismatch.
watch(
  ssrProducts,
  (items) => {
    if (items && items.length > 0) store.setProducts(items)
  },
  { immediate: true }
)

const loading = pending

// ── Category chips ───────────────────────────────────────────────────────────
// Derive real categories from loaded products; keep "Todo" always first.
// Fallback to proto cats while products are loading.
const PROTO_CATS = ['Todo', 'Camisetas & Tanks', 'Pantalonetas', 'Pantalones', 'Accesorios']

const categories = computed<string[]>(() => {
  const items = store.filteredProducts ?? []
  if (items.length === 0) return PROTO_CATS
  const set = new Set<string>()
  for (const p of store.products) {
    const cat = p.parent || p.category?.name
    if (cat) set.add(cat)
  }
  return ['Todo', ...Array.from(set)]
})

// Sync active category with URL query ?categoria=…
const activeCategory = computed<string>(() => {
  const q = route.query.categoria as string | undefined
  if (!q) return 'Todo'
  // Match case-insensitive
  return categories.value.find(
    (c) => c.toLowerCase() === q.toLowerCase()
  ) ?? 'Todo'
})

function setCategory(cat: string) {
  if (cat === 'Todo') {
    router.push({ query: { ...route.query, categoria: undefined } })
  } else {
    router.push({ query: { ...route.query, categoria: cat } })
  }
}

// ── Filtered list for this view ───────────────────────────────────────────────
// We filter locally by the active chip — the store's filteredProducts already
// handles other query filters (hauledLine, price, etc.).
const visibleProducts = computed<IProduct[]>(() => {
  const base = store.filteredProducts ?? []
  if (activeCategory.value === 'Todo') return base
  return base.filter(
    (p) => (p.parent || p.category?.name) === activeCategory.value
  )
})

// ── Quote / encargo handler ───────────────────────────────────────────────────
const { link: waLink } = useWhatsApp()

function handleQuote(item: IProduct) {
  if (import.meta.client) {
    window.open(waLink('encargo_inquiry', { description: item.title }), '_blank', 'noopener,noreferrer')
  }
}
</script>

<style scoped>
/* skeleton */
.hk-prod-skeleton {
  aspect-ratio: 3 / 4;
  background: linear-gradient(90deg, #f0f0f0 0%, #e6e6e6 50%, #f0f0f0 100%);
  background-size: 200% 100%;
  animation: hk-skel 1.4s ease-in-out infinite;
  border-radius: var(--h-radius-md);
}
@keyframes hk-skel {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .hk-prod-skeleton { animation: none; background: #ebebeb; }
}

/* error / empty */
.hk-shop-error,
.hk-shop-empty {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px clamp(16px, 4vw, 48px);
  font-family: var(--h-ff-body);
  font-size: 0.9rem;
  color: var(--h-muted-dark);
  text-align: center;
}
</style>
