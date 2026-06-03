<script setup lang="ts">
// HauledLogo — marca canónica de Hauled (§9.2): wordmark APILADO HAU / LED
// con barra cyan. Fuente: public/hauled-logo.svg. Único logo del sitio —
// reemplaza los lockups tipográficos sueltos de header y footer.
// El sello "USA → CO" (Cargo-Tag) es un eyebrow complementario, NO el logo.
withDefaults(defineProps<{
  to?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'light' | 'dark'
}>(), {
  to: '/',
  size: 'md',
  variant: 'light',
})
</script>

<template>
  <NuxtLink
    :to="to"
    class="hauled-logo"
    :class="[`hauled-logo--${size}`, `hauled-logo--${variant}`]"
    aria-label="HAULED"
  >
    <span class="hauled-logo__stack" aria-hidden="true">
      <span class="hauled-logo__line">HAU</span>
      <span class="hauled-logo__line">LED</span>
    </span>
    <span class="hauled-logo__bar" aria-hidden="true" />
  </NuxtLink>
</template>

<style scoped>
.hauled-logo {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.18em;
  text-decoration: none;
  line-height: 0.92;
  flex-shrink: 0;
}
.hauled-logo__stack {
  display: flex;
  flex-direction: column;
}
.hauled-logo__line {
  font-family: var(--hauled-font-display, 'Raleway', sans-serif);
  font-weight: 900;
  font-size: var(--logo-size, 1.4rem);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--logo-ink, #fff);
  transition: color var(--hauled-dur-fast, 200ms) var(--hauled-ease, ease);
}
.hauled-logo__bar {
  display: block;
  width: 1.9em;
  height: 0.13em;
  margin-top: 0.05em;
  background: var(--hauled-accent, #4cc9f0);
  transition: width var(--hauled-dur-fast, 200ms) var(--hauled-ease, ease);
}
.hauled-logo:hover .hauled-logo__bar { width: 2.6em; }
.hauled-logo:focus-visible {
  outline: 2px solid var(--hauled-accent, #4cc9f0);
  outline-offset: 4px;
}

/* Tamaños — la barra escala con em respecto al tamaño del texto */
.hauled-logo--sm { --logo-size: 1.05rem; }
.hauled-logo--md { --logo-size: clamp(1.2rem, 3vw, 1.55rem); }
.hauled-logo--lg { --logo-size: 1.85rem; }

/* Variantes de tinta — la barra siempre es cyan */
.hauled-logo--light { --logo-ink: #fff; }
.hauled-logo--dark { --logo-ink: var(--hauled-ink, #111); }
.hauled-logo--light:hover .hauled-logo__line,
.hauled-logo--dark:hover .hauled-logo__line { color: var(--hauled-accent, #4cc9f0); }
</style>
