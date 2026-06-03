<template>
  <section class="hk-featured">
    <div class="hk-featured-head">
      <div>
        <p class="hk-eyebrow">En stock ahora</p>
        <h2 class="hk-h2 hk-ink">GASP Collection</h2>
      </div>
      <NuxtLink to="/shop" class="hk-see-all">
        Ver todo <span class="hk-arrow">→</span>
      </NuxtLink>
    </div>
    <div class="hk-grid-4">
      <div
        v-for="(product, i) in featuredProducts"
        :key="product.id"
        class="hk-fade"
        :style="{ animationDelay: `${i * 55}ms` }"
      >
        <HauledProductCard :item="product" @quote="onQuote" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-type'

const { fetchList } = useProducts()

const { data: apiProducts } = await useAsyncData<IProduct[]>(
  'home-featured',
  () => fetchList({ per_page: '24', line: 'originals' }),
)

const featuredProducts = computed<IProduct[]>(() => {
  const all = apiProducts.value ?? []
  const gasp = all.filter((p) => p.brand?.name === 'GASP')
  const others = all.filter((p) => p.brand?.name !== 'GASP' && (p.featured || p.status === 'New'))
  return [...gasp, ...others].slice(0, 8)
})

const router = useRouter()
const onQuote = (_item: IProduct) => {
  router.push('/encargos')
}
</script>
