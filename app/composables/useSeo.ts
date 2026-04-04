/**
 * useSeo — Helper para meta tags SEO en HAULED.
 * Optimizado para Google Colombia y búsquedas en español.
 */

interface SeoOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  precio?: number;
  disponibilidad?: 'in stock' | 'out of stock' | 'preorder';
}

export function useSeo(options: SeoOptions = {}) {
  const config = useRuntimeConfig();
  const route = useRoute();

  const siteName = 'HAULED';
  const baseUrl = config.public.appUrl as string;
  const defaultImage = `${baseUrl}/img/hauled-og.jpg`;

  const title = options.title ? `${options.title} — HAULED` : 'HAULED — Direct from the States · Colombia';
  const description = options.description
    ?? 'Ropa original de USA traída directamente a Colombia. Nike, Gap, Tommy, Jordan y más. Encargos a pedido. Envío a todo Colombia.';
  const image = options.image ?? defaultImage;
  const url = options.url ?? `${baseUrl}${route.path}`;

  useSeoMeta({
    title,
    ogTitle: title,
    description,
    ogDescription: description,
    ogImage: image,
    ogUrl: url,
    ogType: options.type ?? 'website',
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    // Colombia / LATAM
    ogLocale: 'es_CO',
  });

  // Schema.org Product para páginas de producto
  if (options.type === 'product' && options.precio) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Product',
            name: options.title,
            description: options.description,
            image: options.image,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'COP',
              price: options.precio,
              availability: `https://schema.org/${options.disponibilidad === 'in stock' ? 'InStock' : 'PreOrder'}`,
              seller: { '@type': 'Organization', name: 'HAULED' },
            },
          }),
        },
      ],
    });
  }

  // Schema.org Organization en home
  if (route.path === '/') {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'HAULED',
            url: baseUrl,
            logo: `${baseUrl}/img/logo/hauled-logo.png`,
            description: 'Tienda de ropa de USA para Colombia. Originals, Basics y Encargos a pedido.',
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'customer service',
              availableLanguage: 'Spanish',
            },
            sameAs: [
              'https://www.instagram.com/hauled.co',
              'https://www.tiktok.com/@hauled.co',
            ],
          }),
        },
      ],
    });
  }
}
