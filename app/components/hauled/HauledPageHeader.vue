<template>
  <section class="h-page-header" :class="{ 'h-page-header--center': center }">
    <div class="h-page-header-bg">
      <img :src="bgImage" alt="" class="h-page-header-img" />
      <div class="h-page-header-overlay" />
    </div>
    <div class="container h-page-header-container">
      <div class="h-page-header-content">
        <p v-if="eyebrow" class="h-page-header-eyebrow">
          <span v-if="!center" class="h-eyebrow-line" />
          {{ eyebrow }}
        </p>
        <h1 class="h-page-header-title">{{ title }}</h1>
        <nav class="h-page-header-breadcrumb" aria-label="Ruta de navegación">
          <nuxt-link to="/" class="h-bc-link">Inicio</nuxt-link>
          <span class="h-bc-sep" aria-hidden="true">/</span>
          <span class="h-bc-current">{{ subtitle || title }}</span>
        </nav>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  subtitle?: string;
  eyebrow?: string;
  bg?: string;
  center?: boolean;
}>();

const bgImage = computed(() => props.bg || '/img/hero/gasp-hero-2.jpg');
</script>

<style scoped>
.h-page-header {
  position: relative;
  background: var(--h-black, #111);
  overflow: hidden;
}
.h-page-header-bg { position: absolute; inset: 0; }
.h-page-header-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  opacity: 0.3;
}
.h-page-header-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.85) 100%);
}
.h-page-header-container {
  position: relative;
  z-index: 2;
  padding-top: clamp(64px, 8vw, 100px);
  padding-bottom: clamp(40px, 5vw, 64px);
}
.h-page-header-content { max-width: 640px; }
.h-page-header--center .h-page-header-content { margin: 0 auto; text-align: center; }

.h-page-header-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  font-size: 0.7rem;
  letter-spacing: 6px;
  color: var(--h-blue, #4CC9F0);
  text-transform: uppercase;
  margin-bottom: 14px;
}
.h-page-header--center .h-page-header-eyebrow { justify-content: center; }
.h-eyebrow-line {
  display: inline-block;
  width: 36px;
  height: 1px;
  background: var(--h-blue, #4CC9F0);
  flex-shrink: 0;
}

.h-page-header-title {
  font-family: 'Raleway', sans-serif;
  font-weight: 900;
  font-size: clamp(2rem, 5vw, 3.2rem);
  letter-spacing: -1px;
  line-height: 1;
  color: #fff;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.h-page-header-breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.h-page-header--center .h-page-header-breadcrumb { justify-content: center; }
.h-bc-link {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--h-blue, #4CC9F0);
  text-decoration: none;
  transition: opacity 150ms;
}
.h-bc-link:hover { opacity: 0.75; }
.h-bc-sep { font-size: 0.72rem; color: rgba(255,255,255,0.3); }
.h-bc-current {
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  color: rgba(255,255,255,0.5);
}
</style>
