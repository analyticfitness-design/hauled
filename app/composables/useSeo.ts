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
  // PDP extras
  sku?: string;
  brand?: string;
  slug?: string;
  // Encargo-specific: cuando no hay precio fijo pero el producto existe
  esEncargo?: boolean;
}

/** Mapea disponibilidad a la URL de schema.org correcta.
 *  Los encargos se marcan BackOrder (no InStock) para reflejar realidad. */
function schemaAvailability(disponibilidad?: SeoOptions['disponibilidad'], esEncargo?: boolean): string {
  if (esEncargo) return 'https://schema.org/BackOrder';
  if (disponibilidad === 'in stock') return 'https://schema.org/InStock';
  if (disponibilidad === 'preorder') return 'https://schema.org/PreOrder';
  return 'https://schema.org/OutOfStock';
}

export function useSeo(options: SeoOptions = {}) {
  const config = useRuntimeConfig();
  const route = useRoute();

  const siteName = 'HAULED';
  const baseUrl = config.public.appUrl as string;
  // hauled-og.jpg es 1920x960 — acepta FB/Twitter. Ideal sería 1200x630; pendiente recortar.
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
    // og:type "product" para PDPs; "website" para el resto
    ogType: options.type === 'product' ? 'product' : (options.type ?? 'website'),
    ogSiteName: siteName,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    // Colombia / LATAM
    ogLocale: 'es_CO',
  });

  // Schema.org Product para páginas de producto
  if (options.type === 'product') {
    const productUrl = url;
    const availability = schemaAvailability(options.disponibilidad, options.esEncargo);

    // Construir Offer: solo incluir precio si existe (encargos no tienen precio fijo)
    const offer: Record<string, unknown> = {
      '@type': 'Offer',
      priceCurrency: 'COP',
      availability,
      url: productUrl,
      seller: { '@type': 'Organization', name: 'HAULED' },
    };
    if (options.precio && options.precio > 0) {
      offer.price = options.precio;
    }
    // deliveryLeadTime para encargos (BackOrder)
    if (options.esEncargo) {
      offer.deliveryLeadTime = {
        '@type': 'QuantitativeValue',
        minValue: 15,
        maxValue: 30,
        unitCode: 'DAY',
      };
    }

    const productSchema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: options.title,
      description: options.description,
      url: productUrl,
      offers: offer,
    };
    if (options.image) productSchema.image = options.image;
    if (options.sku) productSchema.sku = options.sku;
    if (options.brand) {
      productSchema.brand = { '@type': 'Brand', name: options.brand };
    }

    useHead({
      script: [
        {
          type: 'application/ld+json',
          key: 'schema-product',
          innerHTML: JSON.stringify(productSchema),
        },
      ],
    });
  }

  // Schema.org Organization + WebSite + SearchAction en home
  if (route.path === '/') {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          key: 'schema-organization',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'HAULED',
            url: baseUrl,
            logo: `${baseUrl}/img/logo/logo.svg`,
            description: 'Tienda de ropa de USA para Colombia. GASP, Nike, Jordan y más. Encargos a pedido. Envío gratis en Bucaramanga.',
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
        {
          type: 'application/ld+json',
          key: 'schema-website',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'HAULED',
            url: baseUrl,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/shop?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        },
      ],
    });
  }
}
