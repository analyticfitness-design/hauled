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

const { fetchList } = useProducts()

const { data: apiProducts } = await useAsyncData<IProduct[]>(
  'home-drop-rail',
  () => fetchList({ per_page: '16' }),
)

const dropProducts = computed<IProduct[]>(() => {
  const all = apiProducts.value ?? []
  return all.filter((p) => p.hauledLine !== 'encargo').slice(0, 8)
})

const fmtCop = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
</script>
