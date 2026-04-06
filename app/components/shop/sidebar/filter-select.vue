<template>
    <div class="tp-shop-top-select text-md-end">
      <ui-nice-select
        :options="[
          { value: 'default-sorting', text: 'Ordenar por' },
          { value: 'low-to-high', text: 'Menor a mayor precio' },
          { value: 'high-to-low', text: 'Mayor a menor precio' },
          { value: 'new-added', text: 'Nuevos ingresos' },
          { value: 'on-sale', text: 'En descuento' },
        ]"
        name="Ordenar por"
        :default-current="0"
        @onChange="handleSelect"
      />
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['handleSelectFilter'])
const handleSelect = (e: { value: string; text: string }) => {
  emit('handleSelectFilter', e);
};
</script>
