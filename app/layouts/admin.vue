<template>
  <div class="hauled-admin">
    <!-- Sidebar -->
    <aside class="hauled-admin-sidebar">
      <div class="hauled-admin-logo">HAULED</div>
      <div class="hauled-admin-tagline">Panel de administración</div>

      <nav class="hauled-admin-nav">
        <div class="hauled-admin-nav-section">General</div>
        <nuxt-link to="/admin" exact class="hauled-admin-nav-item">
          <span>📊</span> Dashboard
        </nuxt-link>
        <nuxt-link to="/admin/pedidos" class="hauled-admin-nav-item">
          <span>📦</span> Pedidos
        </nuxt-link>

        <div class="hauled-admin-nav-section">Catálogo</div>
        <nuxt-link to="/admin/productos" class="hauled-admin-nav-item">
          <span>👕</span> Productos
        </nuxt-link>
        <nuxt-link to="/admin/stock" class="hauled-admin-nav-item">
          <span>🏪</span> Inventario
        </nuxt-link>

        <div class="hauled-admin-nav-section">Negocio</div>
        <nuxt-link to="/admin/clientes" class="hauled-admin-nav-item">
          <span>👤</span> Clientes
        </nuxt-link>
        <nuxt-link to="/admin/encargos" class="hauled-admin-nav-item">
          <span>✈️</span> Encargos
        </nuxt-link>

        <div class="hauled-admin-nav-section">Salir</div>
        <nuxt-link to="/" class="hauled-admin-nav-item">
          <span>🏠</span> Ver tienda
        </nuxt-link>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="hauled-admin-main">
      <div class="hauled-admin-topbar">
        <div class="hauled-admin-topbar-title">{{ pageTitle }}</div>
        <div class="hauled-admin-topbar-right">
          <span class="hauled-admin-badge-live">● En vivo</span>
          <span style="font-size:0.8rem;color:#666">Admin</span>
        </div>
      </div>
      <div class="hauled-admin-content">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const titles: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/pedidos': 'Pedidos',
  '/admin/productos': 'Productos',
  '/admin/stock': 'Inventario',
  '/admin/clientes': 'Clientes',
  '/admin/encargos': 'Encargos USA',
};
const pageTitle = computed(() => titles[route.path] ?? 'Admin');
</script>

<style>
.hauled-admin {
  display: flex;
  min-height: 100vh;
  background: #f4f4f4;
  font-family: 'Inter', sans-serif;
}
.hauled-admin-sidebar {
  width: 240px;
  min-height: 100vh;
  background: #111;
  color: #fff;
  padding: 24px 0;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
}
.hauled-admin-logo {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.6rem;
  letter-spacing: 6px;
  color: #fff;
  padding: 0 24px 4px;
}
.hauled-admin-tagline {
  font-size: 0.68rem;
  color: #4cc9f0;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0 24px 24px;
  border-bottom: 1px solid #222;
  margin-bottom: 16px;
}
.hauled-admin-nav-section {
  font-size: 0.65rem;
  color: #555;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 12px 24px 6px;
}
.hauled-admin-nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 24px;
  color: #bbb;
  text-decoration: none;
  font-size: 0.88rem;
  transition: all 0.15s;
}
.hauled-admin-nav-item:hover,
.hauled-admin-nav-item.router-link-active {
  color: #fff;
  background: #1a1a1a;
  border-left: 3px solid #4cc9f0;
  padding-left: 21px;
}
.hauled-admin-main {
  margin-left: 240px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.hauled-admin-topbar {
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
}
.hauled-admin-topbar-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 1.1rem;
  color: #111;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.hauled-admin-topbar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}
.hauled-admin-badge-live {
  font-size: 0.72rem;
  color: #2dc653;
  font-weight: 700;
}
.hauled-admin-content {
  padding: 32px;
  flex: 1;
}
</style>
