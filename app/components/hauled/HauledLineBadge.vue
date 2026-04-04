<script setup lang="ts">
const props = defineProps<{
  line: 'originals' | 'basics' | 'encargo' | undefined;
}>();

const config = {
  originals: {
    label: '🇺🇸 USA Original',
    bg: '#0d2233',
    color: '#4cc9f0',
    border: '#4cc9f0',
  },
  basics: {
    label: 'HAULED Basics',
    bg: '#f4f4f4',
    color: '#111111',
    border: '#e0e0e0',
  },
  encargo: {
    label: '📦 Por Encargo',
    bg: '#111111',
    color: '#ffffff',
    border: '#333333',
  },
};
</script>

<template>
  <span
    v-if="line && config[line]"
    class="hauled-badge"
    :style="{
      background: config[line].bg,
      color: config[line].color,
      border: `1px solid ${config[line].border}`,
    }"
  >
    {{ config[line].label }}
  </span>
</template>

<style scoped>
.hauled-badge {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 4px;
  white-space: nowrap;
}
</style>
