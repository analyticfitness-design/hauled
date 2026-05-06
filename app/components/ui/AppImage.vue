<template>
  <!--
    AppImage — Componente de imagen responsiva con soporte Cloudflare Images.

    Genera un <picture> con fuentes AVIF, WebP y fallback automático.
    Pasa atributos extra (class, style, etc.) directamente al <img> via $attrs.

    Props:
      src       — Path relativo ("products/foto.jpg") o URL absoluta.
      alt       — Texto alternativo obligatorio (accesibilidad).
      sizes     — Hint de tamaño para el navegador (CSS media queries).
      priority  — true → loading="eager" fetchpriority="high" (imágenes LCP).
      width     — Ancho intrínseco (px) para evitar layout shift.
      height    — Alto intrínseco (px) para evitar layout shift.
      widths    — Array de anchos para el srcset (default: [300, 600, 900]).

    Ejemplo básico (tarjeta de producto):
      <AppImage :src="item.img" :alt="item.title" class="img-fluid" />

    Ejemplo hero (LCP crítico):
      <AppImage
        :src="slide.img"
        alt="Banner principal"
        :priority="true"
        sizes="100vw"
        class="img-fluid w-100"
      />
  -->
  <picture>
    <!-- AVIF: mejor compresión, soportado por Chrome/Firefox/Safari 16+ -->
    <source
      v-if="computedAvifSrcset"
      :srcset="computedAvifSrcset"
      type="image/avif"
      :sizes="sizes"
    />
    <!-- WebP: fallback ampliamente soportado -->
    <source
      v-if="computedWebpSrcset"
      :srcset="computedWebpSrcset"
      type="image/webp"
      :sizes="sizes"
    />
    <!--
      img base: recibe $attrs para que clases Bootstrap (img-fluid, w-100, etc.)
      se apliquen directamente aquí y no en el <picture>.
    -->
    <img
      :src="fallbackSrc"
      :srcset="computedSrcset"
      :sizes="sizes"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
      v-bind="$attrs"
    />
  </picture>
</template>

<script setup lang="ts">
/**
 * inheritAttrs: false permite que los $attrs (class, style, data-*, etc.)
 * se apliquen manualmente en el <img> en lugar del <picture> raíz.
 */
defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /** Path relativo desde la raíz del CDN o URL absoluta. */
    src: string
    /** Texto alternativo — obligatorio para accesibilidad. */
    alt: string
    /**
     * CSS media-query hint para que el navegador calcule el tamaño de descarga.
     * Default cubre el caso más común (columna 1/2 en desktop, full en móvil).
     */
    sizes?: string
    /**
     * Marcar como true en imágenes que son el LCP del viewport
     * (primer slide de hero, portada de colección, etc.).
     * Activa loading="eager" y fetchpriority="high".
     */
    priority?: boolean
    /** Ancho intrínseco en píxeles — evita layout shift (CLS). */
    width?: number | string
    /** Alto intrínseco en píxeles — evita layout shift (CLS). */
    height?: number | string
    /** Puntos de ruptura del srcset en píxeles. */
    widths?: number[]
  }>(),
  {
    sizes: '(max-width: 768px) 100vw, 50vw',
    priority: false,
    widths: () => [300, 600, 900],
  }
)

const image = useImage()

/** srcset AVIF — se omite si src es vacío o externo sin transformación disponible. */
const computedAvifSrcset = computed(() => image.avifSrcset(props.src, props.widths))

/** srcset WebP. */
const computedWebpSrcset = computed(() => image.webpSrcset(props.src, props.widths))

/** srcset en formato auto (jpeg/webp decidido por Cloudflare según Accept header). */
const computedSrcset = computed(() => image.srcset(props.src, props.widths))

/**
 * URL fallback para navegadores que no leen srcset (extremadamente raro en 2024,
 * pero necesario para SSR hydration y crawlers).
 * Usa cardUrl (600 px) como tamaño razonable en la mayoría de contextos.
 */
const fallbackSrc = computed(() => image.cardUrl(props.src))
</script>
