<template>
  <div>
      <!-- breadcrumb start -->
      <breadcrumb-1 title="Shop Grid" subtitle="Shop Grid" />
      <!-- breadcrumb end -->

      <!-- shop area start -->
      <shop-area/>
      <!-- shop area end -->
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
