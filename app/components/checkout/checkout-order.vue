<template>
  <div class="tp-checkout-place white-bg">
    <h3 class="tp-checkout-place-title" style="font-family:'Raleway',sans-serif;font-weight:900;letter-spacing:2px">
      Tu Pedido
    </h3>

    <div class="tp-order-info-list">
      <ul>
        <!-- Header -->
        <li class="tp-order-info-list-header">
          <h4>Producto</h4>
          <h4>Total</h4>
        </li>

        <!-- Items de stock -->
        <li
          v-for="item in stockItems"
          :key="item.id"
          class="tp-order-info-list-desc"
        >
          <p>{{ item.title }} <span>x {{ item.orderQuantity }}</span></p>
          <span>{{ formatPrice(item.price * (item.orderQuantity ?? 1)) }}</span>
        </li>

        <!-- Items de encargo (separados) -->
        <li v-if="encargoItems.length > 0" class="tp-order-info-list-desc hauled-encargo-separator">
          <p style="color:#4cc9f0;font-weight:700">📦 Encargos (cotización pendiente)</p>
          <span>—</span>
        </li>
        <li
          v-for="item in encargoItems"
          :key="item.id"
          class="tp-order-info-list-desc"
        >
          <p style="color:#666">{{ item.title }}</p>
          <span style="color:#4cc9f0;font-size:0.8rem">Cotizar</span>
        </li>

        <!-- Subtotal -->
        <li class="tp-order-info-list-subtotal">
          <span>Subtotal</span>
          <span>{{ formatPrice(cartStore.totalPriceQuantity.total) }}</span>
        </li>

        <!-- Envío -->
        <li class="tp-order-info-list-shipping">
          <span>Envío</span>
          <div class="tp-order-info-list-shipping-item d-flex flex-column align-items-end">
            <span>
              <input id="envio_bga" type="radio" name="shipping" />
              <label @click="handleShippingCost(0)" for="envio_bga">Bucaramanga: <span>Gratis</span></label>
            </span>
            <span>
              <input id="envio_nac" type="radio" name="shipping" />
              <label @click="handleShippingCost(22000)" for="envio_nac">Nacional: <span>{{ formatPrice(22000) }}</span></label>
            </span>
            <span>
              <input id="envio_free" type="radio" name="shipping" />
              <label @click="handleShippingCost(0)" for="envio_free">Nacional gratis (+$300.000)</label>
            </span>
          </div>
        </li>

        <!-- Total -->
        <li class="tp-order-info-list-total">
          <span>Total</span>
          <span>{{ formatPrice(cartStore.totalPriceQuantity.total + shipCost) }}</span>
        </li>
      </ul>
    </div>

    <!-- Métodos de pago -->
    <div class="tp-checkout-payment">
      <div class="tp-checkout-payment-item">
        <input type="radio" id="wompi" name="payment" checked />
        <label @click="handlePayment('wompi')" for="wompi">
          Wompi — PSE, Tarjeta, Nequi, Bancolombia
        </label>
        <div v-if="payment_name === 'wompi'" class="tp-checkout-payment-desc">
          <p>Pago 100% seguro. Procesado por Wompi (Bancolombia). Acepta tarjetas débito/crédito, PSE, Nequi y Bancolombia a la mano.</p>
        </div>
      </div>
      <div class="tp-checkout-payment-item">
        <input type="radio" id="transferencia" name="payment" />
        <label @click="handlePayment('transferencia')" for="transferencia">
          Transferencia bancaria / Nequi
        </label>
        <div v-if="payment_name === 'transferencia'" class="tp-checkout-payment-desc">
          <p>Transfiere al número Nequi o cuenta bancaria HAULED. Envíanos el comprobante por WhatsApp para confirmar tu pedido.</p>
        </div>
      </div>
    </div>

    <!-- Aviso encargos -->
    <div v-if="encargoItems.length > 0" class="hauled-encargo-checkout-notice">
      <p>📦 Tus encargos serán coordinados por WhatsApp en las próximas 24h.</p>
    </div>

    <!-- Términos -->
    <div class="tp-checkout-agree">
      <div class="tp-checkout-option">
        <input id="terminos" type="checkbox" v-model="termsAccepted" />
        <label for="terminos">Acepto los términos y condiciones de HAULED.</label>
      </div>
    </div>

    <!-- Botón -->
    <div class="tp-checkout-btn-wrapper">
      <button
        type="button"
        class="tp-checkout-btn w-100"
        :disabled="!termsAccepted || processing"
        @click="handleCheckout"
        style="font-family:'Raleway',sans-serif;font-weight:900;letter-spacing:2px"
      >
        <span v-if="processing">Procesando...</span>
        <span v-else>Confirmar pedido</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/pinia/useCartStore';
