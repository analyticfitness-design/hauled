<template>
  <div>
    <div v-if="product">
      <!-- product detail area (includes hk-pd breadcrumb + grid) -->
      <product-details-area :product="product" />
    </div>

    <!-- not found -->
    <div v-else class="hk-scope hk-pd-notfound" role="alert">
      <p>Producto no encontrado.</p>
      <NuxtLink to="/shop" class="hk-btn-primary" style="display:inline-flex; margin-top:16px;">
        Ver catálogo
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import product_data from '@/data/product-data'
import { useProducts } from '@/composables/useProducts'
import { useProductFilterStore } from '@/pinia/useProductFilterStore'
import type { IProduct } from '@/types/product-type'
import { useSeo } from '@/composables/useSeo'

const route = useRoute()
const filterStore = useProductFilterStore()
const config = useRuntimeConfig()
const baseUrl = (config.public.appUrl as string) || 'https://hauled.shop'

const idParam = computed(() => route.params.id as string)

// ── SSR product lookup ──────────────────────────────────────────────────────
// Priority:
//   1. Products already in the filter store (loaded by /shop or cache).
//   2. Fetch the full catalogue from the API and pick the matching product.
//   3. Fall back to static mock data (local dev / API down).
const { data: product } = await useAsyncData<IProduct | null>(
  `product-detail-${idParam.value}`,
  async () => {
    // 1. Check store first — avoids a second network round-trip when coming
    //    from the catalogue page on the client.
    const fromStore = filterStore.products.find(
      (p) => p.id === idParam.value || p.slug === idParam.value
    )
    if (fromStore) return fromStore

    // 2. Try the API.
    try {
      const { products: mapped, fetchProducts } = useProducts()
      await fetchProducts({ per_page: '60' })
      // Hydrate the store so other pages benefit from the same fetch.
      if (mapped.value.length > 0) filterStore.setProducts(mapped.value)
      return (
        mapped.value.find(
          (p) => p.id === idParam.value || p.slug === idParam.value
        ) ?? null
      )
    } catch {
      // 3. Static fallback.
      return (
        product_data.find(
          (p) => p.id === idParam.value || p.slug === idParam.value
        ) ?? null
      )
    }
  }
)

// ── SEO + Schema.org ──────────────────────────────────────────────────────────
if (product.value) {
  const p = product.value
  const esEncargo = p.hauledLine === 'encargo'

  const precioSeo = esEncargo
    ? (p.priceCopSale ?? undefined)
    : (p.price > 0
        ? Math.round(p.price - (p.price * (p.discount ?? 0)) / 100)
        : undefined)

  useSeo({
    title: p.title,
    description: p.description?.substring(0, 155),
    image: p.img,
    type: 'product',
    precio: precioSeo,
    disponibilidad: esEncargo
      ? 'preorder'
      : ((p.quantity ?? 1) > 0 ? 'in stock' : 'out of stock'),
    esEncargo,
    sku: p.sku,
    brand: p.brand?.name,
    slug: p.slug,
  })

  useHead({
    script: [
      {
        type: 'application/ld+json',
        key: 'schema-breadcrumb',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Inicio', item: baseUrl },
            {
              '@type': 'ListItem',
              position: 2,
              name: p.parent || p.category?.name || 'Catálogo',
              item: `${baseUrl}/shop`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: p.title,
              item: `${baseUrl}/product-details/${p.slug || p.id}`,
            },
          ],
        }),
      },
    ],
  })
}
</script>

<style scoped>
.hk-pd-notfound {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 40vh;
  font-family: var(--h-ff-body);
  font-size: 0.95rem;
  color: var(--h-muted-dark);
}
</style>
