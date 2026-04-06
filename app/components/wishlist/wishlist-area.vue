<template>
   <section class="tp-cart-area pb-120">
      <div class="container">
        <div v-if="wishlistStore.wishlists.length === 0" class="text-center pt-50">
          <h3>Tu lista de deseos está vacía</h3>
          <nuxt-link href="/shop" class="tp-cart-checkout-btn mt-20">Seguir comprando</nuxt-link>
        </div>
        <div v-else class="row">
          <div class="col-xl-12">
            <div class="tp-cart-list mb-45 mr-30">
              <table>
                <thead>
                  <tr>
                    <th colspan="2" class="tp-cart-header-product">Producto</th>
                    <th class="tp-cart-header-price">Precio</th>
                    <th>Agregar al carrito</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <wishlist-item v-for="item in wishlistStore.wishlists" :key="item.id" :item="item"/>
                </tbody>
              </table>
            </div>
            <div class="tp-cart-bottom">
              <div class="row align-items-end">
                <div class="col-xl-6 col-md-4">
                  <div class="tp-cart-update">
                    <nuxt-link href="/cart" class="tp-cart-update-btn">Ir al carrito</nuxt-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
</template>

<script setup lang="ts">
import { useWishlistStore } from "@/pinia/useWishlistStore";
const wishlistStore = useWishlistStore();
</script>