import { toast } from 'vue3-toastify';

const props = defineProps<{
  billingRef?: { form: any } | null;
}>();

const cartStore = useCartStore();
const config = useRuntimeConfig();

let shipCost = ref<number>(0);
let payment_name = ref<string>('wompi');
let termsAccepted = ref<boolean>(false);
let processing = ref<boolean>(false);

const stockItems = computed(() =>
  cartStore.cart_products.filter(p => p.hauledLine !== 'encargo')
);
const encargoItems = computed(() =>
  cartStore.cart_products.filter(p => p.hauledLine === 'encargo')
);

const handleShippingCost = (value: number) => { shipCost.value = value; };
const handlePayment = (value: string) => { payment_name.value = value; };

const handleCheckout = async () => {
  if (!termsAccepted.value || processing.value) return;

  const billing = props.billingRef?.form;
  if (!billing) {
    toast.error('No se pudieron leer los datos de envío');
    return;
  }

  // Validación mínima
  const required: Array<[string, string]> = [
    ['nombre', billing.nombre],
    ['apellido', billing.apellido],
    ['ciudad', billing.ciudad],
    ['direccion', billing.direccion],
    ['telefono', billing.telefono],
    ['email', billing.email],
  ];
  const missing = required.filter(([_, v]) => !v || String(v).trim() === '');
  if (missing.length > 0) {
    toast.error('Completa todos los datos de envío marcados con *');
    return;
  }

  if (stockItems.value.length === 0 && encargoItems.value.length === 0) {
    toast.error('El carrito está vacío');
    return;
  }

  if (stockItems.value.length === 0) {
    // Solo encargos: no hay pago Wompi, va por WhatsApp
    toast.info('Tus encargos serán coordinados por WhatsApp en las próximas 24h.');
    return;
  }

  processing.value = true;

  try {
    const apiBase = (config.public.apiBase as string) ?? 'http://localhost:8000';
    const token = useCookie('auth_token').value;

    const orderPayload = {
      items: stockItems.value.map(item => ({
        product_slug: item.slug,
        quantity: item.orderQuantity ?? 1,
        size: item.sizes?.[0] ?? null,
      })),
      address: {
        name: `${billing.nombre} ${billing.apellido}`.trim(),
        phone: billing.telefono,
        city: billing.ciudad,
        address: [billing.direccion, billing.direccion2].filter(Boolean).join(' — '),
      },
    };

    const res = await $fetch<{ wompi_redirect: string; order: { reference: string } }>(
      `${apiBase}/api/v1/orders`,
      {
        method: 'POST',
        body: orderPayload,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      }
    );

    if (res?.wompi_redirect) {
      cartStore.cart_products = [];
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('cart_products', '[]');
      }
      window.location.href = res.wompi_redirect;
    } else {
      toast.error('No se pudo iniciar el pago. Intenta de nuevo.');
    }
  } catch (e: any) {
    const msg = e?.data?.message ?? 'Error al procesar el pedido';
    toast.error(msg);
  } finally {
    processing.value = false;
  }
};
</script>

<style scoped>
.hauled-encargo-separator { border-top: 1px dashed #4cc9f0; }
.hauled-encargo-checkout-notice {
  background: #f4f4f4;
  border-left: 4px solid #4cc9f0;
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 0.82rem;
  color: #444;
  margin: 12px 0;
}
</style>
