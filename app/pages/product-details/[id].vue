<template>
  <div v-if="product">
      <!-- breadcrumb start -->
      <product-details-breadcrumb :product="product" />
      <!-- breadcrumb end -->

      <!-- product details area start -->
      <product-details-area :product="product" />
      <!-- product details area end -->

      <!-- related products start -->
      <product-related :product-id="product.id" :category="product.category.name" />
      <!-- related products end -->
  </div>
</template>

<script setup lang="ts">
import product_data from '@/data/product-data';
import { useProductStore } from '@/pinia/useProductStore';
import { type IProduct } from '@/types/product-type';
import { useSeo } from '@/composables/useSeo';
const route = useRoute()

const productStore = useProductStore();

// SSR-safe lookup: ejecuta inmediatamente para que el HTML server-rendered
// incluya meta tags y Schema.org JSON-LD para Google.
const product = ref<IProduct | undefined>(
  product_data.find(b => b.id === route.params.id || b.slug === route.params.id)
);

if (product.value) {
  useSeo({
    title: product.value.title,
    description: product.value.description?.substring(0, 155),
    image: product.value.img,
    type: 'product',
    precio: product.value.price > 0 ? product.value.price : undefined,
    disponibilidad: (product.value.quantity ?? 1) > 0 ? 'in stock' : 'out of stock',
  });
}

onMounted(() => {
  if (product.value) {
    productStore.activeImg = product.value.img;
  }
});
</script>
