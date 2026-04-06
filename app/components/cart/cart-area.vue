<template>
  <section class="tp-cart-area pb-120">
    <div class="container">

      <!-- Carrito vacío -->
      <div v-if="cartStore.cart_products.length === 0" class="text-center pt-50">
        <h3 style="font-family:'Raleway',sans-serif;font-weight:900;letter-spacing:2px">Tu carrito está vacío</h3>
        <p style="color:#666;margin:12px 0 24px">Explora el catálogo y encuentra lo que buscas.</p>
        <nuxt-link href="/shop" class="tp-cart-checkout-btn mt-20">Ver catálogo</nuxt-link>
      </div>

      <div v-else class="row">
        <div class="col-xl-9 col-lg-8">
          <div class="tp-cart-list mb-25 mr-30">
            <table>
              <thead>
                <tr>
                  <th colspan="2" class="tp-cart-header-product">Producto</th>
                  <th class="tp-cart-header-price">Precio</th>
                  <th class="tp-cart-header-quantity">Cantidad</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <cart-item v-for="item in cartStore.cart_products" :key="item.id" :item="item" />
              </tbody>
            </table>
          </div>

          <!-- Nota de encargos si hay alguno -->
          <div v-if="cartStore.totalPriceQuantity.encargos > 0" class="hauled-encargo-cart-notice mr-30">
            <span>📦</span>
            <div>
              <strong>Tienes {{ cartStore.totalPriceQuantity.encargos }} encargo(s) en tu carrito.</strong>
              <p>Los encargos se coordinan por WhatsApp. Te contactamos en 24h para confirmar disponibilidad y precio final.</p>
            </div>
          </div>

          <div class="tp-cart-bottom mr-30">
            <div class="row align-items-end">
              <div class="col-xl-6 col-md-8">
                <div class="tp-cart-coupon">
                  <form @submit.prevent="handleCouponSubmit">
                    <div class="tp-cart-coupon-input-box">
                      <label>Código de descuento:</label>
                      <div class="tp-cart-coupon-input d-flex align-items-center">
                        <input type="text" placeholder="Ingresa tu código" v-model="couponCode" />
                        <button type="submit">Aplicar</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="col-xl-6 col-md-4">
                <div class="tp-cart-update text-md-end">
                  <button @click="cartStore.clear_cart()" type="button" class="tp-cart-update-btn">Vaciar carrito</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Resumen del pedido -->
        <div class="col-xl-3 col-lg-4 col-md-6">
          <div class="tp-cart-checkout-wrapper">
            <div class="tp-cart-checkout-top d-flex align-items-center justify-content-between">
              <span class="tp-cart-checkout-top-title">Subtotal</span>
              <span class="tp-cart-checkout-top-price">
                {{ formatPrice(cartStore.totalPriceQuantity.total) }}
              </span>
            </div>

            <!-- Envío -->
            <div class="tp-cart-checkout-shipping">
              <h4 class="tp-cart-checkout-shipping-title">Envío</h4>
              <div class="tp-cart-checkout-shipping-option-wrapper">
                <div class="tp-cart-checkout-shipping-option">
                  <input id="envio_bucaramanga" type="radio" name="shipping" />
                  <label @click="handleShippingCost(0)" for="envio_bucaramanga">
                    Bucaramanga: <span>Gratis</span>
                  </label>
                </div>
                <div class="tp-cart-checkout-shipping-option">
                  <input id="envio_nacional" type="radio" name="shipping" />
                  <label @click="handleShippingCost(22000)" for="envio_nacional">
                    Nacional: <span>{{ formatPrice(22000) }}</span>
                  </label>
                </div>
                <div class="tp-cart-checkout-shipping-option">
                  <input id="envio_gratis" type="radio" name="shipping" />
                  <label @click="handleShippingCost(0)" for="envio_gratis">
                    Nacional gratis (+$300.000)
                  </label>
                </div>
              </div>
            </div>

            <!-- Total -->
            <div class="tp-cart-checkout-total d-flex align-items-center justify-content-between">
              <span>Total</span>
              <span>{{ formatPrice(cartStore.totalPriceQuantity.total + shipCost) }}</span>
            </div>

            <!-- CTA -->
            <div class="tp-cart-checkout-proceed">
              <nuxt-link href="/checkout" class="tp-cart-checkout-btn w-100">
                Ir al pago
              </nuxt-link>
            </div>

            <!-- Garantías -->
            <div class="hauled-cart-trust">
              <p>🔒 Pago seguro con Wompi</p>
              <p>📦 Envío a todo Colombia</p>
              <p>✅ Productos verificados</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from "@/pinia/useCartStore";
const cartStore = useCartStore();
let shipCost = ref<number>(0);
let couponCode = ref<string>('');

const handleCouponSubmit = () => {
  // TODO: conectar con API de cupones
};

const handleShippingCost = (value: number) => {
  shipCost.value = value;
};
</script>

<style scoped>
.hauled-encargo-cart-notice {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  background: #f4f4f4;
  border: 1px solid #e0e0e0;
  border-left: 4px solid #4cc9f0;
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 20px;
  font-size: 0.85rem;
}
.hauled-encargo-cart-notice span { font-size: 1.3rem; }
.hauled-encargo-cart-notice strong { color: #111; display: block; margin-bottom: 4px; }
.hauled-encargo-cart-notice p { color: #666; margin: 0; }
.hauled-cart-trust {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
}
.hauled-cart-trust p {
  font-size: 0.78rem;
  color: #666;
  margin: 4px 0;
}
</style>
