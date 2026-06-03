<template>
  <section class="tp-checkout-area pb-120" style="background-color: var(--h-grey, #F4F4F4);">
    <div class="container">
      <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
        <h3 class="py-2">No hay productos en el carrito</h3>
        <nuxt-link href="/shop" class="tp-checkout-btn">
          Volver a la tienda
        </nuxt-link>
      </div>
      <div v-else>
        <!-- Stepper visual (P1) -->
        <div class="hauled-checkout-stepper">
          <span class="hauled-step hauled-step--done">CARRITO</span>
          <span class="hauled-step-sep">→</span>
          <span class="hauled-step hauled-step--active">DATOS</span>
          <span class="hauled-step-sep">→</span>
          <span class="hauled-step">PAGO</span>
          <span class="hauled-step-sep">→</span>
          <span class="hauled-step">CONFIRMACIÓN</span>
        </div>

        <!-- checkout verify start -->
        <checkout-verify />
        <!-- checkout verify end -->

        <!-- Two-column layout: billing form left, order summary right -->
        <form>
          <div class="row g-4">
            <div class="col-lg-7">
              <div class="tp-checkout-bill-area">
                <h3 class="tp-checkout-bill-title">Datos de facturación</h3>
                <checkout-billing ref="billingRef" />
              </div>
            </div>
            <div class="col-lg-5">
              <div class="hauled-checkout-summary-sticky">
                <!-- checkout place order -->
                <checkout-order :billing-ref="billingRef" />
                <!-- checkout place order -->
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {useCartStore} from '@/pinia/useCartStore';

const cartStore = useCartStore()
const billingRef = ref<{ form: any } | null>(null);
</script>

<style scoped>
/* ── Progress stepper (P1) ── */
.hauled-checkout-stepper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 0 24px;
  overflow-x: auto;
  white-space: nowrap;
}
.hauled-step {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.35);
}
.hauled-step--done {
  color: rgba(0,0,0,0.5);
}
.hauled-step--active {
  color: var(--h-black, #111);
  border-bottom: 2px solid var(--h-blue, #4CC9F0);
  padding-bottom: 2px;
}
.hauled-step-sep {
  font-family: 'Space Mono', monospace;
  font-size: 0.72rem;
  color: rgba(0,0,0,0.25);
}

/* ── Sticky order summary ≥lg (P1) ── */
@media (min-width: 992px) {
  .hauled-checkout-summary-sticky {
    position: sticky;
    top: 90px;
  }
}
</style>
