<template>
  <section class="hk-drop">
    <div class="hk-drop-head">
      <div>
        <p class="hk-eyebrow">
          <span class="hk-eyebrow-line" />Recién llegado
        </p>
        <h2 class="hk-h2" style="color:#fff">Lo último que cargamos</h2>
      </div>
      <NuxtLink to="/shop" class="hk-drop-all">
        Ver todo <span class="hk-arrow">→</span>
      </NuxtLink>
    </div>
    <div class="hk-drop-rail">
      <NuxtLink
        v-for="product in dropProducts"
        :key="product.id"
        :to="`/product-details/${product.id}`"
        class="hk-drop-card"
      >
        <div class="hk-drop-media">
          <img
            :src="product.img || '/img/placeholder.jpg'"
            :alt="product.title"
            loading="lazy"
          />
          <span v-if="product.status === 'New'" class="hk-drop-badge">Nuevo</span>
        </div>
        <div class="hk-drop-info">
          <span class="hk-drop-cat">{{ product.category?.name || product.parent || '' }}</span>
          <span class="hk-drop-name">{{ product.title }}</span>
          <span class="hk-drop-price">
            {{ product.hauledLine === 'encargo' ? 'Cotizar' : fmtCop(product.price) }}
            <em v-if="product.priceUsd && product.hauledLine !== 'encargo'">USD ${{ product.priceUsd }}</em>
          </span>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-type'

const config = useRuntimeConfig()
const apiBase = (config.public.apiBase as string) || 'https://api.hauled.shop'

interface ApiProductRaw {
  id: number
  title: string
  slug: string
  description?: string
  price: number
  price_usd?: number
  price_usd_full?: number
  price_cop_sale?: number
  discount?: number
  stock: number
  hauled_line?: string
  images?: string[]
  sizes?: string[]
  brand?: { name: string }
  category?: { name: string; slug: string }
}

interface ApiResponse {
  data: ApiProductRaw[]
}

const mapProduct = (p: ApiProductRaw): IProduct => ({
  id: String(p.id),
  sku: p.slug,
  title: p.title,
  slug: p.slug,
  description: p.description ?? '',
  img: p.images?.[0] ?? '/img/products/placeholder.jpg',
  imageURLs: [],
  parent: p.category?.name ?? '',
  children: '',
  price: p.price_cop_sale ?? p.price,
  priceUsd: p.price_usd_full != null ? p.price_usd_full / 100 : (p.price_usd ? p.price_usd / 100 : undefined),
  discount: p.discount ?? 0,
  quantity: p.stock ?? 0,
  brand: { name: p.brand?.name ?? 'GASP' },
  category: { name: p.category?.name ?? '' },
  status: (p.stock ?? 0) > 0 ? 'in-stock' : 'out-of-stock',
  productType: 'fashion',
  hauledLine: (p.hauled_line as 'originals' | 'basics' | 'encargo') ?? 'originals',
  sizes: p.sizes ?? [],
  unit: '1pc',
  featured: false,
  sellCount: 0,
  tags: [],
  reviews: [],
  additionalInformation: [],
})

const { data: apiProducts } = await useAsyncData<IProduct[]>(
  'home-drop-rail',
  async () => {
    try {
      const res = await $fetch<ApiResponse>(`${apiBase}/api/v1/products`, {
        params: { per_page: '16' },
      })
      return (res.data ?? []).map(mapProduct)
    } catch {
      const { default: product_data } = await import('@/data/product-data')
      return product_data as IProduct[]
    }
  },
)

const dropProducts = computed<IProduct[]>(() => {
  const all = apiProducts.value ?? []
  return all.filter((p) => p.hauledLine !== 'encargo').slice(0, 8)
})

const fmtCop = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
</script>
