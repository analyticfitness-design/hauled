<template>
  <div>
    <nuxt-layout name="layout-one">
      <!-- Hero principal HAULED — gasp-hero-1.jpg -->
      <hauled-hero />

      <!-- Las 3 líneas de producto — fondo blanco -->
      <hauled-lines />

      <!-- Banner split GASP: gasp-zz-4 + gasp-hero-launch -->
      <hauled-banner />

      <!-- Productos GASP destacados — fondo gris claro -->
      <hauled-featured />

      <!-- Lookbook GASP — galería dark con gasp-zz-* -->
      <hauled-lookbook />

      <!-- CTA Encargos — navy + foto de fondo -->
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
