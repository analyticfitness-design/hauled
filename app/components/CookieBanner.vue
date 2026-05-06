<template>
  <Teleport to="body">
    <Transition name="hcookie">
      <div v-if="visible" class="hcookie-banner" role="region" aria-label="Aviso de cookies">
        <div class="container">
          <div class="hcookie-inner">
            <div class="hcookie-text">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="hcookie-icon" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p class="hcookie-msg">
                Usamos cookies para mejorar tu experiencia de compra.
                Al continuar, aceptas nuestra
                <nuxt-link to="/privacidad" class="hcookie-link">Política de Privacidad</nuxt-link>.
              </p>
            </div>
            <div class="hcookie-actions">
              <button
                type="button"
                class="hcookie-btn hcookie-btn--secondary"
                @click="acceptEssential"
              >
                Solo esenciales
              </button>
              <button
                type="button"
                class="hcookie-btn hcookie-btn--primary"
                @click="acceptAll"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const STORAGE_KEY = 'cookie_consent'

const visible = ref(false)

onMounted(() => {
  // Only show in client (localStorage is not available during SSR)
  const existing = localStorage.getItem(STORAGE_KEY)
  if (!existing) {
    // Slight delay so it doesn't flash immediately on page load
    setTimeout(() => { visible.value = true }, 800)
  }
})

function acceptAll() {
  localStorage.setItem(STORAGE_KEY, 'accepted')
  visible.value = false
}

function acceptEssential() {
  localStorage.setItem(STORAGE_KEY, 'essential')
  visible.value = false
}
</script>

<style scoped>
.hcookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: var(--h-black, #111);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 16px 0;
}

.hcookie-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
}

.hcookie-text {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.hcookie-icon {
  flex-shrink: 0;
  color: var(--h-blue, #4CC9F0);
}

.hcookie-msg {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  line-height: 1.55;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.hcookie-link {
  color: var(--h-blue, #4CC9F0);
  text-decoration: none;
  border-bottom: 1px solid rgba(76, 201, 240, 0.4);
  transition: border-color var(--h-dur-fast, 180ms);
}
.hcookie-link:hover { border-color: var(--h-blue, #4CC9F0); color: var(--h-blue, #4CC9F0); }

.hcookie-actions {
  display: flex;
  gap: 10px;
  flex-shrink: 0;
}

.hcookie-btn {
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.72rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  min-height: 40px;
  white-space: nowrap;
  transition: background var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms), border-color var(--h-dur-fast, 180ms);
}

.hcookie-btn--secondary {
  background: transparent;
  color: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.hcookie-btn--secondary:hover {
  border-color: rgba(255, 255, 255, 0.4);
  color: #fff;
}

.hcookie-btn--primary {
  background: var(--h-blue, #4CC9F0);
  color: var(--h-black, #111);
  border: 1px solid transparent;
}
.hcookie-btn--primary:hover {
  background: #3bb8df;
}

/* Transition */
.hcookie-enter-active,
.hcookie-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.hcookie-enter-from,
.hcookie-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Mobile */
@media (max-width: 575px) {
  .hcookie-inner { flex-direction: column; align-items: flex-start; }
  .hcookie-actions { width: 100%; }
  .hcookie-btn { flex: 1; }
}
</style>
