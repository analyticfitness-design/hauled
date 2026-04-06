<template>
  <section class="tp-order-area pb-160">
    <div class="container">
      <div class="tp-order-inner">
        <div class="row gx-0">

          <!-- Panel izquierdo: confirmación -->
          <div class="col-lg-6">
            <div class="tp-order-details" style="background-color: var(--h-navy, #0d2233);">
              <div class="tp-order-details-top text-center mb-70">
                <div class="tp-order-details-icon">
                  <span><svg-order-icon/></span>
                </div>
                <div class="tp-order-details-content">
                  <h3 class="tp-order-details-title">¡Pedido confirmado!</h3>
                  <p>Te enviaremos un correo de confirmación cuando tu pedido sea despachado.</p>
                </div>
              </div>
              <div class="tp-order-details-item-wrapper">
                <div class="row">
                  <div class="col-sm-6">
                    <div class="tp-order-details-item">
                      <h4>Fecha del pedido:</h4>
                      <p>{{ orderDate }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="tp-order-details-item">
                      <h4>Entrega estimada:</h4>
                      <p>{{ deliveryDate }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="tp-order-details-item">
                      <h4>Número de pedido:</h4>
                      <p>#{{ orderNumber }}</p>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <div class="tp-order-details-item">
                      <h4>Método de pago:</h4>
                      <p>Wompi / Tarjeta</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Panel derecho: resumen del pedido -->
          <div class="col-lg-6">
            <div class="tp-order-info-wrapper">
              <h4 class="tp-order-info-title">Detalles del pedido</h4>
              <div class="tp-order-info-list">
                <ul>
                  <!-- Encabezado -->
                  <li class="tp-order-info-list-header">
                    <h4>Producto</h4>
                    <h4>Total</h4>
                  </li>

                  <!-- Items dinámicos del carrito -->
                  <li
                    v-for="item in cartItems"
                    :key="item.id"
                    class="tp-order-info-list-desc"
                  >
                    <p>{{ item.title }} <span> x {{ item.orderQuantity ?? 1 }}</span></p>
                    <span>{{ formatCOP(item.price * (item.orderQuantity ?? 1)) }}</span>
                  </li>

                  <!-- Mensaje si carrito vacío -->
                  <li v-if="cartItems.length === 0" class="tp-order-info-list-desc">
                    <p>Pedido procesado</p>
                    <span>—</span>
                  </li>

                  <!-- Subtotal -->
                  <li class="tp-order-info-list-subtotal">
                    <span>Subtotal</span>
                    <span>{{ formatCOP(subtotal) }}</span>
                  </li>

                  <!-- Envío -->
                  <li class="tp-order-info-list-shipping">
                    <span>Envío</span>
                    <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
                      <span>
                        <label>Envío a Colombia: <span>{{ formatCOP(shippingCost) }}</span></label>
                      </span>
                    </div>
                  </li>

                  <!-- Total -->
                  <li class="tp-order-info-list-total">
                    <span>Total</span>
                    <span>{{ formatCOP(total) }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/pinia/useCartStore';

const cartStore = useCartStore();
const cartItems = computed(() => cartStore.cart_products);

function formatCOP(value: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);
}

const shippingCost = 15000;
const subtotal = computed(() =>
  cartItems.value.reduce((sum, item) => sum + item.price * (item.orderQuantity ?? 1), 0)
);
const total = computed(() => subtotal.value + shippingCost);

const orderNumber = Math.floor(10000 + Math.random() * 90000);

const orderDate = new Date().toLocaleDateString('es-CO', {
  year: 'numeric', month: 'long', day: 'numeric'
});
const deliveryDate = (() => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
})();
</script>
