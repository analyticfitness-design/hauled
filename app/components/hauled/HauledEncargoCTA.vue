<template>
  <section class="hk-encargo">
    <div class="hk-encargo-glow" />
    <div class="hk-encargo-inner">
      <div class="hk-encargo-head">
        <span class="hk-encargo-tag">Encargos USA → CO</span>
        <h2 class="hk-encargo-title">
          ¿No está aquí?<br /><span class="hk-accent">Lo traemos.</span>
        </h2>
        <p class="hk-encargo-lead">
          Nike, Supreme, Off-White, Air Jordan, Yeezy — cualquier marca, talla o colorway. Lo cargamos directo del source.
        </p>
        <div class="hk-encargo-actions">
          <a
            :href="`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hola HAULED, quiero iniciar un encargo 📦')}`"
            target="_blank"
            rel="noopener noreferrer"
            class="hk-btn-wa"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12.05 21.785h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.825 9.825 0 0 1 6.988 2.898 9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
            </svg>
            Iniciar encargo
          </a>
          <NuxtLink to="/encargos" class="hk-encargo-ghost">Ver cómo funciona →</NuxtLink>
        </div>
        <p class="hk-encargo-note">
          Cotización sin costo · 50% anticipo, 50% al llegar · Garantía de autenticidad
        </p>
      </div>
      <ol class="hk-encargo-steps">
        <li v-for="step in STEPS" :key="step.n" class="hk-encargo-step">
          <span class="hk-encargo-step-n">{{ step.n }}</span>
          <span class="hk-encargo-step-tx">
            <span class="hk-encargo-step-t">{{ step.t }}</span>
            <span class="hk-encargo-step-d">{{ step.d }}</span>
          </span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const whatsappNumber = (config.public.whatsappNumber as string) || '573000000000'

const STEPS = [
  { n: '01', t: 'Dinos qué quieres', d: 'Marca, modelo, talla o un link.' },
  { n: '02', t: 'Cotizamos en 24h', d: 'Precio final en pesos. Sin sorpresas.' },
  { n: '03', t: 'Lo cargamos', d: 'Tu pedido viaja directo desde USA.' },
  { n: '04', t: 'Te lo entregamos', d: '8–12 días hábiles en Colombia.' },
]
</script>
