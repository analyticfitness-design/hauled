<template>
  <div>
    <hauled-page-header title="Mi cuenta" eyebrow="Accede a tu cuenta" subtitle="Iniciar sesión" :center="true" />
    <login-area/>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({ title: 'Iniciar sesión' });
</script>
