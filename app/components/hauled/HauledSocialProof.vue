<template>
  <section class="hk-social">
    <div class="hk-social-stats">
      <div v-for="stat in STATS" :key="stat.l" class="hk-stat">
        <span class="hk-stat-n">{{ stat.n }}</span>
        <span class="hk-stat-l">{{ stat.l }}</span>
      </div>
    </div>
    <div class="hk-social-head">
      <p class="hk-eyebrow">Lo que dicen</p>
      <h2 class="hk-h2" style="color:#111">Pedidos reales, gente real</h2>
    </div>
    <div class="hk-social-grid">
      <figure v-for="(review, i) in REVIEWS" :key="i" class="hk-review">
        <div class="hk-review-stars">★★★★★</div>
        <blockquote class="hk-review-q">"{{ review.q }}"</blockquote>
        <figcaption class="hk-review-by">
          <span class="hk-review-av" aria-hidden="true" />
          {{ review.n }} · <span>{{ review.c }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
const STATS = [
  { n: '+480', l: 'pedidos entregados' },
  { n: '9 días', l: 'promedio USA → CO' },
  { n: '100%', l: 'producto original' },
  { n: '4.9★', l: 'satisfacción' },
]

const REVIEWS = [
  {
    q: 'Pedí mi backpack GASP y llegó tal cual, sin sorpresas. Todo original.',
    n: 'Andrés M.',
    c: 'Bogotá',
  },
  {
    q: 'El encargo llegó en 9 días. Mejor precio que comprándolo yo mismo en USA.',
    n: 'Valentina R.',
    c: 'Medellín',
  },
  {
    q: 'Calidad real y atención por WhatsApp siempre. Ya van 3 pedidos.',
    n: 'Sebastián G.',
    c: 'Bucaramanga',
  },
]
</script>
