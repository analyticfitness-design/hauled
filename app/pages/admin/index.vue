<template>
  <div>
    <!-- Stats row -->
    <div class="hauled-admin-stats">
      <div class="hauled-stat-card">
        <div class="hauled-stat-icon">📦</div>
        <div class="hauled-stat-body">
          <div class="hauled-stat-num">{{ stats.pedidosHoy }}</div>
          <div class="hauled-stat-label">Pedidos hoy</div>
        </div>
      </div>
      <div class="hauled-stat-card">
        <div class="hauled-stat-icon">💰</div>
        <div class="hauled-stat-body">
          <div class="hauled-stat-num">{{ formatCOP(stats.ingresosMes) }}</div>
          <div class="hauled-stat-label">Ingresos este mes</div>
        </div>
      </div>
      <div class="hauled-stat-card">
        <div class="hauled-stat-icon">✈️</div>
        <div class="hauled-stat-body">
          <div class="hauled-stat-num">{{ stats.encargosActivos }}</div>
          <div class="hauled-stat-label">Encargos activos</div>
        </div>
      </div>
      <div class="hauled-stat-card">
        <div class="hauled-stat-icon">👕</div>
        <div class="hauled-stat-body">
          <div class="hauled-stat-num">{{ stats.stockBajo }}</div>
          <div class="hauled-stat-label">Stock bajo (alerta)</div>
        </div>
      </div>
    </div>

    <!-- Pedidos recientes -->
    <div class="hauled-admin-card mt-32">
      <div class="hauled-admin-card-header">
        <h3>Pedidos recientes</h3>
        <nuxt-link to="/admin/pedidos">Ver todos →</nuxt-link>
      </div>
      <table class="hauled-admin-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Cliente</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pedido in pedidosRecientes" :key="pedido.id">
            <td class="hauled-td-id">#{{ pedido.id }}</td>
            <td>{{ pedido.cliente }}</td>
            <td>{{ pedido.productos }}</td>
            <td>{{ formatCOP(pedido.total) }}</td>
            <td>
              <span :class="`hauled-status hauled-status-${pedido.estado}`">
                {{ estadoLabel[pedido.estado] }}
              </span>
            </td>
            <td class="hauled-td-date">{{ pedido.fecha }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Encargos pendientes -->
    <div class="hauled-admin-card mt-24">
      <div class="hauled-admin-card-header">
        <h3>Encargos pendientes de cotización</h3>
        <nuxt-link to="/admin/encargos">Ver todos →</nuxt-link>
      </div>
      <div class="hauled-encargos-list">
        <div v-for="enc in encargosPendientes" :key="enc.id" class="hauled-encargo-row-admin">
          <div>
            <strong>{{ enc.cliente }}</strong>
            <span class="hauled-td-date"> · {{ enc.producto }}</span>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <span class="hauled-status hauled-status-pendiente">Pendiente cotización</span>
            <a :href="`https://wa.me/57${enc.telefono}`" target="_blank" class="hauled-wa-btn-sm">💬 WhatsApp</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

const stats = reactive({
  pedidosHoy: 3,
  ingresosMes: 1850000,
  encargosActivos: 5,
  stockBajo: 2,
});

const estadoLabel: Record<string, string> = {
  pendiente: 'Pendiente',
  confirmado: 'Confirmado',
  enviado: 'Enviado',
  entregado: 'Entregado',
  cancelado: 'Cancelado',
};

const pedidosRecientes = [
  { id: '001', cliente: 'María García', productos: 'Nike Essentials Tee x2', total: 360000, estado: 'confirmado', fecha: '04 Abr 2026' },
  { id: '002', cliente: 'Juan Pérez', productos: 'HAULED Hoodie Grey', total: 120000, estado: 'enviado', fecha: '04 Abr 2026' },
  { id: '003', cliente: 'Laura Ruiz', productos: 'Air Jordan Encargo', total: 480000, estado: 'pendiente', fecha: '03 Abr 2026' },
  { id: '004', cliente: 'Carlos López', productos: 'Gap Hoodie + Jogger', total: 345000, estado: 'entregado', fecha: '02 Abr 2026' },
];

const encargosPendientes = [
  { id: 1, cliente: 'Laura Ruiz', producto: 'Air Jordan US 9', telefono: '3001234567' },
  { id: 2, cliente: 'Andrés Mora', producto: 'Supreme Box Logo Tee M', telefono: '3109876543' },
  { id: 3, cliente: 'Valeria Díaz', producto: 'Nike SNKRS Dunk Low W', telefono: '3157654321' },
];

const formatCOP = (val: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
</script>

<style scoped>
.hauled-admin-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}
.hauled-stat-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  gap: 16px;
  align-items: center;
}
.hauled-stat-icon { font-size: 1.8rem; }
.hauled-stat-num {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  color: #111;
}
.hauled-stat-label { font-size: 0.78rem; color: #888; margin-top: 2px; }
.mt-32 { margin-top: 32px; }
.mt-24 { margin-top: 24px; }
.hauled-admin-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}
.hauled-admin-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e0e0e0;
}
.hauled-admin-card-header h3 {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.95rem;
  color: #111;
  letter-spacing: 1px;
}
.hauled-admin-card-header a { font-size: 0.8rem; color: #4cc9f0; text-decoration: none; font-weight: 600; }
.hauled-admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.hauled-admin-table th {
  background: #f8f8f8;
  padding: 10px 16px;
  text-align: left;
  font-size: 0.72rem;
  letter-spacing: 1px;
  color: #888;
  text-transform: uppercase;
}
.hauled-admin-table td {
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  color: #333;
}
.hauled-td-id { font-weight: 700; color: #111; }
.hauled-td-date { color: #999; font-size: 0.8rem; }
.hauled-status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
}
.hauled-status-pendiente { background: #fff3cd; color: #856404; }
.hauled-status-confirmado { background: #d1ecf1; color: #0c5460; }
.hauled-status-enviado { background: #d4edda; color: #155724; }
.hauled-status-entregado { background: #e8f5e9; color: #2e7d32; }
.hauled-status-cancelado { background: #f8d7da; color: #721c24; }
.hauled-encargos-list { padding: 8px 0; }
.hauled-encargo-row-admin {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-top: 1px solid #f0f0f0;
  font-size: 0.85rem;
}
.hauled-wa-btn-sm {
  background: #25D366;
  color: #fff;
  padding: 4px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 700;
}
</style>
