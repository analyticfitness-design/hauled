<template>
  <section class="hauled-encargo-cta">
    <div class="container">
      <div class="hauled-encargo-inner">
        <div class="hauled-encargo-text">
          <span class="hauled-encargo-eyebrow">📦 Servicio de Encargos</span>
          <h2 class="hauled-encargo-title">¿No encuentras lo que buscas?</h2>
          <p class="hauled-encargo-desc">
            Dinos qué quieres y lo traemos directamente de USA. Nike, Supreme, Off-White,
            Air Jordan, Yeezy — cualquier marca, cualquier talla, cualquier colorway.
          </p>
          <ul class="hauled-encargo-list">
            <li>✅ Cotización sin costo</li>
            <li>✅ 15–25 días hábiles</li>
            <li>✅ 50% anticipo, 50% al llegar</li>
            <li>✅ Garantía de autenticidad</li>
          </ul>
        </div>
        <div class="hauled-encargo-action">
          <a
            :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola HAULED, quiero hacer un encargo 📦')}`"
            target="_blank"
            class="hauled-wa-cta"
          >
            💬 Iniciar encargo por WhatsApp
          </a>
          <nuxt-link to="/shop?hauledLine=encargo" class="hauled-catalog-cta">
            Ver catálogo de encargos
          </nuxt-link>
          <p class="hauled-encargo-note">Respuesta en menos de 2 horas en horario hábil</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const whatsappNumber = config.public.whatsappNumber as string;
</script>

<style scoped>
.hauled-encargo-cta {
  padding: var(--h-section-py, 80px) 0;
  background: var(--h-navy, #0d2233);
}
.hauled-encargo-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: clamp(32px, 5vw, 60px);
  align-items: center;
}
@media (max-width: 768px) {
  .hauled-encargo-inner { grid-template-columns: 1fr; gap: 36px; }
}
.hauled-encargo-eyebrow {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  font-weight: 300;
  letter-spacing: var(--h-ls-sub, 7px);
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
  margin-bottom: 16px;
}
.hauled-encargo-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, clamp(1.4rem, 4vw, 2.2rem));
  letter-spacing: var(--h-ls-title, 2px);
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 16px;
}
.hauled-encargo-desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 0.95rem);
  line-height: 1.7;
  color: var(--h-muted, rgba(255,255,255,0.6));
  margin-bottom: 24px;
  max-width: 480px;
}
.hauled-encargo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.hauled-encargo-list li {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-small, 0.88rem);
  color: rgba(255,255,255,0.75);
}
.hauled-encargo-action {
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: stretch;
  min-width: 250px;
}
@media (max-width: 768px) { .hauled-encargo-action { min-width: 0; } }
.hauled-wa-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #25D366;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.88rem;
  letter-spacing: 1px;
  padding: 16px 28px;
  border-radius: 6px;
  text-decoration: none;
  min-height: 50px;
  transition: background var(--h-dur-fast, 180ms);
}
.hauled-wa-cta:hover { background: #1aab52; }
.hauled-catalog-cta {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: var(--h-blue, #4CC9F0);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: var(--h-fs-small, 0.85rem);
  padding: 14px 28px;
  border: 1px solid var(--h-blue, #4CC9F0);
  border-radius: 6px;
  text-decoration: none;
  min-height: 44px;
  transition: background var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
}
.hauled-catalog-cta:hover { background: var(--h-blue, #4CC9F0); color: #111; }
.hauled-encargo-note {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.28);
  text-align: center;
  margin: 0;
}
</style>
