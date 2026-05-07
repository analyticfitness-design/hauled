<template>
  <div class="profile__ticket">
    <div v-if="loading" class="hauled-orders-state">
      Cargando pedidos...
    </div>

    <div v-else-if="error" class="hauled-orders-state hauled-orders-error">
      {{ error }}
    </div>

    <div v-else-if="orders.length === 0" class="hauled-orders-state">
      <p class="hauled-empty-title">Aún no tienes pedidos</p>
      <p class="hauled-empty-sub">Cuando hagas tu primera compra, aparecerá aquí.</p>
      <nuxt-link to="/shop" class="tp-btn tp-btn-2 mt-20">Explorar tienda</nuxt-link>
    </div>

    <div v-else class="table-responsive">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Referencia</th>
            <th scope="col">Fecha</th>
            <th scope="col">Productos</th>
            <th scope="col">Total</th>
            <th scope="col">Estado</th>
            <th scope="col">Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.id">
            <th scope="row">#{{ order.reference }}</th>
            <td>{{ formatDate(order.created_at) }}</td>
            <td data-info="title">{{ itemsSummary(order) }}</td>
            <td>{{ formatCop(order.total) }}</td>
            <td>
              <span :class="['hauled-status-badge', `hauled-status--${order.status}`]">
                {{ statusLabel(order.status) }}
              </span>
            </td>
            <td>
              <nuxt-link :to="`/order?ref=${order.reference}`" class="tp-logout-btn">
                Ver detalle
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="lastPage > 1" class="hauled-pagination mt-30 d-flex justify-content-center gap-2">
        <button
          type="button"
          class="tp-btn tp-btn-2"
          :disabled="currentPage <= 1 || loading"
          @click="loadPage(currentPage - 1)"
        >
          ← Anterior
        </button>
        <span class="hauled-page-info">
          Página {{ currentPage }} de {{ lastPage }}
        </span>
        <button
          type="button"
          class="tp-btn tp-btn-2"
          :disabled="currentPage >= lastPage || loading"
          @click="loadPage(currentPage + 1)"
        >
          Siguiente →
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/pinia/useAuthStore';

interface OrderItem {
  id: number;
  product_title: string;
  quantity: number;
  price: number;
  size?: string | null;
}

interface OrderRow {
  id: number;
  reference: string;
  total: number;
  status: string;
  created_at: string;
  items?: OrderItem[];
}

interface OrdersResponse {
  data: OrderRow[];
  current_page: number;
  last_page: number;
  total: number;
}

const auth = useAuthStore();

const orders = ref<OrderRow[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);
const currentPage = ref(1);
const lastPage = ref(1);

const STATUS_LABELS: Record<string, string> = {
  pending: 'Pendiente',
  paid: 'Pagado',
  approved: 'Aprobado',
  declined: 'Rechazado',
  shipped: 'Enviado',
  delivered: 'Entregado',
  cancelled: 'Cancelado',
  voided: 'Anulado',
};

function statusLabel(status: string): string {
  return STATUS_LABELS[status] ?? status;
}

function formatCop(centavos: number): string {
  const cop = (centavos ?? 0) / 100;
  return cop.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  });
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function itemsSummary(order: OrderRow): string {
  const items = order.items ?? [];
  if (items.length === 0) return '—';
  const first = items[0]?.product_title ?? '';
  if (items.length === 1) return first;
  return `${first} +${items.length - 1} más`;
}

async function loadPage(page: number) {
  if (!auth.isLoggedIn) {
    error.value = 'Debes iniciar sesión para ver tus pedidos.';
    loading.value = false;
    return;
  }
  loading.value = true;
  error.value = null;
  try {
    const res = await $fetch<OrdersResponse>(`${auth.apiBase}/api/v1/orders`, {
      headers: auth.authHeaders(),
      params: { page, per_page: 10 },
    });
    orders.value = res.data ?? [];
    currentPage.value = res.current_page ?? 1;
    lastPage.value = res.last_page ?? 1;
  } catch (e: unknown) {
    const status = (e as { status?: number; statusCode?: number })?.status
      ?? (e as { statusCode?: number })?.statusCode;
    error.value = status === 401
      ? 'Tu sesión expiró. Vuelve a iniciar sesión.'
      : 'No pudimos cargar tus pedidos. Intenta de nuevo.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => loadPage(1));
</script>

<style scoped>
.hauled-orders-state {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}
.hauled-orders-error {
  color: #c00;
}
.hauled-empty-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  color: #111;
  margin-bottom: 6px;
}
.hauled-empty-sub {
  font-size: 0.9rem;
  margin-bottom: 20px;
}
.hauled-status-badge {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.hauled-status--pending { background: #fff3cd; color: #856404; }
.hauled-status--paid,
.hauled-status--approved { background: #d4edda; color: #155724; }
.hauled-status--declined,
.hauled-status--cancelled,
.hauled-status--voided { background: #f8d7da; color: #721c24; }
.hauled-status--shipped { background: #cce5ff; color: #004085; }
.hauled-status--delivered { background: #d1ecf1; color: #0c5460; }
.hauled-page-info {
  align-self: center;
  font-size: 0.9rem;
  color: #666;
}
</style>
