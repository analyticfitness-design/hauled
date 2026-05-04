<template>
  <div class="hauled-price">
    <div class="hauled-price__cop">
      {{ formatCOP(priceCop) }}
      <span class="hauled-price__badge">-15%</span>
    </div>
    <div class="hauled-price__usd">{{ formatUSD(priceUsd) }} USD</div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  priceUsd: number   // precio de venta USD (ej: 84.15)
  priceCop: number   // precio de venta COP en pesos (ej: 307148)
}>()

const formatCOP = (n: number) =>
  '$' + Math.round(n).toLocaleString('es-CO')

const formatUSD = (n: number) =>
  '$' + n.toFixed(2)
</script>

<style scoped>
.hauled-price {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.hauled-price__cop {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.1rem;
  color: #111;
  display: flex;
  align-items: center;
  gap: 6px;
}
.hauled-price__badge {
  background: #111;
  color: #4CC9F0;
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 2px 6px;
  border-radius: 3px;
}
.hauled-price__usd {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: #888;
  margin-top: 2px;
}
</style>
