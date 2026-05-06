<template>
  <div>
    <hauled-page-header
      title="Mis Datos"
      eyebrow="Habeas Data — Ley 1581"
      subtitle="Eliminar mis datos"
      bg="/img/hero/gasp-hero-2.jpg"
    />

    <section class="hdatos-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-6 col-md-8 col-12">

            <!-- Éxito -->
            <div v-if="submitted" class="hdatos-success">
              <div class="hdatos-success-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <h2 class="hdatos-success-title">Solicitud recibida</h2>
              <p class="hdatos-success-msg">
                Tu solicitud fue recibida. Procesaremos tu pedido de eliminación en un plazo máximo de <strong>30 días hábiles</strong> conforme a la Ley 1581 de Colombia.
              </p>
              <p class="hdatos-success-sub">Recibirás confirmación en el correo que proporcionaste.</p>
              <nuxt-link to="/" class="hdatos-back-btn">Volver al inicio</nuxt-link>
            </div>

            <!-- Formulario -->
            <div v-else class="hdatos-card">
              <div class="hdatos-header">
                <h1 class="hdatos-title">Solicitud de Eliminación de Datos</h1>
                <p class="hdatos-subtitle">
                  Conforme a la <strong>Ley 1581/2012</strong> de Colombia, tienes derecho a solicitar la eliminación de tus datos personales de nuestros sistemas.
                  Procesamos esta solicitud en máximo 30 días hábiles.
                </p>
              </div>

              <form @submit.prevent="onSubmit" novalidate class="hdatos-form">
                <div class="hdatos-field">
                  <label for="d-email" class="hdatos-label">Correo electrónico *</label>
                  <input
                    id="d-email"
                    v-model="form.email"
                    type="email"
                    class="hdatos-input"
                    :class="{ 'hdatos-input--error': fieldErrors.email }"
                    placeholder="tu@correo.com"
                    autocomplete="email"
                  />
                  <span v-if="fieldErrors.email" class="hdatos-field-error">{{ fieldErrors.email }}</span>
                </div>

                <div class="hdatos-field">
                  <label for="d-reason" class="hdatos-label">Motivo de la solicitud *</label>
                  <textarea
                    id="d-reason"
                    v-model="form.reason"
                    class="hdatos-input hdatos-textarea"
                    :class="{ 'hdatos-input--error': fieldErrors.reason }"
                    rows="4"
                    placeholder="Ej: Ya no soy cliente y deseo que se eliminen mis datos personales de sus registros."
                  ></textarea>
                  <span v-if="fieldErrors.reason" class="hdatos-field-error">{{ fieldErrors.reason }}</span>
                </div>

                <div v-if="serverError" class="hdatos-server-error">
                  {{ serverError }}
                </div>

                <button
                  type="submit"
                  class="hdatos-submit"
                  :disabled="loading"
                >
                  <span v-if="loading" class="hdatos-spinner" aria-hidden="true"></span>
                  <span>{{ loading ? 'Enviando solicitud...' : 'Enviar solicitud de eliminación' }}</span>
                </button>

                <p class="hdatos-legal-note">
                  Al enviar este formulario, confirmas que eres el titular de los datos o tienes autorización para actuar en nombre del titular.
                  Para más información, consulta nuestra <nuxt-link to="/privacidad" class="hdatos-legal-link">Política de Privacidad</nuxt-link>.
                </p>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeo } from '@/composables/useSeo';

definePageMeta({ layout: 'default' });

useSeo({
  title: 'Eliminar mis datos — HAULED',
  description: 'Solicita la eliminación de tus datos personales de HAULED conforme a la Ley 1581 de Colombia. Procesamos en máximo 30 días hábiles.',
});

const config = useRuntimeConfig();

const form = reactive({ email: '', reason: '' });
const fieldErrors = reactive({ email: '', reason: '' });
const serverError = ref('');
const loading = ref(false);
const submitted = ref(false);

function validate(): boolean {
  fieldErrors.email = '';
  fieldErrors.reason = '';
  let valid = true;

  if (!form.email.trim()) {
    fieldErrors.email = 'El correo electrónico es requerido.';
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    fieldErrors.email = 'Ingresa un correo electrónico válido.';
    valid = false;
  }

  if (!form.reason.trim()) {
    fieldErrors.reason = 'El motivo de la solicitud es requerido.';
    valid = false;
  } else if (form.reason.trim().length < 10) {
    fieldErrors.reason = 'Por favor describe el motivo con al menos 10 caracteres.';
    valid = false;
  }

  return valid;
}

