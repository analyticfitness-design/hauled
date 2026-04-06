<template>
  <div>
    <hauled-page-header title="Crear cuenta" eyebrow="Únete a HAULED" subtitle="Registro" :center="true" />
    <register-area/>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';
useSeo({ title: 'Crear cuenta' });
</script>
