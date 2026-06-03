<template>
  <section class="hk-lines">
    <div class="hk-lines-head">
      <p class="hk-eyebrow">
        Nuestro catálogo
      </p>
      <h2 class="hk-h2 hk-ink">Tres líneas, una misión</h2>
    </div>
    <div class="hk-lines-grid">
      <NuxtLink
        v-for="line in HAULED_LINES"
        :key="line.key"
        :to="line.href"
        :class="`hk-line-card hk-line-card--${line.key}`"
      >
        <span class="hk-line-icon">
          <svg v-if="line.key === 'originals'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
          <svg v-else-if="line.key === 'basics'" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 9h6M9 12h6M9 15h4"/>
          </svg>
          <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1z"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
          </svg>
        </span>
        <h3 class="hk-line-name">{{ line.name }}</h3>
        <p class="hk-line-desc">{{ line.desc }}</p>
        <span class="hk-line-cta">{{ line.cta }} <span class="hk-arrow">→</span></span>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
const HAULED_LINES = [
  {
    key: 'originals',
    name: 'Originals',
    desc: 'Stock real comprado en outlets de USA. Nike, Gap, Tommy, Jordan, Adidas — prendas auténticas con etiquetas originales.',
    cta: 'Ver colección',
    href: '/shop?hauledLine=originals',
  },
  {
    key: 'basics',
    name: 'Basics',
    desc: 'Prendas premium de marca propia HAULED. Oversize, streetwear minimalista. Calidad de exportación a precios directos.',
    cta: 'Ver basics',
    href: '/shop?hauledLine=basics',
  },
  {
    key: 'encargo',
    name: 'Encargos',
    desc: '¿Quieres algo que no tenemos en stock? Dinos qué y lo traemos. Tallas, colores, modelos especiales. 15–25 días.',
    cta: 'Hacer encargo',
    href: '/encargos',
  },
]
</script>
