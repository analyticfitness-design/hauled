<template>
  <div>
    <hauled-page-header title="Lista de deseos" eyebrow="Guardado para después" subtitle="Lista de deseos" />
    <wishlist-area/>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({ title: 'Lista de deseos' });
</script>
