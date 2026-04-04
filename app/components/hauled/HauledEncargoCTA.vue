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
  padding: 80px 0;
  background: #0d2233;
}
.hauled-encargo-inner {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 60px;
  align-items: center;
}
@media (max-width: 768px) {
  .hauled-encargo-inner { grid-template-columns: 1fr; gap: 40px; }
}
.hauled-encargo-eyebrow {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #4cc9f0;
  margin-bottom: 16px;
}
.hauled-encargo-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 2rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 16px;
}
.hauled-encargo-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255,255,255,0.7);
  margin-bottom: 24px;
  max-width: 480px;
}
.hauled-encargo-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.hauled-encargo-list li {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.85);
}
.hauled-encargo-action {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  min-width: 260px;
}
.hauled-wa-cta {
  display: block;
  background: #25D366;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 1px;
  padding: 16px 32px;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  width: 100%;
  transition: background 0.2s;
}
.hauled-wa-cta:hover { background: #1db954; }
.hauled-catalog-cta {
  display: block;
  background: transparent;
  color: #4cc9f0;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  padding: 12px 32px;
  border: 1px solid #4cc9f0;
  border-radius: 6px;
  text-decoration: none;
  text-align: center;
  width: 100%;
  transition: all 0.2s;
}
.hauled-catalog-cta:hover { background: #4cc9f0; color: #fff; }
.hauled-encargo-note {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.4);
  text-align: center;
  margin: 0;
}
</style>
