<template>
  <hauled-page-header
    title="Contacto"
    eyebrow="Estamos para ayudarte"
    subtitle="Contacto"
    bg="/img/hero/gasp-hero-2.jpg"
  />

  <section class="h-contact-section">
    <div class="container">
      <div class="h-contact-grid">

        <!-- Formulario -->
        <div class="h-contact-form-card">
          <h2 class="h-contact-card-title">Envíanos un mensaje</h2>
          <p class="h-contact-card-sub">Respondemos en menos de 24 horas en días hábiles.</p>

          <form @submit.prevent="onSubmit" class="h-contact-form" novalidate>
            <div class="h-form-row">
              <div class="h-form-group">
                <label for="c-name">Nombre completo</label>
                <input id="c-name" type="text" placeholder="Tu nombre" v-bind="nameAttrs" :class="{ 'h-input-error': errors.name }" />
                <span v-if="errors.name" class="h-field-error">{{ errors.name }}</span>
              </div>
              <div class="h-form-group">
                <label for="c-email">Correo electrónico</label>
                <input id="c-email" type="email" placeholder="tu@email.com" v-bind="emailAttrs" :class="{ 'h-input-error': errors.email }" />
                <span v-if="errors.email" class="h-field-error">{{ errors.email }}</span>
              </div>
            </div>
            <div class="h-form-group">
              <label for="c-subject">Asunto</label>
              <input id="c-subject" type="text" placeholder="¿En qué te podemos ayudar?" v-bind="subjectAttrs" :class="{ 'h-input-error': errors.subject }" />
              <span v-if="errors.subject" class="h-field-error">{{ errors.subject }}</span>
            </div>
            <div class="h-form-group">
              <label for="c-message">Mensaje</label>
              <textarea id="c-message" rows="5" placeholder="Escribe tu consulta aquí..." v-bind="messageAttrs" :class="{ 'h-input-error': errors.message }"></textarea>
              <span v-if="errors.message" class="h-field-error">{{ errors.message }}</span>
            </div>
            <button type="submit" class="h-contact-submit">Enviar mensaje</button>
            <p v-if="sent" class="h-form-success">¡Mensaje enviado! Te contactaremos pronto.</p>
          </form>
        </div>

        <!-- Info lateral -->
        <div class="h-contact-info-col">

          <a :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola HAULED, tengo una consulta 👋')}`" target="_blank" rel="noopener" class="h-wa-card">
            <div class="h-wa-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div class="h-wa-text">
              <span class="h-wa-label">WhatsApp directo</span>
              <span class="h-wa-number">+57 {{ whatsappDisplay }}</span>
            </div>
            <span class="h-wa-arrow">→</span>
          </a>

          <div class="h-info-card">
            <div class="h-info-item">
              <div class="h-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div class="h-info-body">
                <span class="h-info-label">Correo</span>
                <a href="mailto:info@hauled.shop" class="h-info-value">info@hauled.shop</a>
              </div>
            </div>
            <div class="h-info-item">
              <div class="h-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div class="h-info-body">
                <span class="h-info-label">Ubicación</span>
                <span class="h-info-value">Bucaramanga, Colombia · Tienda 100% virtual</span>
              </div>
            </div>
            <div class="h-info-item">
              <div class="h-info-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
              </div>
              <div class="h-info-body">
                <span class="h-info-label">Horario</span>
                <span class="h-info-value">24/7 · Siempre abierto · Envío gratis en Bucaramanga</span>
              </div>
            </div>
          </div>

          <div class="h-social-card">
            <span class="h-social-label">Síguenos</span>
            <div class="h-social-links">
              <a href="https://instagram.com/hauled.co" target="_blank" rel="noopener" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="https://tiktok.com/@hauled.co" target="_blank" rel="noopener" aria-label="TikTok">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/></svg>
              </a>
              <a href="https://facebook.com/hauledco" target="_blank" rel="noopener" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>

  <section class="h-map-section">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d254466.5!2d-73.2478997!3d7.1253755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e683f8b0b49cf95%3A0x4f6a4f9c8f12a4d2!2sBucaramanga%2C%20Santander%2C%20Colombia!5e0!3m2!1ses!2sco!4v1712000000000"
      width="100%" height="360" style="border:0;display:block;filter:grayscale(0.2);"
      allowfullscreen loading="lazy" title="Bucaramanga, Colombia"
    ></iframe>
  </section>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import * as yup from 'yup';

const config = useRuntimeConfig();
const whatsappNumber = config.public.whatsappNumber as string;
const whatsappDisplay = computed(() =>
  whatsappNumber.replace(/^57/, '').replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3')
);

const sent = ref(false);

const { errors, handleSubmit, defineField, resetForm } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('El nombre es requerido'),
    email: yup.string().required('El correo es requerido').email('Correo no válido'),
    subject: yup.string().required('El asunto es requerido'),
    message: yup.string().required('El mensaje es requerido'),
  }),
});

