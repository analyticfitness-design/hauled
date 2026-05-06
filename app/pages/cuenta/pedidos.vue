<template>
  <div>
    <hauled-page-header title="Mis pedidos" eyebrow="Historial" subtitle="Cuenta" :center="true" />

    <section style="padding: 60px 0; min-height: 60vh; background: #fff;">
      <div class="container">
        <div style="max-width: 800px; margin: 0 auto;">

          <!-- Cargando -->
          <div v-if="pending" style="text-align:center; padding: 40px 0;">
            <div class="hauled-spinner"></div>
            <p style="color: #888; margin-top: 12px;">Cargando pedidos...</p>
          </div>

          <!-- Error -->
          <div v-else-if="error" style="text-align:center; padding: 40px 0;">
            <p style="color:#e53e3e;">No se pudo cargar el historial. Inicia sesión para ver tus pedidos.</p>
            <nuxt-link to="/login" style="background:#111;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:700;display:inline-block;margin-top:16px;">Iniciar sesión</nuxt-link>
          </div>

          <!-- Sin pedidos -->
          <div v-else-if="!orders?.data?.length" style="text-align:center; padding: 40px 0;">
            <p style="color:#888; font-size:1.1rem;">Aún no tienes pedidos.</p>
            <nuxt-link to="/shop" style="background:#111;color:#fff;padding:10px 24px;border-radius:6px;text-decoration:none;font-weight:700;display:inline-block;margin-top:16px;">Ir a la tienda</nuxt-link>
          </div>

          <!-- Lista de pedidos -->
          <div v-else>
            <div
              v-for="order in orders.data"
              :key="order.id"
              style="border:1px solid #e0e0e0;border-radius:10px;padding:20px 24px;margin-bottom:16px;background:#fafafa;"
            >
              <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
                <div>
                  <div style="font-family:'Raleway',sans-serif;font-weight:900;font-size:1rem;color:#111;letter-spacing:1px;">
                    {{ order.reference }}
                  </div>
                  <div style="font-size:0.8rem;color:#888;margin-top:2px;">
                    {{ formatDate(order.created_at) }}
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <span :class="['hauled-status-badge', `status-${order.status}`]">
                    {{ statusLabel(order.status) }}
                  </span>
                  <span style="font-weight:700;color:#111;font-size:0.95rem;">
                    {{ formatCOP(order.total) }}
                  </span>
                </div>
              </div>

              <!-- Items -->
              <div style="margin-top:12px;border-top:1px solid #ebebeb;padding-top:12px;">
                <div
                  v-for="item in order.items"
                  :key="item.id"
                  style="font-size:0.85rem;color:#555;line-height:1.6;"
                >
                  {{ item.product_title }} × {{ item.quantity }}
                </div>
              </div>

              <div style="margin-top:12px;text-align:right;">
                <nuxt-link
                  :to="`/cuenta/pedidos/${order.id}`"
                  style="font-size:0.82rem;color:#4cc9f0;font-weight:700;text-decoration:none;"
                >
                  Ver detalle →
                </nuxt-link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({ title: 'Mis pedidos — HAULED' });

const config = useRuntimeConfig();
const apiBase = config.public.apiBase as string;
const token = useCookie('auth_token');

if (!token.value) {
  await navigateTo('/login');
}

const { data: orders, pending, error } = await useFetch<{
  data: Array<{
    id: number;
    reference: string;
    status: string;
    total: number;
    created_at: string;
    items: Array<{ id: number; product_title: string; quantity: number }>;
  }>;
}>(`${apiBase}/api/v1/orders`, {
  headers: token.value ? { Authorization: `Bearer ${token.value}` } : {},
});

const formatCOP = (cents: number) =>
  '$' + new Intl.NumberFormat('es-CO').format(cents / 100) + ' COP';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });

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
  border-top-color: #4cc9f0;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
