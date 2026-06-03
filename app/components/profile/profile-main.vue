<template>
  <div class="profile__main">
    <div class="profile__main-top pb-80">
      <div class="row align-items-center">
        <div class="col-md-6">
          <div class="profile__main-inner d-flex flex-wrap align-items-center">
            <div class="profile__main-thumb">
              <div class="hauled-avatar">{{ initials }}</div>
            </div>
            <div class="profile__main-content">
              <h4 class="profile__main-title">¡Bienvenido, {{ auth.displayName || 'tú' }}!</h4>
              <p v-if="auth.user?.email" class="hauled-email">{{ auth.user.email }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="profile__main-logout text-sm-end">
            <button type="button" class="tp-logout-btn" @click="onLogout">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="profile__main-info">
      <div class="row gx-3">
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-order">{{ ordersCount }}</span>
                <svg-orders/>
              </span>
            </div>
            <h4 class="profile__main-info-title">Pedidos</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-wishlist">{{ wishlistCount }}</span>
                <svg-wishlist-2/>
              </span>
            </div>
            <h4 class="profile__main-info-title">Lista de deseos</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-wishlist">{{ encargosCount }}</span>
                <svg-gift-box/>
              </span>
            </div>
            <h4 class="profile__main-info-title">Encargos</h4>
          </div>
        </div>
        <div class="col-md-3 col-sm-6">
          <div class="profile__main-info-item">
            <div class="profile__main-info-icon">
              <span>
                <span class="profile-icon-count profile-download">0</span>
                <svg-download/>
              </span>
            </div>
            <h4 class="profile__main-info-title">Notificaciones</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/pinia/useAuthStore';
import { useWishlistStore } from '@/pinia/useWishlistStore';

const auth = useAuthStore();
const wishlistStore = useWishlistStore();

const ordersCount = ref(0);
const encargosCount = ref(0);

const initials = computed(() => {
  const name = auth.user?.name ?? '';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || '?';
});

const wishlistCount = computed(() => wishlistStore.wishlists.length);

async function loadCounters() {
  if (!auth.isLoggedIn) return;
  const headers = auth.authHeaders();
  const base = auth.apiBase;
  try {
    const [orders, encargos] = await Promise.all([
      $fetch<{ total: number }>(`${base}/api/v1/orders`, {
        headers,
        params: { per_page: 1 },
      }),
      $fetch<{ total: number }>(`${base}/api/v1/encargos`, {
        headers,
        params: { per_page: 1 },
      }).catch(() => ({ total: 0 })),
    ]);
    ordersCount.value = orders.total ?? 0;
    encargosCount.value = encargos.total ?? 0;
  } catch {
    // Si la API no responde mostramos 0 — no rompemos la UI
  }
}

async function onLogout() {
  await auth.logout();
}

onMounted(loadCounters);
</script>

<style scoped>
.hauled-avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #4CC9F0;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: 1px;
}
.hauled-email {
  color: #666;
  font-size: 0.9rem;
  margin-top: 4px;
}
.tp-logout-btn {
  border: none;
  cursor: pointer;
}
</style>
