<template>
  <div>
    <nuxt-layout name="layout-one">
      <div class="hk-scope">
        <hauled-hero />
        <hauled-drop-rail />
        <hauled-lines />
        <hauled-featured />
        <hauled-social-proof />
        <hauled-encargo-c-t-a />
      </div>
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
