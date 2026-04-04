<template>
  <div>
    <!-- Header acciones -->
    <div class="hauled-admin-page-header">
      <div>
        <p style="font-size:0.85rem;color:#666">{{ productos.length }} productos en catálogo</p>
      </div>
      <button class="hauled-btn-primary">+ Agregar producto</button>
    </div>

    <!-- Tabla de productos -->
    <div class="hauled-admin-card mt-20">
      <table class="hauled-admin-table">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Línea</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in productos" :key="p.id">
            <td>
              <div style="display:flex;gap:10px;align-items:center">
                <div class="hauled-product-thumb">{{ p.emoji }}</div>
                <div>
                  <div style="font-weight:600;color:#111;font-size:0.88rem">{{ p.title }}</div>
                  <div style="font-size:0.75rem;color:#aaa">SKU: {{ p.sku }}</div>
                </div>
              </div>
            </td>
            <td>
              <span :class="`hauled-line-pill hauled-line-${p.hauledLine}`">
                {{ lineLabel[p.hauledLine] }}
              </span>
            </td>
            <td style="font-size:0.83rem;color:#555">{{ p.categoria }}</td>
            <td style="font-weight:700">{{ p.hauledLine === 'encargo' ? 'Variable' : formatCOP(p.precio) }}</td>
            <td>
              <span :class="p.stock <= 3 ? 'hauled-stock-low' : 'hauled-stock-ok'">
                {{ p.hauledLine === 'encargo' ? '∞' : p.stock }}
              </span>
            </td>
            <td>
              <span :class="`hauled-status hauled-status-${p.activo ? 'confirmado' : 'cancelado'}`">
                {{ p.activo ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td>
              <div style="display:flex;gap:6px">
                <button class="hauled-btn-icon">✏️</button>
                <button class="hauled-btn-icon" @click="toggleActivo(p.id)">{{ p.activo ? '👁' : '🚫' }}</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

const lineLabel: Record<string, string> = {
  originals: '🇺🇸 Originals',
  basics: 'Basics',
  encargo: '📦 Encargo',
};

const productos = ref([
  { id: 'hauled-001', title: 'Nike Essentials Tee', sku: 'HO-NK-TEE-001', hauledLine: 'originals', categoria: 'Camisetas', precio: 180000, stock: 4, activo: true, emoji: '👕' },
  { id: 'hauled-002', title: 'Gap Logo Hoodie', sku: 'HO-GAP-HD-001', hauledLine: 'originals', categoria: 'Hoodies', precio: 250000, stock: 3, activo: true, emoji: '🧥' },
  { id: 'hauled-003', title: 'Tommy Hilfiger Polo', sku: 'HO-TH-POLO-001', hauledLine: 'originals', categoria: 'Camisetas', precio: 220000, stock: 5, activo: true, emoji: '👔' },
  { id: 'hauled-004', title: 'HAULED Oversize Tee', sku: 'HB-OS-BLK-001', hauledLine: 'basics', categoria: 'Camisetas', precio: 75000, stock: 50, activo: true, emoji: '👕' },
  { id: 'hauled-005', title: 'HAULED Essential Hoodie', sku: 'HB-HD-GRY-001', hauledLine: 'basics', categoria: 'Hoodies', precio: 120000, stock: 30, activo: true, emoji: '🧥' },
  { id: 'hauled-006', title: 'HAULED Cargo Jogger', sku: 'HB-JGR-BLK-001', hauledLine: 'basics', categoria: 'Pantalones', precio: 95000, stock: 25, activo: true, emoji: '👖' },
  { id: 'hauled-007', title: 'Nike SNKRS Encargo', sku: 'HE-NK-SNKRS-001', hauledLine: 'encargo', categoria: 'Accesorios', precio: 0, stock: 999, activo: true, emoji: '👟' },
  { id: 'hauled-008', title: 'Supreme Encargo', sku: 'HE-SP-001', hauledLine: 'encargo', categoria: 'Camisetas', precio: 0, stock: 999, activo: true, emoji: '🔴' },
  { id: 'hauled-009', title: 'Air Jordan Encargo', sku: 'HE-JORDAN-001', hauledLine: 'encargo', categoria: 'Accesorios', precio: 0, stock: 999, activo: true, emoji: '👟' },
  { id: 'hauled-010', title: 'Encargo Personalizado', sku: 'HE-CUSTOM-001', hauledLine: 'encargo', categoria: 'Varios', precio: 0, stock: 999, activo: true, emoji: '✈️' },
]);

const toggleActivo = (id: string) => {
  const p = productos.value.find(p => p.id === id);
  if (p) p.activo = !p.activo;
};

const formatCOP = (val: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(val);
</script>

<style scoped>
.mt-20 { margin-top: 20px; }
.hauled-admin-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hauled-btn-primary {
  background: #111;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 1px;
}
.hauled-btn-primary:hover { background: #4cc9f0; }
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
}
.hauled-product-thumb {
  width: 36px;
  height: 36px;
  background: #f4f4f4;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
}
.hauled-line-pill {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 700;
}
.hauled-line-originals { background: #0d2233; color: #4cc9f0; }
.hauled-line-basics { background: #f4f4f4; color: #444; border: 1px solid #e0e0e0; }
.hauled-line-encargo { background: #111; color: #fff; }
.hauled-stock-ok { color: #2dc653; font-weight: 700; }
.hauled-stock-low { color: #e63b2e; font-weight: 700; }
.hauled-status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
}
.hauled-status-confirmado { background: #d4edda; color: #155724; }
.hauled-status-cancelado { background: #f8d7da; color: #721c24; }
.hauled-btn-icon {
  background: #f4f4f4;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  font-size: 0.85rem;
}
.hauled-btn-icon:hover { background: #e0e0e0; }
</style>
