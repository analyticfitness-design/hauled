<template>
  <div class="hk-scope">
    <section class="hk-pd">
      <!-- breadcrumb -->
      <nav class="hk-bc hk-bc--dark" aria-label="Ruta de navegación">
        <NuxtLink to="/">Inicio</NuxtLink>
        <span class="hk-bc-sep" aria-hidden="true">/</span>
        <NuxtLink to="/shop">Catálogo</NuxtLink>
        <span class="hk-bc-sep" aria-hidden="true">/</span>
        <span class="hk-bc-cur">{{ product.title }}</span>
      </nav>

      <!-- 2-column grid -->
      <div class="hk-pd-grid">
        <!-- ── left: gallery ──────────────────────────── -->
        <div class="hk-pd-gallery">
          <div class="hk-pd-main">
            <img
              :src="activeImg"
              :alt="product.title"
              width="600"
              height="800"
            />
          </div>
          <!-- thumbnails if multiple images -->
          <div
            v-if="hasThumbs"
            class="hk-pd-thumbs"
            role="list"
            aria-label="Imágenes del producto"
          >
            <button
              v-for="(item, i) in product.imageURLs"
              :key="i"
              type="button"
              role="listitem"
              :class="['hk-pd-thumb', { 'is-active': activeImg === item.img }]"
              :aria-label="`Ver imagen ${i + 1}`"
              @click="activeImg = item.img"
            >
              <img :src="item.img" :alt="`Vista ${i + 1} de ${product.title}`" loading="lazy" />
            </button>
          </div>
        </div>

        <!-- ── right: info ───────────────────────────── -->
        <div class="hk-pd-info">
          <!-- badges -->
          <div class="hk-pd-badges">
            <span
              v-if="lineBadge"
              class="hk-badge"
              :style="{ background: lineBadge.bg, color: lineBadge.color }"
            >
              {{ lineBadge.label }}
            </span>
            <span
              v-if="product.status === 'New'"
              class="hk-badge"
              style="background: var(--h-blue); color: #111;"
            >
              Nuevo
            </span>
          </div>

          <!-- category -->
          <div v-if="catLabel" class="hk-pd-cat">{{ catLabel }}</div>

          <!-- title -->
          <h1 class="hk-pd-title">{{ product.title }}</h1>

          <!-- price -->
          <div v-if="isEncargo" class="hk-pd-quote">
            Precio por cotización
            <span v-if="product.deliveryDays" style="color: var(--h-blue);">
              · {{ product.deliveryDays }}
            </span>
          </div>
          <div v-else class="hk-pd-price">
            {{ fmtCop(product.price) }}
            <span v-if="product.priceUsd" class="hk-pd-usd">
              USD ${{ product.priceUsd }}
            </span>
          </div>

          <!-- description -->
          <p v-if="product.description" class="hk-pd-desc">
            {{ descTruncated }}
            <button
              v-if="product.description.length > 160"
              type="button"
              class="hk-pd-read-more"
              :aria-expanded="showFullDesc"
              @click="showFullDesc = !showFullDesc"
            >
              {{ showFullDesc ? 'Ver menos' : 'Ver más' }}
            </button>
          </p>

          <!-- sizes — only for non-encargo -->
          <template v-if="!isEncargo">
            <div class="hk-pd-row-label" id="size-label">Talla</div>
            <div
              class="hk-sizes"
              role="group"
              aria-labelledby="size-label"
            >
              <button
                v-for="s in effectiveSizes"
                :key="s"
                type="button"
                :class="['hk-size', { 'is-active': selectedSize === s }]"
                :aria-pressed="selectedSize === s"
                @click="selectedSize = s"
              >
                {{ s }}
              </button>
            </div>

            <!-- quantity -->
            <div class="hk-pd-row-label" id="qty-label">Cantidad</div>
            <div class="hk-qty" role="group" aria-labelledby="qty-label">
              <button
                type="button"
                aria-label="Reducir cantidad"
                @click="qty = Math.max(1, qty - 1)"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <path d="M5 12h14"/>
                </svg>
              </button>
              <span aria-live="polite">{{ qty }}</span>
              <button
                type="button"
                aria-label="Aumentar cantidad"
                @click="qty++"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"
                  aria-hidden="true">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
              </button>
            </div>
          </template>

          <!-- CTA actions -->
          <div class="hk-pd-actions">
            <!-- encargo: WhatsApp -->
            <a
              v-if="isEncargo"
              :href="waEncargoLink"
              target="_blank"
              rel="noopener noreferrer"
              class="hk-btn-wa"
              style="flex: 1; text-decoration: none;"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"
                stroke="none" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
              </svg>
              Solicitar encargo
            </a>

            <!-- stock: add to cart -->
            <button
              v-else
              type="button"
              class="hk-btn-primary"
              style="flex: 1;"
              @click="handleAddToCart"
            >
              Agregar al carrito
            </button>

            <!-- wishlist -->
            <button
              type="button"
              class="hk-icon-btn hk-pd-wish"
              aria-label="Agregar a favoritos"
              @click="wishlistStore.add_wishlist_product(product)"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path d="M19 14c1.5-1.5 3-3.3 3-5.5A3.5 3.5 0 0 0 12 6 3.5 3.5 0 0 0 2 8.5C2 10.7 3.5 12.5 5 14l7 7z"/>
              </svg>
            </button>
          </div>

          <!-- trust signals -->
          <div class="hk-pd-trust" aria-label="Garantías">
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              Autenticidad garantizada
            </span>
            <span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                aria-hidden="true">
                <path d="M20 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
              Envío a todo Colombia
            </span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-type'
