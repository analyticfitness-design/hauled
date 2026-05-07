<template>
  <div class="profile__notification">
    <div class="profile__notification-top mb-30">
      <h3 class="profile__notification-title">Preferencias de notificaciones</h3>
      <p>
        Decide qué te avisamos. Puedes cambiar estas preferencias en cualquier momento.
      </p>
    </div>

    <div v-if="loading" class="hauled-loading">Cargando preferencias...</div>

    <div v-else class="profile__notification-wrapper">
      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="notif-orders"
            v-model="prefs.orders"
            @change="save"
          />
          <label class="form-check-label" for="notif-orders">
            Estado de mis pedidos (envío, entrega, cancelación)
          </label>
        </div>
      </div>

      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="notif-promotions"
            v-model="prefs.promotions"
            @change="save"
          />
          <label class="form-check-label" for="notif-promotions">
            Ofertas, lanzamientos y restock
          </label>
        </div>
      </div>

      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="notif-encargos"
            v-model="prefs.encargos"
            @change="save"
          />
          <label class="form-check-label" for="notif-encargos">
            Avances de mis encargos especiales
          </label>
        </div>
      </div>

      <div class="profile__notification-item mb-20">
        <div class="form-check form-switch d-flex align-items-center">
          <input
            class="form-check-input"
            type="checkbox"
            role="switch"
            id="notif-whatsapp"
            v-model="prefs.whatsapp"
            @change="save"
          />
          <label class="form-check-label" for="notif-whatsapp">
            Recibir avisos también por WhatsApp
          </label>
        </div>
      </div>

      <p v-if="saving" class="hauled-saving-msg">Guardando...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/pinia/useAuthStore';

const auth = useAuthStore();
const loading = ref(true);
const saving = ref(false);

const prefs = ref({
  orders: true,
  promotions: true,
  encargos: true,
  whatsapp: false,
});

watch(
  () => auth.user,
  (u) => {
    if (!u) return;
    const np = u.notification_preferences ?? {};
    prefs.value = {
      orders: np.orders ?? true,
      promotions: np.promotions ?? true,
      encargos: np.encargos ?? true,
      whatsapp: np.whatsapp ?? false,
    };
    loading.value = false;
  },
  { immediate: true }
);

async function save() {
  saving.value = true;
  try {
    await auth.updateProfile({
      notification_preferences: { ...prefs.value },
    });
    toast.success('Preferencias actualizadas');
  } catch {
    toast.error('No se pudieron guardar las preferencias');
  } finally {
    saving.value = false;
  }
}
</script>

<style scoped>
.hauled-loading,
.hauled-saving-msg {
  color: #666;
  font-size: 0.85rem;
  padding: 8px 0;
}
</style>
