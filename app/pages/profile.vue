<template>
  <div>
      <profile-area/>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
useSeoMeta({ title: 'Mi cuenta — HAULED' });
</script>
