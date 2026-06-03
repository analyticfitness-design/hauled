<template>
  <!-- Scrim (overlay) -->
  <div
    :class="['hk-cart-scrim', { 'is-open': cartStore.cartOffcanvas }]"
    aria-hidden="true"
    @click="cartStore.handleCartOffcanvas"
  />

  <!-- Drawer -->
  <aside
    :class="['hk-cart', { 'is-open': cartStore.cartOffcanvas }]"
    role="dialog"
    aria-modal="true"
    aria-label="Tu carrito de compras"
  >
    <!-- Head -->
    <div class="hk-cart-head">
      <span class="hk-cart-title">
        Tu carrito
        <span class="hk-cart-n" aria-label="`${itemCount} productos`">{{ itemCount }}</span>
      </span>
      <button
        class="hk-icon-btn"
        type="button"
        aria-label="Cerrar carrito"
        @click="cartStore.handleCartOffcanvas"
      >
        <!-- close icon (Lucide-style stroke 1.5) -->
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <!-- Body -->
    <div class="hk-cart-body">
      <!-- Empty state -->
      <div v-if="cartStore.cart_products.length === 0" class="hk-cart-empty">
        <!-- bag icon -->
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="1.5"
          stroke-linecap="round" stroke-linejoin="round"
          aria-hidden="true">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
          <path d="M3 6h18"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>Tu carrito está vacío</p>
      </div>

      <!-- Items -->
      <template v-else>
        <div
          v-for="item in cartStore.cart_products"
          :key="`${item.id}-${item.selectedSize ?? ''}`"
          class="hk-cart-item"
        >
          <img
            :src="item.img"
            :alt="item.title"
            width="64"
            height="80"
            loading="lazy"
          />
          <div class="hk-cart-item-info">
            <p class="hk-cart-item-name">{{ item.title }}</p>
            <p class="hk-cart-item-meta">
              <template v-if="item.hauledLine === 'encargo'">
                Encargo · cotizar
              </template>
              <template v-else>
                {{ item.selectedSize ? `Talla ${item.selectedSize} · ` : '' }}x{{ item.orderQuantity ?? 1 }}
              </template>
            </p>
            <p class="hk-cart-item-price">
              <template v-if="item.hauledLine === 'encargo'">
                Cotizar →
              </template>
              <template v-else>
                {{ formatItemPrice(item) }}
              </template>
            </p>
          </div>
          <button
            class="hk-cart-item-rm"
            type="button"
            :aria-label="`Eliminar ${item.title} del carrito`"
            @click="cartStore.removeCartProduct(item)"
          >
            <!-- close icon small -->
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round"
              aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </template>
    </div>

    <!-- Footer (only when cart has items) -->
    <div v-if="cartStore.cart_products.length > 0" class="hk-cart-foot">
      <div class="hk-cart-total">
        <span>Subtotal</span>
        <span>{{ formatTotal(cartStore.totalPriceQuantity.total) }}</span>
      </div>
      <NuxtLink
        to="/checkout"
        class="hk-btn-primary"
        @click="cartStore.handleCartOffcanvas"
      >
        IR AL CHECKOUT
      </NuxtLink>
      <button
        type="button"
        class="hk-cart-continue"
        @click="cartStore.handleCartOffcanvas"
      >
        Seguir comprando
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useCartStore } from '@/pinia/useCartStore';
import type { IProduct } from '@/types/product-type';

const cartStore = useCartStore();

const itemCount = computed(() => cartStore.cart_products.length);

const cop = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

function formatTotal(amount: number): string {
  return cop.format(amount);
}

function formatItemPrice(item: IProduct): string {
  // Precio desde la API tal cual (item.price ya es el precio final). NO recalcular
  // descuento aquí — debe coincidir con el subtotal del store.
  const qty = item.orderQuantity ?? 1;
  return cop.format(item.price * qty);
}
</script>