import { useCartStore } from '@/pinia/useCartStore'
import { useWishlistStore } from '@/pinia/useWishlistStore'
import { toast } from 'vue3-toastify'

const props = defineProps<{ product: IProduct }>()

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const { link: waLink } = useWhatsApp()

// ── Gallery ──────────────────────────────────────────────────────────────────
const activeImg = ref(props.product.img || '/img/placeholder.jpg')
watch(() => props.product.img, (v) => { if (v) activeImg.value = v })

const hasThumbs = computed(
  () => props.product.imageURLs && props.product.imageURLs.length > 1
)

// ── Line badge ────────────────────────────────────────────────────────────────
const LINE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  originals: { label: 'USA',     bg: 'var(--h-navy)', color: 'var(--h-blue)' },
  basics:    { label: 'HAULED',  bg: 'rgba(0,0,0,.65)', color: '#fff' },
  encargo:   { label: 'Encargo', bg: '#111', color: '#fff' },
}
const lineBadge = computed(() =>
  LINE_BADGE[props.product.hauledLine ?? 'originals'] ?? null
)
const isEncargo = computed(() => props.product.hauledLine === 'encargo')
const catLabel  = computed(() => props.product.parent || props.product.category?.name || '')

// ── Price formatter ────────────────────────────────────────────────────────────
const fmtCop = (n: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(n)

// ── Description truncation ─────────────────────────────────────────────────────
const showFullDesc = ref(false)
const descTruncated = computed(() =>
  !showFullDesc.value && props.product.description?.length > 160
    ? props.product.description.substring(0, 160) + '…'
    : props.product.description ?? ''
)

// ── Sizes ──────────────────────────────────────────────────────────────────────
const DEFAULT_SIZES = ['S', 'M', 'L', 'XL']
const effectiveSizes = computed<string[]>(() =>
  props.product.sizes && props.product.sizes.length > 0
    ? props.product.sizes
    : DEFAULT_SIZES
)
const selectedSize = ref<string>('')

// ── Quantity ───────────────────────────────────────────────────────────────────
const qty = ref(1)

// ── Add to cart ────────────────────────────────────────────────────────────────
function handleAddToCart() {
  if (effectiveSizes.value.length > 0 && !selectedSize.value) {
    toast.error('Elige una talla antes de agregar al carrito')
    return
  }
  // Sync store quantity before adding
  for (let i = cartStore.orderQuantity; i < qty.value; i++) cartStore.increment()
  for (let i = cartStore.orderQuantity; i > qty.value; i--) cartStore.decrement()
  cartStore.addCartProduct(props.product, selectedSize.value || undefined)
}

// ── WhatsApp encargo ────────────────────────────────────────────────────────────
const waEncargoLink = computed(() =>
  waLink('encargo_inquiry', { description: props.product.title })
)
</script>

<style scoped>
/* thumbnail strip */
.hk-pd-thumbs {
  display: flex;
  gap: 8px;
  margin-top: 10px;
  flex-wrap: wrap;
}
.hk-pd-thumb {
  width: 64px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: var(--h-radius);
  overflow: hidden;
  cursor: pointer;
  padding: 0;
  background: #e4e4e4;
  transition: border-color var(--h-dur-fast);
}
.hk-pd-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hk-pd-thumb.is-active,
.hk-pd-thumb:hover {
  border-color: var(--h-blue);
}

/* "ver más" inline button */
.hk-pd-read-more {
  font-family: var(--h-ff-body);
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--h-blue);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  margin-left: 4px;
}
</style>
