<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- Hero principal HAULED -->
      <hauled-hero />

      <!-- Las 3 líneas de producto -->
      <hauled-lines />

      <!-- Productos destacados / nuevos -->
      <hauled-featured />

      <!-- CTA Encargos -->
      <hauled-encargo-c-t-a />

      <!-- Subscribe -->
      <subscribe-1 />
    </nuxt-layout>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';

definePageMeta({ layout: false });

useSeo({
  description: 'Ropa original de USA traída directamente a Colombia. Nike, Gap, Tommy, Jordan y más. Encargos a pedido. Envío a todo Colombia.',
});
</script>
