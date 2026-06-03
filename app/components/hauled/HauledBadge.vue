<script setup lang="ts">
// HauledBadge — la "cargo tag" de la firma de marca (esquina recortada).
// Variantes: usa / sale / new / low / out / encargo
defineProps<{
  variant?: 'usa' | 'sale' | 'new' | 'low' | 'out' | 'encargo';
  label?: string;
}>();
</script>

<template>
  <span class="h-badge" :class="`h-badge--${variant ?? 'usa'}`">
    <slot>{{ label }}</slot>
  </span>
</template>

<style scoped>
.h-badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--hauled-font-mono, "Space Mono", monospace);
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: var(--hauled-track-caps, 0.14em);
  text-transform: uppercase;
  padding: 4px 10px;
  line-height: 1;
  white-space: nowrap;
  color: #fff;
  background: var(--hauled-ink, #0A0A0A);
  /* Firma: una esquina superior-izquierda recortada a 45° (etiqueta de carga) */
  clip-path: polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px);
}
.h-badge--usa     { background: var(--hauled-accent, #4CC9F0); }
.h-badge--sale    { background: var(--hauled-accent, #4CC9F0); }
.h-badge--new     { background: var(--hauled-ink, #0A0A0A); }
.h-badge--low     { background: var(--hauled-warning, #E8A400); color: #0A0A0A; }
.h-badge--out     { background: var(--hauled-g-600, #555); }
.h-badge--encargo { background: var(--hauled-ink, #0A0A0A); }
</style>
