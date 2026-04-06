<template>
  <div>
    <hauled-page-header title="Carrito" eyebrow="Tu selección" subtitle="Carrito de compras" />
    <cart-area/>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({ title: 'Carrito de compras' });
</script>
