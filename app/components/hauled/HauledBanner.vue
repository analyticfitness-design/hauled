<template>
  <section class="hb-section">

    <!-- Panel izquierdo: imagen atmosférica gasp-zz-4 -->
    <div class="hb-panel hb-panel--left">
      <img :src="img1" alt="GASP Training" class="hb-img" />
      <div class="hb-overlay hb-overlay--dark" />
      <div class="hb-text">
        <span class="hb-eyebrow">Equipamiento serio</span>
        <h2 class="hb-title">Entrena<br>como GASP</h2>
        <nuxt-link to="/shop?hauledLine=originals" class="hb-link">Ver originals →</nuxt-link>
      </div>
    </div>

    <!-- Panel derecho: imagen lifestyle gasp-hero-launch (colorida) -->
    <div class="hb-panel hb-panel--right">
      <img :src="img2" alt="GASP New Season" class="hb-img" />
      <div class="hb-overlay hb-overlay--light" />
      <div class="hb-text">
        <span class="hb-eyebrow">Nueva temporada</span>
        <h2 class="hb-title">Old School<br>New School</h2>
        <nuxt-link to="/shop" class="hb-link">Ver colección →</nuxt-link>
      </div>
    </div>

  </section>
</template>

<script setup lang="ts">
const img1 = '/img/hero/gasp-zz-4.jpg';
const img2 = '/img/hero/gasp-hero-launch.jpg';
</script>

<style scoped>
.hb-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: clamp(460px, 55vw, 700px);
}
@media (max-width: 768px) {
  .hb-section { grid-template-columns: 1fr; min-height: auto; }
}

/* ── Panel ─────────────────────────────────────── */
.hb-panel {
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  cursor: pointer;
}
.hb-panel:hover .hb-img { transform: scale(1.05); }

/* ── Image ─────────────────────────────────────── */
.hb-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.hb-panel--right .hb-img { object-position: center top; }

/* ── Overlays ──────────────────────────────────── */
.hb-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.hb-overlay--dark {
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.82) 0%,
    rgba(0,0,0,0.4) 50%,
    rgba(0,0,0,0.1) 100%
  );
}
.hb-overlay--light {
  background: linear-gradient(
    to top,
    rgba(0,0,0,0.76) 0%,
    rgba(0,0,0,0.3) 50%,
    rgba(0,0,0,0.05) 100%
  );
}

/* ── Text block ────────────────────────────────── */
.hb-text {
  position: relative;
  z-index: 2;
  padding: clamp(28px, 4vw, 52px);
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}

.hb-eyebrow {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
}

.hb-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, clamp(1.6rem, 4vw, 2.4rem));
  line-height: 1.05;
  letter-spacing: var(--h-ls-title, 2px);
  text-transform: uppercase;
  color: #fff;
  margin: 0;
}

.hb-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-small, 0.8rem);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
  text-decoration: none;
  margin-top: 6px;
  transition: gap 0.18s ease;
}
.hb-link:hover { gap: 12px; }

@media (max-width: 768px) {
  .hb-panel { min-height: 340px; }
}
@media (max-width: 575px) {
  .hb-panel { min-height: 280px; }
}
</style>
