<template>
  <section class="hl-section">
    <div class="container">
      <div class="hl-header">
        <p class="hl-eyebrow">Nuestro catálogo</p>
        <h2 class="hl-title">Tres líneas, una misión</h2>
      </div>
      <div class="hl-grid">

        <!-- Originals -->
        <nuxt-link to="/shop?hauledLine=originals" class="hl-card hl-card--originals">
          <div class="hl-card-inner">
            <span class="hl-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </span>
            <h3 class="hl-name">Originals</h3>
            <p class="hl-desc">Stock real comprado en outlets de USA. Nike, Gap, Tommy, Jordan, Adidas — prendas auténticas con etiquetas originales.</p>
            <span class="hl-cta">Ver colección <span class="hl-arrow">→</span></span>
          </div>
        </nuxt-link>

        <!-- Basics -->
        <nuxt-link to="/shop?hauledLine=basics" class="hl-card hl-card--basics">
          <div class="hl-card-inner">
            <span class="hl-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>
              </svg>
            </span>
            <h3 class="hl-name">Basics</h3>
            <p class="hl-desc">Prendas premium de marca propia HAULED. Oversize, streetwear minimalista. Calidad de exportación a precios directos.</p>
            <span class="hl-cta">Ver basics <span class="hl-arrow">→</span></span>
          </div>
        </nuxt-link>

        <!-- Encargos -->
        <nuxt-link to="/shop?hauledLine=encargo" class="hl-card hl-card--encargo">
          <div class="hl-card-inner">
            <span class="hl-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
              </svg>
            </span>
            <h3 class="hl-name">Encargos</h3>
            <p class="hl-desc">¿Quieres algo que no tenemos en stock? Dinos qué y lo traemos. Tallas, colores, modelos especiales. 15–25 días.</p>
            <span class="hl-cta">Hacer encargo <span class="hl-arrow">→</span></span>
          </div>
        </nuxt-link>

      </div>
    </div>
  </section>
</template>

<style scoped>
.hl-section {
  padding: var(--h-section-py, 80px) 0;
  background: var(--h-black, #111);
}
.hl-header {
  text-align: center;
  margin-bottom: clamp(36px, 5vw, 60px);
}
.hl-eyebrow {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 12px;
}
.hl-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h2, clamp(1.4rem, 4vw, 2.2rem));
  letter-spacing: var(--h-ls-title, 3px);
  text-transform: uppercase;
  color: #fff;
  margin: 0;
}

/* ── Grid ─────────────────────────────────────────── */
.hl-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--h-gap-grid, 20px);
}
@media (max-width: 991px) { .hl-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 575px) { .hl-grid { grid-template-columns: 1fr; } }

/* ── Card base ────────────────────────────────────── */
.hl-card {
  display: block;
  text-decoration: none;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.06);
  transition:
    transform var(--h-dur-med, 320ms) var(--h-ease, ease),
    box-shadow var(--h-dur-med, 320ms) var(--h-ease, ease),
    border-color var(--h-dur-med, 320ms);
}
.hl-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  border-color: var(--h-blue, #4CC9F0);
}
.hl-card-inner { padding: clamp(28px, 4vw, 44px) clamp(20px, 3vw, 32px); }

/* ── Card variants ────────────────────────────────── */
.hl-card--originals { background: #0d2233; }
.hl-card--basics    { background: #1a1a1a; }
.hl-card--encargo   { background: #141414; border-color: rgba(76,201,240,0.15); }

/* ── Icon ─────────────────────────────────────────── */
.hl-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  background: rgba(76,201,240,0.1);
  border-radius: 6px;
  color: var(--h-blue, #4CC9F0);
  margin-bottom: 20px;
  transition: background var(--h-dur-fast, 180ms);
}
.hl-card:hover .hl-icon { background: rgba(76,201,240,0.18); }

/* ── Name ─────────────────────────────────────────── */
.hl-name {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-h3, 1.4rem);
  letter-spacing: var(--h-ls-title, 3px);
  text-transform: uppercase;
  color: #fff;
  margin-bottom: 12px;
}

/* ── Desc ─────────────────────────────────────────── */
.hl-desc {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 0.9rem);
  line-height: 1.65;
  color: rgba(255,255,255,0.55);
  margin-bottom: 24px;
}

/* ── CTA ──────────────────────────────────────────── */
.hl-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Raleway', sans-serif;
  font-weight: 700;
  font-size: var(--h-fs-small, 0.8rem);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--h-blue, #4CC9F0);
}
.hl-arrow { transition: transform var(--h-dur-fast, 180ms); display: inline-block; }
.hl-card:hover .hl-arrow { transform: translateX(5px); }
</style>
