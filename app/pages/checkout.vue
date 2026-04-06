<template>
  <div>
    <hauled-page-header title="Pago" eyebrow="Finaliza tu pedido" subtitle="Checkout" :center="true" />
    <checkout-area/>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({ title: 'Checkout — Finalizar pedido' });
</script>
