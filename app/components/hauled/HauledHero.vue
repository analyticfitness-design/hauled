<template>
  <section class="hk-hero">
    <div class="hk-hero-bg">
      <img src="/img/hero/gasp-hero-1.jpg" alt="HAULED" class="hk-hero-img" />
      <div class="hk-hero-overlay" />
      <div class="hk-hero-grain" />
    </div>
    <div class="hk-hero-wm" aria-hidden="true">
      <span>HAU</span><span>LED</span>
    </div>
    <div class="hk-hero-content is-visible">
      <p class="hk-eyebrow">
        <span class="hk-eyebrow-line" />Direct from the States · Drop Junio
      </p>
      <h1 class="hk-hero-title">
        Moda<br /><span class="hk-accent">Original</span><br />de USA
      </h1>
      <p class="hk-hero-sub">
        Nike, Jordan, Gap, Tommy, GASP — prendas auténticas traídas directo de outlets en Estados Unidos. Lo que aquí no se consigue, lo cargamos.
      </p>
      <div class="hk-hero-ctas">
        <NuxtLink to="/shop" class="hk-btn-primary">Ver catálogo</NuxtLink>
        <NuxtLink to="/encargos" class="hk-btn-ghost">Hacer encargo →</NuxtLink>
      </div>
      <div class="hk-hero-trust">
        <span>✦ Autenticidad garantizada</span>
        <span>✦ Envío nacional</span>
        <span>✦ Pago seguro</span>
      </div>
    </div>
    <NuxtLink v-if="featProduct" :to="`/product-details/${featProduct.id}`" class="hk-hero-feat">
      <img
        class="hk-hero-feat-img"
        :src="featProduct.img || '/img/placeholder.jpg'"
        :alt="featProduct.title"
      />
      <span class="hk-hero-feat-tx">
        <span class="hk-hero-feat-ey">Recién llegado</span>
        <span class="hk-hero-feat-nm">{{ featProduct.title }}</span>
        <span class="hk-hero-feat-pr">
          {{ featProduct.price ? fmtCop(featProduct.price) : 'Cotizar' }}
          <span>→</span>
        </span>
      </span>
    </NuxtLink>
    <div class="hk-hero-strip">
      <NuxtLink
        v-for="(cat, i) in STRIP_CATS"
        :key="i"
        :to="cat.href"
        class="hk-hero-strip-i"
      >{{ cat.label }}</NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IProduct } from '@/types/product-type'

const STRIP_CATS = [
  { label: 'Camisetas & Tanks', href: '/shop?cat=Camisetas+%26+Tanks' },
  { label: 'Pantalones', href: '/shop?cat=Pantalones' },
  { label: 'Pantalonetas', href: '/shop?cat=Pantalonetas' },
  { label: 'Accesorios', href: '/shop?cat=Accesorios' },
  { label: 'Encargos USA', href: '/encargos' },
]

const { fetchList } = useProducts()

const { data: featProduct } = await useAsyncData<IProduct | null>(
  'home-hero-feat',
  async () => {
    const items = await fetchList({ per_page: '8', line: 'originals' })
    return items[0] ?? null
  },
)

const fmtCop = (n: number) =>
  new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(n)
</script>
