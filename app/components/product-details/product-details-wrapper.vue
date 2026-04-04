<template>
  <div class="tp-product-details-wrapper has-sticky">

    <!-- Categoría -->
    <div class="tp-product-details-category">
      <span>{{ product.parent }}</span>
    </div>

    <!-- Título -->
    <h3 class="tp-product-details-title">{{ product.title }}</h3>

    <!-- Badge de línea HAULED -->
    <div style="margin: 10px 0 14px">
      <HauledLineBadge :line="product.hauledLine" />
    </div>

    <!-- Info de entrega para encargos -->
    <div v-if="product.hauledLine === 'encargo'" class="hauled-encargo-info">
      <div class="hauled-encargo-row">
        <span class="hauled-encargo-icon">🕐</span>
        <span>Entrega estimada: <strong>{{ product.deliveryDays }}</strong></span>
      </div>
      <div class="hauled-encargo-row">
        <span class="hauled-encargo-icon">💳</span>
        <span>Pago: <strong>{{ product.advancePercent }}% adelanto — {{ 100 - (product.advancePercent ?? 50) }}% al recibir</strong></span>
      </div>
      <div class="hauled-encargo-row">
        <span class="hauled-encargo-icon">✈️</span>
        <span>Traído directamente desde USA</span>
      </div>
    </div>

    <!-- Stock + Rating -->
    <div class="tp-product-details-inventory d-flex align-items-center mb-10">
      <div class="tp-product-details-stock mb-10">
        <span v-if="product.hauledLine === 'encargo'">Disponible bajo pedido</span>
        <span v-else-if="product.status === 'in-stock'">En stock</span>
        <span v-else>Agotado</span>
      </div>
      <div class="tp-product-details-rating-wrapper d-flex align-items-center mb-10">
        <div class="tp-product-details-rating">
          <span v-for="i in 5" :key="i"><i class="fa-solid fa-star"></i></span>
        </div>
        <div class="tp-product-details-reviews">
          <span>({{ product.reviews?.length ?? 0 }} reseñas)</span>
        </div>
      </div>
    </div>

    <!-- Descripción -->
    <p>
      {{ textMore ? product.description : `${product.description.substring(0, 120)}...` }}
      <span class="hauled-text-toggle" @click="textMore = !textMore">
        {{ textMore ? 'Ver menos' : 'Ver más' }}
      </span>
    </p>

    <!-- Precio -->
    <div class="tp-product-details-price-wrapper mb-20">
      <div v-if="product.hauledLine === 'encargo'">
        <span class="tp-product-details-price new-price hauled-cotizar-price">
          Cotizar sin compromiso →
        </span>
      </div>
      <div v-else-if="product.discount > 0">
        <span class="tp-product-details-price old-price">{{ formatPrice(product.price, false) }}</span>
        <span class="tp-product-details-price new-price">
          {{ formatPrice(Number(product.price) - (Number(product.price) * Number(product.discount)) / 100) }}
        </span>
      </div>
      <span v-else class="tp-product-details-price new-price">{{ formatPrice(product.price) }}</span>
    </div>

    <!-- Selector de color -->
    <div v-if="hasColorData" class="tp-product-details-variation">
      <div class="tp-product-details-variation-item">
        <h4 class="tp-product-details-variation-title">Color:</h4>
        <div class="tp-product-details-variation-list">
          <button
            v-for="(item, i) in product.imageURLs"
            :key="i"
            @click="productStore.handleImageActive(item.img)"
            type="button"
            :class="['color', 'tp-color-variation-btn', item.img === productStore.activeImg ? 'active' : '']"
            style="margin-right:5px"
          >
            <span :style="`background-color:${item.color?.clrCode}`"></span>
            <span v-if="item.color?.name" class="tp-color-variation-tootltip">{{ item.color.name }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Selector de talla -->
    <div v-if="product.sizes && product.sizes.length > 0" class="tp-product-details-variation mt-15">
      <div class="tp-product-details-variation-item">
        <h4 class="tp-product-details-variation-title">
          Talla:
          <span class="hauled-size-guide" @click="showSizeGuide = true">Guía de tallas</span>
        </h4>
        <div class="tp-product-details-variation-list">
          <button
            v-for="size in product.sizes"
            :key="size"
            type="button"
            :class="['tp-size-variation-btn', selectedSize === size ? 'active' : '']"
            @click="selectedSize = size"
          >
            {{ size }}
          </button>
        </div>
      </div>
    </div>

    <!-- Countdown si hay fecha de oferta -->
    <div v-if="product.offerDate?.endDate">
      <product-details-countdown :product="product" />
    </div>

    <!-- Acciones -->
    <div class="tp-product-details-action-wrapper">
      <!-- Para encargos: botón de WhatsApp -->
      <div v-if="product.hauledLine === 'encargo'">
        <a
          href="https://wa.me/573000000000?text=Hola%20HAULED%2C%20quiero%20cotizar%20un%20encargo"
          target="_blank"
          class="tp-product-details-add-to-cart-btn w-100 hauled-whatsapp-btn"
          style="display:block;text-align:center;text-decoration:none;margin-top:12px"
        >
          💬 Solicitar cotización por WhatsApp
        </a>
      </div>

      <!-- Para stock normal: cantidad + carrito -->
      <div v-else>
        <h3 class="tp-product-details-action-title">Cantidad</h3>
        <div class="tp-product-details-action-item-wrapper d-flex align-items-center">
          <div class="tp-product-details-quantity">
            <div class="tp-product-quantity mb-15 mr-15">
              <span class="tp-cart-minus" @click="cartStore.decrement"><svg-minus /></span>
              <input class="tp-cart-input" type="text" :value="cartStore.orderQuantity" disabled />
              <span class="tp-cart-plus" @click="cartStore.increment"><svg-plus-sm /></span>
            </div>
          </div>
          <div class="tp-product-details-add-to-cart mb-15 w-100">
            <button @click="cartStore.addCartProduct(product)" class="tp-product-details-add-to-cart-btn w-100">
              Agregar al carrito
            </button>
          </div>
        </div>
        <button @click="cartStore.addCartProduct(product)" class="tp-product-details-buy-now-btn w-100 text-center">
          Comprar ahora
        </button>
      </div>
    </div>

    <!-- Acciones secundarias -->
    <div class="tp-product-details-action-sm">
      <button @click="wishlistStore.add_wishlist_product(product)" type="button" class="tp-product-details-action-sm-btn">
        <svg-wishlist-3 /> Favoritos
      </button>
      <button type="button" class="tp-product-details-action-sm-btn">
        <svg-ask-question /> Preguntar
      </button>
    </div>

    <!-- Info del producto -->
    <div v-if="isShowBottom">
      <div class="tp-product-details-query">
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>SKU: </span><p>{{ product.sku }}</p>
        </div>
        <div class="tp-product-details-query-item d-flex align-items-center">
          <span>Categoría: </span><p>{{ product.parent }}</p>
        </div>
        <div v-if="product.tags?.length" class="tp-product-details-query-item d-flex align-items-center">
          <span>Tags: </span><p>{{ product.tags.join(', ') }}</p>
        </div>
      </div>

      <div class="tp-product-details-msg mb-15">
        <ul>
          <li v-if="product.hauledLine === 'encargo'">50% adelantado — 50% al recibir tu pedido</li>
          <li v-if="product.hauledLine === 'originals'">Producto original con etiqueta americana verificada</li>
          <li>Envío a todo Colombia</li>
          <li>Atención por WhatsApp</li>
        </ul>
      </div>
    </div>

    <!-- Modal guía de tallas (simple) -->
    <div v-if="showSizeGuide" class="hauled-size-guide-modal" @click.self="showSizeGuide = false">
      <div class="hauled-size-guide-content">
        <h4>Guía de Tallas</h4>
        <table>
          <thead><tr><th>Talla</th><th>Pecho (cm)</th><th>Cintura (cm)</th><th>Largo (cm)</th></tr></thead>
          <tbody>
            <tr><td>XS</td><td>84–88</td><td>66–70</td><td>68</td></tr>
            <tr><td>S</td><td>88–93</td><td>70–75</td><td>70</td></tr>
            <tr><td>M</td><td>93–99</td><td>75–80</td><td>72</td></tr>
            <tr><td>L</td><td>99–106</td><td>80–86</td><td>74</td></tr>
            <tr><td>XL</td><td>106–114</td><td>86–94</td><td>76</td></tr>
            <tr><td>XXL</td><td>114–124</td><td>94–104</td><td>78</td></tr>
          </tbody>
        </table>
        <button @click="showSizeGuide = false">Cerrar</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/pinia/useProductStore';
import { type IProduct } from '@/types/product-type';
import { useCartStore } from "@/pinia/useCartStore";
import { useCompareStore } from "@/pinia/useCompareStore";
import { useWishlistStore } from "@/pinia/useWishlistStore";
import HauledLineBadge from "@/components/hauled/HauledLineBadge.vue";

const compareStore = useCompareStore();
const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const cartStore = useCartStore();

const props = withDefaults(defineProps<{ product: IProduct; isShowBottom?: boolean }>(), {
  isShowBottom: true,
});

let textMore = ref(false);
let selectedSize = ref('');
let showSizeGuide = ref(false);

const hasColorData = computed(() =>
  props.product.imageURLs.some(item => item?.color?.name)
);
</script>

<style scoped>
.hauled-encargo-info {
  background: #f4f4f4;
  border: 1px solid #e0e0e0;
  border-left: 4px solid #4cc9f0;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 16px;
}
.hauled-encargo-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: #444;
  margin-bottom: 6px;
}
.hauled-encargo-row:last-child { margin-bottom: 0; }
.hauled-encargo-icon { font-size: 1rem; }
.hauled-text-toggle {
  color: #4cc9f0;
  cursor: pointer;
  font-weight: 600;
  margin-left: 4px;
}
.hauled-cotizar-price {
  color: #4cc9f0 !important;
  font-size: 1.4rem !important;
}
.hauled-size-guide {
  font-size: 0.75rem;
  color: #4cc9f0;
  cursor: pointer;
  font-weight: 400;
  margin-left: 10px;
  text-decoration: underline;
}
.hauled-whatsapp-btn {
  background: #25D366 !important;
  color: #fff !important;
  border-radius: 6px;
  padding: 14px;
  font-weight: 700;
  font-size: 0.95rem;
}
.hauled-size-guide-modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hauled-size-guide-content {
  background: #fff;
  border-radius: 12px;
  padding: 2rem;
  max-width: 480px;
  width: 90%;
}
.hauled-size-guide-content h4 {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  color: #111;
  margin-bottom: 1rem;
  letter-spacing: 2px;
}
.hauled-size-guide-content table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin-bottom: 1rem;
}
.hauled-size-guide-content th {
  background: #111;
  color: #fff;
  padding: 8px 12px;
  text-align: left;
}
.hauled-size-guide-content td {
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
  color: #444;
}
.hauled-size-guide-content button {
  background: #4cc9f0;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 8px 20px;
  font-weight: 700;
  cursor: pointer;
}
</style>
