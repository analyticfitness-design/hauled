<template>
  <section class="h-hero" ref="heroRef">
    <div class="h-hero-bg">
      <div class="h-hero-img-wrap">
        <img
          :src="heroImg"
          alt="HAULED — Direct from the States"
          class="h-hero-img"
        />
        <div class="h-hero-img-overlay" />
      </div>
    </div>

    <div class="container h-hero-container">
      <div class="h-hero-content" :class="{ 'h-hero-content--visible': visible }">

        <!-- Eyebrow -->
        <p class="h-hero-eyebrow">
          <span class="h-eyebrow-line" />
          Direct from the States
        </p>

        <!-- Título display -->
        <h1 class="h-hero-title">
          Moda<br>
          <span class="h-hero-title--accent">Original</span><br>
          de USA
        </h1>

        <!-- Sub -->
        <p class="h-hero-sub">
          Nike, Jordan, Gap, Tommy, GASP — prendas auténticas traídas directamente
          desde outlets de Estados Unidos. Envío a todo Colombia.
        </p>

        <!-- CTAs -->
        <div class="h-hero-ctas">
          <nuxt-link to="/shop" class="h-btn-primary">Ver catálogo</nuxt-link>
          <a
            :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola HAULED, quiero hacer un encargo 📦')}`"
            target="_blank"
            class="h-btn-ghost"
          >Hacer encargo →</a>
        </div>

        <!-- Badges de confianza -->
        <div class="h-hero-trust">
          <span class="h-trust-item">✦ Autenticidad garantizada</span>
          <span class="h-trust-item">✦ Envío nacional</span>
          <span class="h-trust-item">✦ Pago seguro</span>
        </div>

      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="h-scroll-indicator" aria-hidden="true">
      <span class="h-scroll-line" />
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
const whatsappNumber = config.public.whatsappNumber as string;

const heroImg = '/img/hero/gasp-hero-1.jpg';
const heroRef = ref<HTMLElement | null>(null);
const visible = ref(false);

onMounted(() => {
  requestAnimationFrame(() => { visible.value = true; });
});
</script>

<style scoped>
/* ── Hero base ────────────────────────────────────── */
.h-hero {
  position: relative;
  min-height: 100svh;
  background: var(--h-black, #111);
  display: flex;
  align-items: center;
  overflow: hidden;
}

/* ── Background image ─────────────────────────────── */
.h-hero-bg { position: absolute; inset: 0; }
.h-hero-img-wrap {
  position: absolute;
  inset: 0;
  left: 42%;
}
.h-hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}
.h-hero-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    var(--h-black, #111) 20%,
    rgba(17,17,17,0.65) 52%,
    rgba(17,17,17,0.15) 100%
  );
}
@media (max-width: 991px) {
  .h-hero-img-wrap { left: 0; }
  .h-hero-img-overlay { background: rgba(17,17,17,0.78); }
}

/* ── Content ──────────────────────────────────────── */
.h-hero-container {
  position: relative;
  z-index: 2;
  padding-top: clamp(80px, 10vw, 140px);
  padding-bottom: clamp(80px, 10vw, 120px);
}
.h-hero-content {
  max-width: 580px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.75s var(--h-ease, ease), transform 0.75s var(--h-ease, ease);
}
.h-hero-content--visible { opacity: 1; transform: translateY(0); }

/* ── Eyebrow ──────────────────────────────────────── */
.h-hero-eyebrow {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: var(--h-fs-label, 0.72rem);
  letter-spacing: var(--h-ls-sub, 7px);
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 22px;
}
.h-eyebrow-line {
  display: inline-block;
  width: 44px;
  height: 2px;
  background: var(--h-blue, #4CC9F0);
  flex-shrink: 0;
}

/* ── Title ────────────────────────────────────────── */
.h-hero-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: var(--h-fs-display, clamp(2.8rem, 10vw, 6.5rem));
  line-height: 0.9;
  letter-spacing: var(--h-ls-display, -2px);
  color: #fff;
  margin-bottom: 28px;
  text-transform: uppercase;
}
.h-hero-title--accent { color: var(--h-blue, #4CC9F0); }

/* ── Sub ──────────────────────────────────────────── */
.h-hero-sub {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-body, 1rem);
  line-height: 1.7;
  color: var(--h-muted, rgba(255,255,255,0.6));
  max-width: 420px;
  margin-bottom: 36px;
}

/* ── CTAs ─────────────────────────────────────────── */
.h-hero-ctas {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 44px;
}
.h-btn-primary {
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
  padding: 15px 34px;
  border-radius: 4px;
  text-decoration: none;
  min-height: 50px;
  transition: background var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
}
.h-btn-primary:hover { background: #fff; color: #111; }
.h-btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.88rem;
  letter-spacing: 1px;
  padding: 15px 26px;
  border: 1px solid rgba(255,255,255,0.28);
  border-radius: 4px;
  text-decoration: none;
  min-height: 50px;
  transition: border-color var(--h-dur-fast, 180ms), color var(--h-dur-fast, 180ms);
}
.h-btn-ghost:hover { border-color: var(--h-blue, #4CC9F0); color: var(--h-blue, #4CC9F0); }

/* ── Trust badges ─────────────────────────────────── */
.h-hero-trust { display: flex; gap: 22px; flex-wrap: wrap; }
.h-trust-item {
  font-family: 'Inter', sans-serif;
  font-size: var(--h-fs-label, 0.72rem);
  color: rgba(255,255,255,0.35);
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* ── Scroll indicator ─────────────────────────────── */
.h-scroll-indicator {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}
.h-scroll-line {
  display: block;
  width: 1px;
  height: 52px;
  background: linear-gradient(to bottom, transparent, var(--h-blue, #4CC9F0));
  margin: auto;
  animation: scrollPulse 2.2s ease infinite;
}
@keyframes scrollPulse {
  0%   { opacity: 0; transform: scaleY(0.2); transform-origin: top; }
  50%  { opacity: 1; transform: scaleY(1); transform-origin: top; }
  100% { opacity: 0; transform: scaleY(1); transform-origin: top; }
}

/* ── Mobile ───────────────────────────────────────── */
@media (max-width: 575px) {
  .h-hero { min-height: 88svh; }
  .h-hero-ctas { flex-direction: column; gap: 10px; }
  .h-btn-primary, .h-btn-ghost { width: 100%; }
  .h-hero-trust { gap: 10px; }
  .h-hero-sub { max-width: 100%; }
}
</style>
