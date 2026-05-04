<template>
  <section class="tp-checkout-area pb-120" style="background-color: var(--h-grey, #F4F4F4);">
    <div class="container">
      <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
        <h3 class="py-2">No hay productos en el carrito</h3>
        <nuxt-link href="/shop" class="tp-checkout-btn">
          Volver a la tienda
        </nuxt-link>
      </div>
      <div v-else class="row">
        <div class="col-xl-7 col-lg-7">
          <!-- checkout verify start -->
          <checkout-verify />
          <!-- checkout verify end -->
        </div>
        <!-- form start -->
        <form>
          <div class="row">
            <div class="col-lg-7">
              <div class="tp-checkout-bill-area">
                <h3 class="tp-checkout-bill-title">Datos de facturación</h3>
                <checkout-billing ref="billingRef" />
              </div>
            </div>
            <div class="col-lg-5">
              <!-- checkout place order -->
              <checkout-order :billing-ref="billingRef" />
              <!-- checkout place order -->
            </div>
          </div>
        </form>
        <!-- form end -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useCartStore} from '@/pinia/useCartStore';

const cartStore = useCartStore()
const billingRef = ref<{ form: any } | null>(null);
</script>
