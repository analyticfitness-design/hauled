<template>
  <section class="hlb-section">
    <div class="hlb-header">
      <p class="hlb-eyebrow">Estilo GASP</p>
      <h2 class="hlb-title">Lookbook</h2>
      <p class="hlb-sub">Prendas auténticas traídas directo de USA. Stock real, etiquetas originales.</p>
    </div>

    <div class="hlb-grid">

      <!-- Imagen grande izquierda -->
      <div class="hlb-item hlb-item--tall">
        <img :src="imgs[0]" alt="GASP style 1" class="hlb-img" />
        <div class="hlb-shimmer" />
      </div>

      <!-- Columna derecha: dos imágenes -->
      <div class="hlb-col">
        <div class="hlb-item">
          <img :src="imgs[1]" alt="GASP style 2" class="hlb-img" />
          <div class="hlb-shimmer" />
        </div>
        <div class="hlb-item">
          <img :src="imgs[2]" alt="GASP style 3" class="hlb-img" />
          <div class="hlb-shimmer" />
          <div class="hlb-cta-overlay">
            <nuxt-link to="/shop?hauledLine=originals" class="hlb-cta-btn">
              Ver colección
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const imgs = [
  '/img/hero/gasp-zz-1.jpg',
  '/img/hero/gasp-zz-3.jpg',
  '/img/hero/gasp-zz-2.jpg',
];
</script>

<style scoped>
.hlb-section {
  background: var(--h-black, #111);
  padding: var(--h-section-py, 80px) 0 0;
  overflow: hidden;
}

/* ── Header ─────────────────────────────────────── */
.hlb-header {
  text-align: center;
  padding: 0 clamp(20px, 5vw, 60px);
  margin-bottom: clamp(36px, 5vw, 56px);
}
.hlb-eyebrow {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 10px;
}
.hlb-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, clamp(1.4rem, 4vw, 2.2rem));
  letter-spacing: var(--h-ls-title, 3px);
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 12px;
}
.hlb-sub {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 0.92rem);
  color: var(--h-muted, rgba(255,255,255,0.5));
  max-width: 440px;
  margin: 0 auto;
  line-height: 1.65;
}

/* ── Grid ────────────────────────────────────────── */
.hlb-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px;
}
@media (max-width: 575px) {
  .hlb-grid { grid-template-columns: 1fr; }
  .hlb-item--tall { display: none; }
  .hlb-col { display: grid; grid-template-columns: 1fr 1fr; gap: 3px; }
}

.hlb-col {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

/* ── Image item ─────────────────────────────────── */
.hlb-item {
  position: relative;
  overflow: hidden;
  aspect-ratio: 3 / 4;
}
.hlb-item--tall { aspect-ratio: auto; min-height: 100%; }

.hlb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
  transition: transform 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.hlb-item:hover .hlb-img { transform: scale(1.06); }

/* ── Shimmer overlay on hover ───────────────────── */
.hlb-shimmer {
  position: absolute;
  inset: 0;
  background: rgba(76,201,240,0.0);
  transition: background 0.3s ease;
  pointer-events: none;
}
.hlb-item:hover .hlb-shimmer { background: rgba(76,201,240,0.06); }

/* ── CTA on last image ──────────────────────────── */
.hlb-cta-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: clamp(20px, 4vw, 36px);
  background: linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 50%);
}
.hlb-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 12px 28px;
  background: var(--h-blue, #4CC9F0);
  color: #111;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 4px;
  transition: background 0.18s ease, color 0.18s ease;
}
.hlb-cta-btn:hover { background: #fff; color: #111; }
</style>
