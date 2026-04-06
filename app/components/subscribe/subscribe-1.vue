<template>
  <section class="hs-section">
    <div class="container">
      <div class="hs-inner">

        <!-- Texto izquierda -->
        <div class="hs-text">
          <p class="hs-eyebrow">
            <span class="hs-eyebrow-line" />
            Novedades y lanzamientos
          </p>
          <h3 class="hs-title">Sé el primero en saber<br>cuando llegue stock nuevo</h3>
          <p class="hs-sub">Pedidos de USA, drops exclusivos y ofertas solo para suscriptores.</p>
        </div>

        <!-- Form derecha -->
        <div class="hs-form-wrap">
          <form class="hs-form" @submit.prevent="handleSubmit">
            <div class="hs-input-group">
              <input
                v-model="email"
                type="email"
                placeholder="Tu correo electrónico"
                class="hs-input"
                required
              />
              <button type="submit" class="hs-btn">
                <span v-if="!submitted">Suscribirme</span>
                <span v-else>✓ Listo</span>
              </button>
            </div>
            <p class="hs-legal">Sin spam. Solo lo bueno. Puedes cancelar cuando quieras.</p>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const email = ref('');
const submitted = ref(false);

const handleSubmit = () => {
  if (!email.value) return;
  submitted.value = true;
  email.value = '';
  setTimeout(() => { submitted.value = false; }, 3000);
};
</script>

<style scoped>
.hs-section {
  background: var(--h-black, #111);
  border-top: 1px solid rgba(76,201,240,0.15);
  border-bottom: 1px solid rgba(76,201,240,0.15);
  padding: clamp(48px, 6vw, 80px) 0;
}

.hs-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(32px, 5vw, 80px);
  align-items: center;
}
@media (max-width: 767px) {
  .hs-inner { grid-template-columns: 1fr; gap: 32px; }
}

/* ── Text ─────────────────────────────────────────── */
.hs-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 16px;
}
.hs-eyebrow-line {
  display: inline-block;
  width: 32px;
  height: 1px;
  background: var(--h-blue, #4CC9F0);
  flex-shrink: 0;
}
.hs-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, clamp(1.4rem, 4vw, 2.1rem));
  letter-spacing: var(--h-ls-display, -1px);
  color: #fff;
  line-height: 1.1;
  margin-bottom: 14px;
  text-transform: uppercase;
}
.hs-sub {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.88rem);
  color: rgba(255,255,255,0.45);
  line-height: 1.6;
  margin: 0;
  max-width: 380px;
}

/* ── Form ─────────────────────────────────────────── */
.hs-form-wrap { width: 100%; }
.hs-input-group {
  display: flex;
  gap: 0;
  border: 1px solid rgba(76,201,240,0.3);
  border-radius: 6px;
  overflow: hidden;
  transition: border-color var(--h-dur-fast, 180ms);
  margin-bottom: 12px;
}
.hs-input-group:focus-within { border-color: var(--h-blue, #4CC9F0); }
.hs-input {
  flex: 1;
  background: rgba(255,255,255,0.05);
  border: none;
  outline: none;
  padding: 0 20px;
  font-family: 'Inter', sans-serif;
  font-size: 16px; /* 16px mínimo para no hacer zoom en iOS */
  color: #fff;
  height: 52px;
  min-width: 0;
}
.hs-input::placeholder { color: rgba(255,255,255,0.3); }
.hs-btn {
  background: var(--h-blue, #4CC9F0);
  color: #111;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0 28px;
  height: 52px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  transition: background var(--h-dur-fast, 180ms);
  flex-shrink: 0;
}
.hs-btn:hover { background: #fff; }
.hs-legal {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.68rem);
  color: rgba(255,255,255,0.2);
  margin: 0;
  letter-spacing: 0.3px;
}

/* Mobile */
@media (max-width: 480px) {
  .hs-input-group { flex-direction: column; border-radius: 6px; }
  .hs-input { height: 48px; border-radius: 6px 6px 0 0; }
  .hs-btn { height: 48px; border-radius: 0 0 6px 6px; width: 100%; }
}
</style>
