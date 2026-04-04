<template>
  <section class="hauled-hero">
    <div class="container">
      <div class="hauled-hero-inner">

        <!-- Left: text -->
        <div class="hauled-hero-text">
          <span class="hauled-hero-tag">✈️ Direct from the States</span>
          <h1 class="hauled-hero-title">
            Ropa Original<br>
            <span class="hauled-hero-accent">de USA</span><br>
            para Colombia
          </h1>
          <p class="hauled-hero-sub">
            Nike, Gap, Tommy, Jordan y más. Originales, sin intermediarios.<br>
            También hacemos encargos a pedido — tú eliges, nosotros traemos.
          </p>
          <div class="hauled-hero-ctas">
            <nuxt-link to="/shop?hauledLine=originals" class="hauled-btn-primary">Ver Originals</nuxt-link>
            <nuxt-link to="/shop?hauledLine=encargo" class="hauled-btn-outline">Hacer Encargo</nuxt-link>
          </div>
          <div class="hauled-hero-trust">
            <span>✅ Producto 100% original</span>
            <span>🚚 Envío a todo Colombia</span>
            <span>💬 Soporte WhatsApp</span>
          </div>
        </div>

        <!-- Right: featured product visual -->
        <div class="hauled-hero-visual">
          <div class="hauled-hero-badge-float">NEW IN</div>
          <div class="hauled-hero-img-wrap">
            <img
              src="/img/products/originals/hero-collection.jpg"
              alt="HAULED — Ropa USA Original"
              class="hauled-hero-img"
              @error="onImgError"
            />
            <div class="hauled-hero-img-fallback" v-if="imgError">
              <span class="hauled-hero-logo-large">HAULED</span>
              <span class="hauled-hero-logo-sub">Direct from the States</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const imgError = ref(false);
const onImgError = () => { imgError.value = true; };
</script>

<style scoped>
.hauled-hero {
  background: #fff;
  padding: 80px 0 60px;
  border-bottom: 1px solid #e8e8e8;
}
.hauled-hero-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}
@media (max-width: 768px) {
  .hauled-hero-inner { grid-template-columns: 1fr; gap: 40px; }
  .hauled-hero { padding: 40px 0 40px; }
}
.hauled-hero-tag {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: #4cc9f0;
  border: 1px solid #4cc9f0;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 20px;
}
.hauled-hero-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(2.2rem, 4vw, 3.5rem);
  line-height: 1.05;
  letter-spacing: 2px;
  color: #111;
  margin-bottom: 20px;
  text-transform: uppercase;
}
.hauled-hero-accent { color: #4cc9f0; }
.hauled-hero-sub {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  margin-bottom: 32px;
  max-width: 440px;
}
.hauled-hero-ctas {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 32px;
}
.hauled-btn-primary {
  background: #4cc9f0;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.2s;
}
.hauled-btn-primary:hover { background: #0099cc; color: #fff; }
.hauled-btn-outline {
  background: transparent;
  color: #111;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 14px 32px;
  border-radius: 4px;
  border: 2px solid #111;
  text-decoration: none;
  transition: all 0.2s;
}
.hauled-btn-outline:hover { background: #111; color: #fff; }
.hauled-hero-trust {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: #888;
}
/* Visual side */
.hauled-hero-visual { position: relative; }
.hauled-hero-badge-float {
  position: absolute;
  top: -10px;
  right: 20px;
  background: #4cc9f0;
  color: #fff;
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 0.7rem;
  letter-spacing: 3px;
  padding: 6px 14px;
  z-index: 2;
}
.hauled-hero-img-wrap {
  background: #f4f4f4;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4/5;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hauled-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.hauled-hero-img-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 40px;
}
.hauled-hero-logo-large {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: 3rem;
  letter-spacing: 8px;
  color: #4cc9f0;
}
.hauled-hero-logo-sub {
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  letter-spacing: 3px;
  color: #999;
  text-transform: uppercase;
}
</style>
