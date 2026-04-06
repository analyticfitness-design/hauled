<template>
  <div>
    <hauled-page-header
      title="Nosotros"
      eyebrow="Quiénes somos"
      subtitle="Sobre HAULED"
      bg="/img/hero/gasp-hero-launch.jpg"
    />
    <about-area/>
    <counter-area/>
    <history-area/>
    <work-area/>
    <author-area/>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({
  title: 'Nosotros — HAULED',
  description: 'Conoce la historia de HAULED, importadores directos de ropa original USA a Colombia. Autenticidad garantizada, envío nacional.',
});
</script>
