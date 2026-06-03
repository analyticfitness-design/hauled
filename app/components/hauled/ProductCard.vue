<script setup lang="ts">
// HauledProductCard — tarjeta de producto fiel al prototipo (hk-prod).
// Foto 3:4, badge de línea (USA/HAULED/Encargo), badge "Nuevo", overlay "Ver
// producto", precio COP+USD desde la API. Encargo → "Cotizar". Estilos hk- globales.
import type { IProduct } from '@/types/product-type'

const props = defineProps<{ item: IProduct }>()
const emit = defineEmits<{ (e: 'quote', item: IProduct): void }>()

const LINE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  originals: { label: 'USA', bg: 'var(--h-navy)', color: 'var(--h-blue)' },
  basics: { label: 'HAULED', bg: 'rgba(0,0,0,.65)', color: '#fff' },
  encargo: { label: 'Encargo', bg: '#111', color: '#fff' },
}

const badge = computed(() => LINE_BADGE[props.item.hauledLine ?? 'originals'])
const isEncargo = computed(() => props.item.hauledLine === 'encargo')
const cat = computed(() => props.item.category?.name || props.item.parent || '')
const fmtCop = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
const to = computed(() => `/product-details/${props.item.id}`)
</script>

<template>
  <div class="hk-prod">
    <NuxtLink :to="to" class="hk-prod-img-wrap" :aria-label="`Ver ${item.title}`">
      <img :src="item.img || '/img/placeholder.jpg'" :alt="item.title" class="hk-prod-img" loading="lazy" />
      <span v-if="badge" class="hk-badge" :style="{ background: badge.bg, color: badge.color }">{{ badge.label }}</span>
      <span v-if="item.status === 'New'" class="hk-prod-new">Nuevo</span>
      <span class="hk-prod-overlay">
        <span class="hk-prod-overlay-btn">Ver producto</span>
      </span>
    </NuxtLink>
    <div class="hk-prod-info">
      <div v-if="cat" class="hk-prod-cat">{{ cat }}</div>
      <p class="hk-prod-name">{{ item.title }}</p>
      <button v-if="isEncargo" class="hk-prod-quote" type="button" @click="emit('quote', item)">Cotizar →</button>
      <div v-else class="hk-prod-prices">
        <span class="hk-prod-cop">{{ fmtCop(item.price) }}</span>
        <span v-if="item.priceUsd" class="hk-prod-usd">USD ${{ item.priceUsd }}</span>
      </div>
    </div>
  </div>
</template>