const [, nameAttrs] = defineField('name');
const [, emailAttrs] = defineField('email');
const [, subjectAttrs] = defineField('subject');
const [, messageAttrs] = defineField('message');

const onSubmit = handleSubmit(() => {
  sent.value = true;
  resetForm();
  setTimeout(() => { sent.value = false; }, 5000);
});
</script>

<style scoped>
.h-contact-section {
  background: var(--h-grey, #F4F4F4);
  padding: clamp(60px, 8vw, 100px) 0;
}
.h-contact-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: clamp(24px, 4vw, 48px);
  align-items: start;
}
@media (max-width: 900px) { .h-contact-grid { grid-template-columns: 1fr; } }

/* Form card */
.h-contact-form-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  padding: clamp(28px, 4vw, 48px);
  box-shadow: 0 4px 24px rgba(0,0,0,0.07);
}
.h-contact-card-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(1.3rem, 3vw, 1.8rem);
  letter-spacing: -0.5px;
  text-transform: uppercase;
  color: var(--h-black, #111);
  margin-bottom: 6px;
}
.h-contact-card-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: rgba(0,0,0,0.45);
  margin-bottom: 28px;
}

/* Form */
.h-contact-form { display: flex; flex-direction: column; gap: 20px; }
.h-form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
@media (max-width: 600px) { .h-form-row { grid-template-columns: 1fr; } }
.h-form-group { display: flex; flex-direction: column; gap: 6px; }
.h-form-group label {
  font-family: 'Inter', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 1.8px;
  text-transform: uppercase;
  color: rgba(0,0,0,0.45);
}
.h-form-group input,
.h-form-group textarea {
  font-family: 'Inter', sans-serif;
  font-size: 0.92rem;
  color: var(--h-black, #111);
  background: var(--h-grey, #F4F4F4);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 6px;
  padding: 13px 16px;
  outline: none;
  transition: border-color 160ms, box-shadow 160ms;
  resize: vertical;
  width: 100%;
}
.h-form-group input:focus,
.h-form-group textarea:focus {
  border-color: var(--h-blue, #4CC9F0);
  box-shadow: 0 0 0 3px rgba(76,201,240,0.12);
  background: #fff;
}
.h-input-error { border-color: #e53e3e !important; }
.h-field-error { font-family: 'Inter', sans-serif; font-size: 0.72rem; color: #e53e3e; }

.h-contact-submit {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--h-blue, #4CC9F0);
  color: #111;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 15px 36px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  min-height: 50px;
  align-self: flex-start;
  transition: background 160ms, color 160ms;
}
.h-contact-submit:hover { background: #111; color: #fff; }
.h-form-success {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #276749;
  background: #c6f6d5;
  border-radius: 6px;
  padding: 12px 16px;
  margin: 0;
}

/* WhatsApp card */
.h-wa-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #25D366;
  color: #fff;
  padding: 18px 20px;
  border-radius: 10px;
  text-decoration: none;
  margin-bottom: 14px;
  transition: background 160ms;
}
.h-wa-card:hover { background: #1aab52; color: #fff; }
.h-wa-icon { flex-shrink: 0; }
.h-wa-text { display: flex; flex-direction: column; flex: 1; gap: 2px; }
.h-wa-label { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; opacity: 0.9; }
.h-wa-number { font-family: 'Raleway', sans-serif; font-weight: 700; font-size: 1.05rem; }
.h-wa-arrow { font-size: 1.1rem; flex-shrink: 0; }

/* Info card */
.h-info-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 14px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.h-info-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 20px;
}
.h-info-item + .h-info-item { border-top: 1px solid rgba(0,0,0,0.06); }
.h-info-icon {
  width: 34px;
  height: 34px;
  background: var(--h-grey, #F4F4F4);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--h-blue, #4CC9F0);
}
.h-info-body { display: flex; flex-direction: column; gap: 2px; }
.h-info-label { font-family: 'Inter', sans-serif; font-size: 0.62rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(0,0,0,0.4); }
.h-info-value { font-family: 'Inter', sans-serif; font-size: 0.88rem; color: var(--h-black, #111); text-decoration: none; }
a.h-info-value:hover { color: var(--h-blue, #4CC9F0); }

/* Social */
.h-social-card {
  background: #fff;
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 10px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}
.h-social-label { font-family: 'Inter', sans-serif; font-size: 0.65rem; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(0,0,0,0.4); flex-shrink: 0; }
.h-social-links { display: flex; gap: 8px; }
.h-social-links a {
  width: 34px;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 6px;
  color: var(--h-black, #111);
  text-decoration: none;
  transition: border-color 150ms, color 150ms;
}
.h-social-links a:hover { border-color: var(--h-blue, #4CC9F0); color: var(--h-blue, #4CC9F0); }

/* Map */
.h-map-section { background: var(--h-black, #111); line-height: 0; }
</style>
