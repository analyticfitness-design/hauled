<template>
  <div>
    <div class="hauled-admin-page-header">
      <p style="font-size:0.85rem;color:#666">{{ encargos.length }} encargos activos · Responder en 24h máximo</p>
    </div>

    <div class="hauled-encargos-grid mt-20">
      <div v-for="enc in encargos" :key="enc.id" class="hauled-encargo-card">
        <div class="hauled-encargo-card-header">
          <span :class="`hauled-status hauled-status-${enc.estado}`">{{ estadoLabel[enc.estado] }}</span>
          <span class="hauled-td-date">{{ enc.fecha }}</span>
        </div>

        <div class="hauled-encargo-card-body">
          <div class="hauled-encargo-cliente">
            <strong>{{ enc.cliente }}</strong>
            <a :href="`https://wa.me/57${enc.telefono}`" target="_blank" class="hauled-wa-link">
              💬 {{ enc.telefono }}
            </a>
          </div>

          <div class="hauled-encargo-producto">
            <span class="hauled-encargo-label">Producto pedido:</span>
            <p>{{ enc.producto }}</p>
          </div>

          <div v-if="enc.talla || enc.color" class="hauled-encargo-specs">
            <span v-if="enc.talla">Talla: <strong>{{ enc.talla }}</strong></span>
            <span v-if="enc.color">Color: <strong>{{ enc.color }}</strong></span>
          </div>

          <div v-if="enc.link" class="hauled-encargo-link">
            <span class="hauled-encargo-label">Link del producto:</span>
            <a :href="enc.link" target="_blank">{{ enc.link }}</a>
          </div>
        </div>

        <div class="hauled-encargo-card-footer">
          <div style="display:flex;gap:8px">
            <select
              :value="enc.estado"
              @change="cambiarEstado(enc.id, ($event.target as HTMLSelectElement).value)"
              class="hauled-estado-select"
            >
              <option v-for="e in estadosEncargo" :key="e.value" :value="e.value">{{ e.label }}</option>
            </select>
          </div>
          <div style="display:flex;gap:8px">
            <a
              :href="`https://wa.me/57${enc.telefono}?text=Hola%20${enc.cliente}%2C%20ya%20tengo%20la%20cotizaci%C3%B3n%20de%20tu%20encargo`"
              target="_blank"
              class="hauled-wa-btn-sm"
            >
              💬 Cotizar
            </a>
            <a
              :href="`https://wa.me/57${enc.telefono}?text=Hola%20${enc.cliente}%2C%20tu%20encargo%20llegó`"
              target="_blank"
              class="hauled-wa-btn-arrived"
            >
              ✅ Llegó
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' });

const estadoLabel: Record<string, string> = {
  nuevo: 'Nuevo',
  cotizando: 'Cotizando',
  adelanto_recibido: 'Adelanto recibido',
  comprando_usa: 'Comprando en USA',
  en_transito: 'En tránsito',
  entregado: 'Entregado',
};

const estadosEncargo = [
  { value: 'nuevo', label: 'Nuevo' },
  { value: 'cotizando', label: 'Cotizando' },
  { value: 'adelanto_recibido', label: 'Adelanto recibido' },
  { value: 'comprando_usa', label: 'Comprando en USA' },
  { value: 'en_transito', label: 'En tránsito' },
  { value: 'entregado', label: 'Entregado' },
];

const encargos = ref([
  { id: 1, cliente: 'Laura Ruiz', telefono: '3157654321', producto: 'Air Jordan 1 Retro High OG "Chicago"', talla: 'US 9', color: 'Chicago Red/White', link: '', estado: 'nuevo', fecha: '04 Abr 2026' },
  { id: 2, cliente: 'Andrés Mora', telefono: '3109876543', producto: 'Supreme Box Logo Tee FW25', talla: 'M', color: 'Negro', link: '', estado: 'cotizando', fecha: '03 Abr 2026' },
  { id: 3, cliente: 'Valeria Díaz', telefono: '3201112233', producto: 'Nike SNKRS Dunk Low Panda W', talla: 'US 7W', color: 'Blanco/Negro', link: 'https://snkrs.com/...', estado: 'adelanto_recibido', fecha: '02 Abr 2026' },
  { id: 4, cliente: 'Sebastián Torres', telefono: '3005554433', producto: 'Gap Essential Hoodie Pack x3', talla: 'M/L/XL', color: 'Surtidos', link: '', estado: 'comprando_usa', fecha: '01 Abr 2026' },
]);

const cambiarEstado = (id: number, estado: string) => {
  const e = encargos.value.find(e => e.id === id);
  if (e) e.estado = estado;
};
</script>

<style scoped>
.mt-20 { margin-top: 20px; }
.hauled-admin-page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.hauled-encargos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 16px;
}
.hauled-encargo-card {
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  overflow: hidden;
  border-top: 3px solid #4cc9f0;
}
.hauled-encargo-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}
.hauled-encargo-card-body { padding: 16px; }
.hauled-encargo-cliente {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
.hauled-encargo-cliente strong { font-size: 0.95rem; color: #111; }
.hauled-wa-link { font-size: 0.78rem; color: #25D366; font-weight: 700; text-decoration: none; }
.hauled-encargo-label { font-size: 0.7rem; color: #999; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 4px; }
.hauled-encargo-producto p { font-size: 0.88rem; color: #333; margin: 0 0 12px; }
.hauled-encargo-specs {
  display: flex;
  gap: 16px;
  font-size: 0.82rem;
  color: #555;
  margin-bottom: 12px;
}
.hauled-encargo-link a { font-size: 0.78rem; color: #4cc9f0; word-break: break-all; }
.hauled-encargo-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #f0f0f0;
  background: #fafafa;
}
.hauled-estado-select {
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  padding: 5px 8px;
  font-size: 0.78rem;
  cursor: pointer;
  background: #fff;
}
.hauled-status {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
}
.hauled-status-nuevo { background: #e3f2fd; color: #1565c0; }
.hauled-status-cotizando { background: #fff3cd; color: #856404; }
.hauled-status-adelanto_recibido { background: #d1ecf1; color: #0c5460; }
.hauled-status-comprando_usa { background: #e8f5e9; color: #2e7d32; }
.hauled-status-en_transito { background: #f3e5f5; color: #6a1b9a; }
.hauled-status-entregado { background: #d4edda; color: #155724; }
.hauled-td-date { color: #999; font-size: 0.78rem; }
.hauled-wa-btn-sm {
  background: #25D366;
  color: #fff;
  padding: 5px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 700;
}
.hauled-wa-btn-arrived {
  background: #111;
  color: #fff;
  padding: 5px 12px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.78rem;
  font-weight: 700;
}
</style>
