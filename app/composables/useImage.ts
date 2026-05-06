/**
 * useImage — Generador de URLs Cloudflare Images con transformaciones on-the-fly.
 *
 * La API de Cloudflare Image Resizing se activa en el path:
 *   /cdn-cgi/image/{options}/{image-path}
 *
 * Uso:
 *   const image = useImage()
 *   image.cardUrl('products/gasp-1.jpg')
 *   // → https://cdn.hauled.shop/cdn-cgi/image/width=600,quality=82,format=auto/products/gasp-1.jpg
 */
export function useImage() {
  const config = useRuntimeConfig()
  const cdnBase = (config.public.cdnUrl as string).replace(/\/$/, '')

  /**
   * Devuelve true si `src` ya es una URL absoluta (http:// / https://)
   * o un path absoluto local (/img/...) que vive en el public/ de Nuxt.
   * Estos casos se pasan sin modificar — no aplica CDN transformation.
   */
  function isPassthrough(src: string): boolean {
    return src.startsWith('http://') || src.startsWith('https://') || src.startsWith('/')
  }

  /**
   * Construye la URL de transformación de Cloudflare Images.
   * Solo actúa sobre paths relativos de R2 (ej: "products/foo.jpg").
   * Paths locales y URLs absolutas se devuelven sin modificar.
   */
  function transform(path: string, opts: Record<string, string | number> = {}): string {
    if (!path) return ''
    if (isPassthrough(path)) return path

    const params = Object.entries(opts)
      .map(([k, v]) => `${k}=${v}`)
      .join(',')

    // Quitar slash inicial para evitar doble barra
    const cleanPath = path.replace(/^\//, '')

    return `${cdnBase}/cdn-cgi/image/${params}/${cleanPath}`
  }

  /**
   * Imagen de tarjeta de producto (600 px de ancho, calidad 82).
   * Uso principal: ProductItem, grid de catálogo.
   */
  function cardUrl(path: string): string {
    return transform(path, { width: 600, quality: 82, format: 'auto' })
  }

  /**
   * Miniatura (300 px, calidad 75).
   * Uso: carrito, wishlist, thumbnails de swiper nav.
   */
  function thumbnailUrl(path: string): string {
    return transform(path, { width: 300, quality: 75, format: 'auto' })
  }

  /**
   * Imagen hero de pantalla completa (1920 px, calidad 85).
   * Uso: hero-banners, banners de portada.
   */
  function heroUrl(path: string): string {
    return transform(path, { width: 1920, quality: 85, format: 'auto' })
  }

  /**
   * Genera un srcset con múltiples anchos en formato auto (jpeg/webp según soporte del navegador).
   * Ejemplo: "…/width=300,…/img.jpg 300w, …/width=600,…/img.jpg 600w"
   */
  function srcset(path: string, widths: number[] = [300, 600, 900]): string {
    return widths
      .map((w) => `${transform(path, { width: w, quality: 80, format: 'auto' })} ${w}w`)
      .join(', ')
  }

  /**
   * srcset exclusivo en AVIF.
   * Devuelve '' para paths locales o URLs externas — en esos casos
   * Cloudflare no puede transformar el formato, así que omitimos el <source>.
   */
  function avifSrcset(path: string, widths: number[] = [300, 600, 900]): string {
    if (!path || isPassthrough(path)) return ''
    return widths
      .map((w) => `${transform(path, { width: w, quality: 80, format: 'avif' })} ${w}w`)
      .join(', ')
  }

  /**
   * srcset exclusivo en WebP.
   * Devuelve '' para paths locales o URLs externas.
   */
  function webpSrcset(path: string, widths: number[] = [300, 600, 900]): string {
    if (!path || isPassthrough(path)) return ''
    return widths
      .map((w) => `${transform(path, { width: w, quality: 80, format: 'webp' })} ${w}w`)
      .join(', ')
  }

  return {
    cardUrl,
    thumbnailUrl,
    heroUrl,
    srcset,
    avifSrcset,
    webpSrcset,
    /** Expuesto para casos de uso custom que necesiten transformaciones arbitrarias. */
    transform,
  }
}
