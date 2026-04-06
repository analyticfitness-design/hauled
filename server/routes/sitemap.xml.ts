// Sitemap dinámico — incluye páginas estáticas + todos los productos GASP
import product_data from '~~/app/data/product-data';

export default defineEventHandler(async (event) => {
  const baseUrl = useRuntimeConfig().public.appUrl as string || 'https://hauled.shop';
  const today = new Date().toISOString().split('T')[0];

  const staticUrls = [
    { loc: '/', priority: 1.0, changefreq: 'daily' },
    { loc: '/shop', priority: 0.9, changefreq: 'daily' },
    { loc: '/encargos', priority: 0.9, changefreq: 'weekly' },
    { loc: '/about', priority: 0.6, changefreq: 'monthly' },
    { loc: '/contact', priority: 0.6, changefreq: 'monthly' },
    { loc: '/shop?category=camisetas', priority: 0.8, changefreq: 'weekly' },
    { loc: '/shop?category=pantalonetas', priority: 0.8, changefreq: 'weekly' },
    { loc: '/shop?category=pantalones', priority: 0.8, changefreq: 'weekly' },
    { loc: '/shop?category=accesorios', priority: 0.8, changefreq: 'weekly' },
    { loc: '/shop?category=zapatos', priority: 0.8, changefreq: 'weekly' },
  ];

  const productUrls = product_data
    .filter(p => p.brand?.name === 'GASP')
    .map(p => ({
      loc: `/product-details/${p.id}`,
      priority: 0.7,
      changefreq: 'weekly',
    }));

  const allUrls = [...staticUrls, ...productUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(u => `  <url>
    <loc>${baseUrl}${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  setHeader(event, 'Content-Type', 'application/xml; charset=utf-8');
  setHeader(event, 'Cache-Control', 'public, max-age=3600');
  return xml;
});