async function onSubmit() {
  serverError.value = '';
  if (!validate()) return;

  loading.value = true;
  try {
    await $fetch(`${config.public.apiBase}/api/v1/data-deletion-request`, {
      method: 'POST',
      body: { email: form.email.trim(), reason: form.reason.trim() },
    });
    submitted.value = true;
  } catch (err: unknown) {
    const e = err as { data?: { message?: string; errors?: Record<string, string[]> }; status?: number };
    if (e?.data?.errors) {
      const errors = e.data.errors;
      if (errors.email) fieldErrors.email = errors.email[0];
      if (errors.reason) fieldErrors.reason = errors.reason[0];
    } else {
      serverError.value = e?.data?.message ?? 'Ocurrió un error al enviar tu solicitud. Inténtalo de nuevo o escríbenos a info@hauled.shop.';
    }
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.hdatos-section {
  background: var(--h-grey, #F4F4F4);
  padding: clamp(48px, 7vw, 96px) 0;
}

.hdatos-card {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: clamp(28px, 5vw, 48px);
  box-shadow: var(--h-shadow-card, 0 4px 20px rgba(0,0,0,0.08));
}

.hdatos-header { margin-bottom: 28px; }

.hdatos-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(1.3rem, 3vw, 1.7rem);
  text-transform: uppercase;
  letter-spacing: -0.5px;
  color: var(--h-black, #111);
  margin: 0 0 12px;
}

.hdatos-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.55);
  margin: 0;
}

.hdatos-form { display: flex; flex-direction: column; gap: 20px; }

.hdatos-field { display: flex; flex-direction: column; gap: 6px; }

.hdatos-label {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.45);
}

.hdatos-input {
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  color: var(--h-black, #111);
  background: var(--h-grey, #F4F4F4);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 13px 16px;
  outline: none;
  transition: border-color 160ms, box-shadow 160ms, background 160ms;
  width: 100%;
}
.hdatos-input:focus {
  border-color: var(--h-blue, #4CC9F0);
  box-shadow: 0 0 0 3px rgba(76, 201, 240, 0.12);
  background: #fff;
}
.hdatos-input--error {
  border-color: #e53e3e !important;
  box-shadow: 0 0 0 3px rgba(229, 62, 62, 0.1) !important;
}
.hdatos-textarea { resize: vertical; min-height: 100px; }

.hdatos-field-error {
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  color: #e53e3e;
  line-height: 1.4;
}

.hdatos-server-error {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #9b2c2c;
  background: #fff5f5;
  border: 1px solid #fed7d7;
  border-radius: 6px;
  padding: 12px 16px;
  line-height: 1.5;
}

.hdatos-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: var(--h-black, #111);
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 15px 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  min-height: 50px;
  transition: background var(--h-dur-fast, 180ms);
}
.hdatos-submit:hover:not(:disabled) { background: var(--h-blue, #4CC9F0); color: #111; }
.hdatos-submit:disabled { opacity: 0.55; cursor: not-allowed; }

.hdatos-spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: hdatosSpinAnim 0.7s linear infinite;
  flex-shrink: 0;
}
@keyframes hdatosSpinAnim {
  to { transform: rotate(360deg); }
}

.hdatos-legal-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.76rem;
  line-height: 1.6;
  color: rgba(0, 0, 0, 0.4);
  margin: 0;
}
.hdatos-legal-link {
  color: var(--h-blue, #4CC9F0);
  text-decoration: none;
  border-bottom: 1px solid rgba(76, 201, 240, 0.4);
}
.hdatos-legal-link:hover { border-color: var(--h-blue, #4CC9F0); }

/* Success state */
.hdatos-success {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 12px;
  padding: clamp(36px, 6vw, 64px) clamp(28px, 5vw, 48px);
  text-align: center;
  box-shadow: var(--h-shadow-card, 0 4px 20px rgba(0,0,0,0.08));
}
.hdatos-success-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: #c6f6d5;
  color: #276749;
  border-radius: 50%;
  margin: 0 auto 20px;
}
.hdatos-success-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 1.5rem;
  text-transform: uppercase;
  color: var(--h-black, #111);
  margin: 0 0 14px;
}
.hdatos-success-msg {
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  line-height: 1.7;
  color: rgba(0, 0, 0, 0.65);
  max-width: 420px;
  margin: 0 auto 10px;
}
.hdatos-success-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: rgba(0, 0, 0, 0.4);
  margin: 0 0 28px;
}
.hdatos-back-btn {
  display: inline-flex;
  align-items: center;
  background: var(--h-black, #111);
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 28px;
  border-radius: 6px;
  transition: background var(--h-dur-fast, 180ms);
}
.hdatos-back-btn:hover { background: var(--h-blue, #4CC9F0); color: #111; }
</style>
