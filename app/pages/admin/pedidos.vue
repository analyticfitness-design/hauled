<template>
  <div>
    <!-- Filtros -->
    <div class="hauled-admin-filters">
      <button
        v-for="estado in estados"
        :key="estado.value"
        :class="['hauled-filter-btn', filtroActivo === estado.value ? 'active' : '']"
        @click="filtroActivo = estado.value"
      >
        {{ estado.label }}
        <span class="hauled-filter-count">{{ contarPorEstado(estado.value) }}</span>
      </button>
    </div>

    <!-- Tabla -->
    <div class="hauled-admin-card mt-20">
      <table class="hauled-admin-table">
        <thead>
          <tr>
            <th>#Pedido</th>
            <th>Cliente</th>
            <th>Teléfono</th>
            <th>Productos</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in pedidosFiltrados" :key="p.id">
            <td class="hauled-td-id">#{{ p.id }}</td>
            <td>{{ p.cliente }}</td>
            <td>
              <a :href="`https://wa.me/57${p.telefono}`" target="_blank" style="color:#25D366;font-weight:600;font-size:0.8rem">
                {{ p.telefono }}
              </a>
            </td>
            <td style="font-size:0.82rem;max-width:180px">{{ p.productos }}</td>
            <td style="font-weight:700">{{ formatCOP(p.total) }}</td>
            <td>
              <select
                :value="p.estado"
                @change="cambiarEstado(p.id, ($event.target as HTMLSelectElement).value)"
                class="hauled-estado-select"
                :class="`hauled-select-${p.estado}`"
              >
                <option v-for="e in estados" :key="e.value" :value="e.value">{{ e.label }}</option>
              </select>
            </td>
            <td class="hauled-td-date">{{ p.fecha }}</td>
            <td>
              <a :href="`https://wa.me/57${p.telefono}?text=Hola%20${p.cliente}%2C%20tu%20pedido%20%23${p.id}%20está%20listo`" target="_blank" class="hauled-wa-btn-sm">
                💬
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

const filtroActivo = ref('todos');

const estados = [
  { value: 'todos', label: 'Todos' },
  { value: 'pendiente', label: 'Pendiente' },
  { value: 'confirmado', label: 'Confirmado' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'entregado', label: 'Entregado' },
  { value: 'cancelado', label: 'Cancelado' },
];

const pedidos = ref([
  { id: '001', cliente: 'María García', telefono: '3001234567', productos: 'Nike Essentials Tee x2', total: 360000, estado: 'confirmado', fecha: '04 Abr 2026' },
  { id: '002', cliente: 'Juan Pérez', telefono: '3112223344', productos: 'HAULED Hoodie Grey', total: 120000, estado: 'enviado', fecha: '04 Abr 2026' },
  { id: '003', cliente: 'Laura Ruiz', telefono: '3157654321', productos: 'Air Jordan Encargo', total: 480000, estado: 'pendiente', fecha: '03 Abr 2026' },
  { id: '004', cliente: 'Carlos López', telefono: '3009998877', productos: 'Gap Hoodie + Cargo Jogger', total: 345000, estado: 'entregado', fecha: '02 Abr 2026' },
  { id: '005', cliente: 'Valeria Díaz', telefono: '3201112233', productos: 'Tommy Polo Blanco', total: 220000, estado: 'pendiente', fecha: '04 Abr 2026' },
]);

const pedidosFiltrados = computed(() =>
  filtroActivo.value === 'todos'
    ? pedidos.value
    : pedidos.value.filter(p => p.estado === filtroActivo.value)
);

const contarPorEstado = (estado: string) =>
  estado === 'todos' ? pedidos.value.length : pedidos.value.filter(p => p.estado === estado).length;

const cambiarEstado = (id: string, nuevoEstado: string) => {
  const p = pedidos.value.find(p => p.id === id);
  if (p) p.estado = nuevoEstado;
};

const formatCOP = (val: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
</script>

<style scoped>
.mt-20 { margin-top: 20px; }
.hauled-admin-filters {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.hauled-filter-btn {
  padding: 7px 16px;
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  background: #fff;
  font-size: 0.82rem;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: all 0.15s;
}
.hauled-filter-btn.active {
  background: #111;
  color: #fff;
  border-color: #111;
}
.hauled-filter-count {
  background: #f0f0f0;
  color: #555;
  border-radius: 10px;
  padding: 1px 7px;
  font-size: 0.7rem;
  font-weight: 700;
}
.hauled-filter-btn.active .hauled-filter-count {
  background: #333;
  color: #fff;
}
.hauled-admin-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
}
.hauled-admin-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}
.hauled-admin-table th {
  background: #f8f8f8;
  padding: 10px 14px;
  text-align: left;
  font-size: 0.7rem;
  letter-spacing: 1px;
  color: #888;
  text-transform: uppercase;
}
.hauled-admin-table td {
  padding: 12px 14px;
  border-top: 1px solid #f0f0f0;
  color: #333;
}
.hauled-td-id { font-weight: 700; color: #111; }
.hauled-td-date { color: #999; font-size: 0.8rem; }
.hauled-estado-select {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 4px 8px;
  font-size: 0.78rem;
  cursor: pointer;
}
.hauled-wa-btn-sm {
  background: #25D366;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
}
</style>
