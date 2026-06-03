<template>
  <div>
    <hauled-page-header title="Detalle del pedido" eyebrow="Mis pedidos" subtitle="Cuenta" :center="true" />

    <section style="padding: 60px 0; min-height: 60vh; background: #fff;">
      <div class="container">
        <div style="max-width: 640px; margin: 0 auto;">

          <!-- Cargando -->
          <div v-if="pending" style="text-align:center; padding: 40px 0;">
            <div class="hauled-spinner"></div>
          </div>

          <!-- Error -->
          <div v-else-if="error || !order" style="text-align:center; padding: 40px 0;">
            <p style="color:#e53e3e;">No se encontró el pedido.</p>
            <nuxt-link to="/cuenta/pedidos" style="color:#4CC9F0;font-weight:700;text-decoration:none;">← Volver a mis pedidos</nuxt-link>
          </div>

          <!-- Detalle -->
          <div v-else>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;flex-wrap:wrap;gap:8px;">
              <nuxt-link to="/cuenta/pedidos" style="font-size:0.82rem;color:#4CC9F0;font-weight:700;text-decoration:none;">← Mis pedidos</nuxt-link>
              <span :class="['hauled-status-badge', `status-${order.status}`]">{{ statusLabel(order.status) }}</span>
            </div>

            <!-- Referencia y fecha -->
            <div style="border:1px solid #e0e0e0;border-radius:10px;padding:24px;margin-bottom:16px;">
              <h2 style="font-family:'Raleway',sans-serif;font-weight:900;letter-spacing:2px;font-size:1.1rem;color:#111;margin:0 0 4px;">
                {{ order.reference }}
              </h2>
              <p style="font-size:0.82rem;color:#888;margin:0;">
                {{ formatDate(order.created_at) }}
              </p>
            </div>

            <!-- Productos -->
            <div style="border:1px solid #e0e0e0;border-radius:10px;padding:24px;margin-bottom:16px;">
              <h3 style="font-size:0.75rem;letter-spacing:1.5px;color:#888;text-transform:uppercase;font-weight:700;margin:0 0 16px;">Productos</h3>
              <div
                v-for="item in order.items"
                :key="item.id"
                style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #f0f0f0;font-size:0.88rem;"
              >
                <span style="color:#333;">{{ item.product_title }} <span style="color:#999;">× {{ item.quantity }}</span></span>
                <span style="font-weight:700;color:#111;">{{ formatCOP(item.price * item.quantity) }}</span>
              </div>
              <div style="display:flex;justify-content:space-between;padding-top:12px;margin-top:4px;font-weight:900;font-size:0.95rem;">
                <span>Total</span>
                <span>{{ formatCOP(order.total) }}</span>
              </div>
            </div>

            <!-- Dirección de envío -->
            <div v-if="order.address" style="border:1px solid #e0e0e0;border-radius:10px;padding:24px;margin-bottom:16px;">
              <h3 style="font-size:0.75rem;letter-spacing:1.5px;color:#888;text-transform:uppercase;font-weight:700;margin:0 0 12px;">Envío</h3>
              <p style="font-size:0.88rem;color:#333;line-height:1.6;margin:0;">
                {{ order.address.name }}<br/>
                {{ order.address.address }}, {{ order.address.city }}<br/>
                {{ order.address.phone }}
              </p>
            </div>

            <!-- Pagos -->
            <div v-if="order.payments?.length" style="border:1px solid #e0e0e0;border-radius:10px;padding:24px;">
              <h3 style="font-size:0.75rem;letter-spacing:1.5px;color:#888;text-transform:uppercase;font-weight:700;margin:0 0 12px;">Pago</h3>
              <div
                v-for="payment in order.payments"
                :key="payment.id"
                style="font-size:0.85rem;color:#555;"
              >
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span>Referencia</span>
                  <span style="font-weight:700;color:#111;font-family:monospace;">{{ payment.reference }}</span>
                </div>
                <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                  <span>Estado</span>
                  <span :class="['hauled-status-badge', `status-${payment.status}`]">{{ statusLabel(payment.status) }}</span>
                </div>
                <div v-if="payment.wompi_payment_method" style="display:flex;justify-content:space-between;">
                  <span>Método</span>
                  <span>{{ payment.wompi_payment_method }}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Pedido — HAULED' });

const route = useRoute();
const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;
const token = useCookie('auth_token');

if (!token.value) {
  await navigateTo('/login');
}

const { data: order, pending, error } = await useFetch<{
  id: number;
  reference: string;
  status: string;
  total: number;
  created_at: string;
  address: { name: string; address: string; city: string; phone: string } | null;
  items: Array<{ id: number; product_title: string; quantity: number; price: number }>;
  payments: Array<{
    id: number;
    reference: string;
    status: string;
    amount_in_cents: number;
    wompi_payment_method: string | null;
  }>;
}>(`${apiBase}/api/v1/orders/${route.params.id}`, {
  headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
});

const formatCOP = (cents: number) =>
  '$' + new Intl.NumberFormat('es-CO').format(cents / 100) + ' COP';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const statusLabel = (s: string) => ({
  pending: 'Pendiente',
  processing: 'Procesando',
  approved: 'Aprobado',
  declined: 'Rechazado',
  error: 'Error',
  refunded: 'Reembolsado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
}[s] ?? s);
</script>

<style scoped>
.hauled-status-badge {
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: inline-block;
}
.status-approved  { background: #d4edda; color: #155724; }
.status-pending, .status-processing { background: #fff3cd; color: #856404; }
.status-declined, .status-error     { background: #f8d7da; color: #721c24; }
.status-refunded  { background: #d1ecf1; color: #0c5460; }
.status-shipped   { background: #cce5ff; color: #004085; }
.status-delivered { background: #d4edda; color: #155724; }
.status-cancelled { background: #e2e3e5; color: #383d41; }
.hauled-spinner {
  width: 36px;
  height: 36px;
  border: 3px solid #e0e0e0;
  border-top-color: #4CC9F0;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
