<template>
  <section class="hauled-confirm-section">
    <div class="container">
      <div class="hauled-confirm-wrapper">

        <!-- Cargando -->
        <div v-if="estado === 'cargando'" class="hauled-confirm-center">
          <div class="hauled-spinner"></div>
          <p>Verificando tu pago...</p>
        </div>

        <!-- Aprobado -->
        <div v-else-if="estado === 'APPROVED'" class="hauled-confirm-center">
          <div class="hauled-confirm-icon hauled-confirm-ok">✅</div>
          <h2 class="hauled-confirm-title">¡Pedido confirmado!</h2>
          <p class="hauled-confirm-sub">Tu pago fue procesado exitosamente.</p>
          <div class="hauled-confirm-ref">Referencia: <strong>{{ referencia }}</strong></div>
          <p class="hauled-confirm-msg">
            Recibirás una confirmación en tu correo. También puedes escribirnos por WhatsApp para hacer seguimiento.
          </p>
          <div class="hauled-confirm-actions">
            <a :href="waLink" target="_blank" class="hauled-wa-btn">💬 WhatsApp</a>
            <nuxt-link to="/shop" class="hauled-shop-btn">Seguir comprando</nuxt-link>
          </div>
        </div>

        <!-- Pendiente -->
        <div v-else-if="estado === 'PENDING'" class="hauled-confirm-center">
          <div class="hauled-confirm-icon hauled-confirm-pending">⏳</div>
          <h2 class="hauled-confirm-title">Pago en proceso</h2>
          <p class="hauled-confirm-sub">Tu pago está siendo verificado. Esto puede tomar unos minutos.</p>
          <div class="hauled-confirm-ref">Referencia: <strong>{{ referencia }}</strong></div>
          <div class="hauled-confirm-actions">
            <a :href="waLink" target="_blank" class="hauled-wa-btn">💬 Confirmar por WhatsApp</a>
          </div>
        </div>

        <!-- Error / Rechazado -->
        <div v-else class="hauled-confirm-center">
          <div class="hauled-confirm-icon hauled-confirm-error">❌</div>
          <h2 class="hauled-confirm-title">Pago no completado</h2>
          <p class="hauled-confirm-sub">El pago fue rechazado o cancelado. No se realizó ningún cobro.</p>
          <div class="hauled-confirm-actions">
            <nuxt-link to="/checkout" class="hauled-shop-btn">Intentar de nuevo</nuxt-link>
            <a :href="waLink" target="_blank" class="hauled-wa-btn">💬 Ayuda por WhatsApp</a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWompi } from '@/composables/useWompi';

useSeoMeta({ title: 'Confirmación de pago — HAULED' });

const route = useRoute();
const config = useRuntimeConfig();
const { consultarTransaccion } = useWompi();

const referencia = ref(route.query.ref as string ?? '');
const estado = ref<string>('cargando');
const waNumber = config.public.whatsappNumber as string;
const waLink = computed(() => `https://wa.me/${waNumber}`);

onMounted(async () => {
  if (!referencia.value) {
    estado.value = 'ERROR';
    return;
  }

  // Polling: hasta 10 intentos cada 3s (max ~30s) hasta que Wompi confirme APPROVED/DECLINED.
  const maxIntentos = 10;
  const intervalo = 3000;

  for (let i = 0; i < maxIntentos; i++) {
    await new Promise(r => setTimeout(r, intervalo));
    const tx = await consultarTransaccion(referencia.value);
    const s = tx?.status;
    if (s && s !== 'PENDING') {
      estado.value = s;
      return;
    }
  }

  // Timeout: muestra como pendiente, NO como error — el webhook puede tardar más.
  estado.value = 'PENDING';
});
</script>

<style scoped>
.hauled-confirm-section {
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 80px 0;
  background: #fff;
}
.hauled-confirm-wrapper {
  max-width: 520px;
  margin: 0 auto;
}
.hauled-confirm-center {
  text-align: center;
  padding: 40px 20px;
  background: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 16px;
}
.hauled-confirm-icon { font-size: 3rem; margin-bottom: 16px; }
.hauled-confirm-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.6rem;
  letter-spacing: 2px;
  color: #111;
  margin-bottom: 8px;
}
.hauled-confirm-sub { color: #666; margin-bottom: 16px; }
.hauled-confirm-ref {
  background: #f4f4f4;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: 0.85rem;
  color: #444;
  margin-bottom: 16px;
  display: inline-block;
}
.hauled-confirm-msg { font-size: 0.85rem; color: #888; margin-bottom: 24px; }
.hauled-confirm-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}
.hauled-wa-btn {
  background: #25D366;
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
}
.hauled-shop-btn {
  background: #111;
  color: #fff;
  padding: 12px 24px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.9rem;
}
.hauled-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e0e0e0;
  border-top-color: #4cc9f0;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
