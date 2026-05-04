<template>
  <div :class="`tp-product-item-2 ${spacing ? 'mb-40' : ''}`">
    <div
      class="tp-product-thumb-2 p-relative z-index-1 fix w-img"
      style="background-color: #f4f4f4"
    >
      <nuxt-link :href="`/product-details/${item.id}`">
        <img :src="item.img" :alt="item.title" />
      </nuxt-link>

      <!-- HAULED line badge (top left) -->
      <div class="hauled-line-badge-wrap">
        <HauledLineBadge :line="item.hauledLine" />
      </div>

      <!-- out of stock badge -->
      <div class="tp-product-badge">
        <span v-if="item.status === 'out-of-stock'" class="product-hot">Agotado</span>
      </div>

      <!-- product action -->
      <div class="tp-product-action-2 tp-product-action-blackStyle">
        <div class="tp-product-action-item-2 d-flex flex-column">
          <button
            v-if="!isItemInCart(item)"
            @click="cartStore.addCartProduct(item)"
            type="button"
            :class="`tp-product-action-btn-2 tp-product-add-cart-btn ${isItemInCart(item)? 'active': ''}`"
          >
            <svg-add-cart />
            <span class="tp-product-tooltip tp-product-tooltip-right">
              {{ item.hauledLine === 'encargo' ? 'Solicitar encargo' : 'Agregar al carrito' }}
            </span>
          </button>
          <nuxt-link
            v-if="isItemInCart(item)"
            href="/cart"
            :class="`tp-product-action-btn-2 tp-product-add-cart-btn active`"
          >
            <svg-add-cart />
            <span class="tp-product-tooltip tp-product-tooltip-right">Ver carrito</span>
          </nuxt-link>

          <button
            type="button"
            class="tp-product-action-btn-2 tp-product-quick-view-btn"
            data-bs-toggle="modal"
            :data-bs-target="`#${utilityStore.modalId}`"
            @click="utilityStore.handleOpenModal(`product-modal-${item.id}`, item)"
          >
            <svg-quick-view />
            <span class="tp-product-tooltip tp-product-tooltip-right">Vista rápida</span>
          </button>

          <button
            @click="wishlistStore.add_wishlist_product(item)"
            type="button"
            :class="`tp-product-action-btn-2 tp-product-add-to-wishlist-btn ${isItemInWishlist(item)? 'active': ''}`"
          >
            <svg-wishlist />
            <span class="tp-product-tooltip tp-product-tooltip-right">
              {{ isItemInWishlist(item) ? 'Quitar de favoritos' : 'Guardar en favoritos' }}
            </span>
          </button>
        </div>
      </div>
    </div>

    <div class="tp-product-content-2 pt-15">
      <div class="tp-product-tag-2">
        <a href="#">{{ item.category.name }}</a>
      </div>
      <h3 class="tp-product-title-2">
        <nuxt-link :href="`/product-details/${item.id}`">{{ item.title }}</nuxt-link>
      </h3>

      <!-- Entrega para encargos -->
      <div v-if="item.hauledLine === 'encargo' && item.deliveryDays" class="hauled-delivery-info">
        <span>🕐 {{ item.deliveryDays }}</span>
      </div>

      <div class="tp-product-price-wrapper-2">
        <!-- Encargo: precio variable -->
        <span v-if="item.hauledLine === 'encargo'" class="tp-product-price-2 new-price hauled-price-encargo">
          Cotizar →
        </span>
        <ProductPrice
          v-else-if="item.priceUsdSale != null && item.priceCopSale != null"
          :price-usd="item.priceUsdSale"
          :price-cop="item.priceCopSale"
        />
        <div v-else-if="item.discount > 0">
          <span class="tp-product-price-2 new-price">
            {{ formatPrice(Number(item.price) - (Number(item.price) * Number(item.discount)) / 100) }}
          </span>
          <span class="tp-product-price-2 old-price">
            {{ formatPrice(item.price, false) }}
          </span>
        </div>
        <span v-else class="tp-product-price-2 new-price">{{ formatPrice(item.price) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type IProduct } from "@/types/product-type";
import { useCompareStore } from "@/pinia/useCompareStore";
import { useCartStore } from "@/pinia/useCartStore";
import { useUtilityStore } from "@/pinia/useUtilityStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import HauledLineBadge from "@/components/hauled/HauledLineBadge.vue";
import ProductPrice from "@/components/product/ProductPrice.vue";

const compareStore = useCompareStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const utilityStore = useUtilityStore();

function isItemInWishlist(product: IProduct) {
  return wishlistStore.wishlists.some((prd) => prd.id === product.id);
}
function isItemInCompare(product: IProduct) {
  return compareStore.compare_items.some((prd) => prd.id === product.id);
}
function isItemInCart(product: IProduct) {
  return cartStore.cart_products.some((prd: IProduct) => prd.id === product.id);
}

const props = withDefaults(
  defineProps<{ item: IProduct; spacing?: boolean }>(),
  { spacing: true }
);
</script>

<style scoped>
.hauled-line-badge-wrap {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
}
.hauled-delivery-info {
  font-size: 0.75rem;
  color: #666666;
  margin: 4px 0 6px;
}
.hauled-price-encargo {
  color: #4cc9f0 !important;
  font-weight: 700;
  cursor: pointer;
}
</style>
