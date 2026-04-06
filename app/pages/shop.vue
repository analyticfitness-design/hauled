<template>
  <div>
    <hauled-page-header title="Tienda" eyebrow="Colección GASP" subtitle="Tienda" />
    <shop-area/>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({
  title: 'Tienda',
  description: 'Compra ropa original de USA en Colombia. Nike, Gap, Tommy, Jordan, Adidas — Originals, Basics y Encargos. Envío nacional.',
  type: 'website',
});
</script>
