import type { IProduct } from '@/types/product-type'
import product_data from '@/data/product-data'

interface ApiProduct {
  id: number
  title: string
  slug: string
  description: string
  price: number
  price_usd: number
  price_usd_full?: number
  price_usd_sale?: number
  price_cop_sale?: number
  stock: number
  hauled_line: string
  images: string[]
  sizes: string[]
  is_active: boolean
  brand?: { name: string }
  category?: { name: string; slug: string }
}

interface ApiResponse {
  data: ApiProduct[]
  current_page?: number
  last_page?: number
  total?: number
}

const mapApiProduct = (p: ApiProduct): IProduct => ({
  id: String(p.id),
  sku: p.slug,
  title: p.title,
  slug: p.slug,
  description: p.description,
  img: p.images?.[0] ?? '/img/products/placeholder.jpg',
  imageURLs: (p.images ?? []).map((img) => ({
    color: { name: 'Default', clrCode: '#000' },
    img,
  })),
  parent: p.category?.name ?? '',
  children: '',
  price: p.price_cop_sale ?? p.price,
  priceUsd: p.price_usd_full != null ? p.price_usd_full / 100 : (p.price_usd ? p.price_usd / 100 : undefined),
  priceUsdSale: p.price_usd_sale != null ? p.price_usd_sale / 100 : undefined,
  priceCopSale: p.price_cop_sale,
  discount: 15,
  quantity: p.stock ?? 0,
  brand: { name: p.brand?.name ?? 'GASP' },
  category: { name: p.category?.name ?? '' },
  status: (p.stock ?? 0) > 0 ? 'in-stock' : 'out-of-stock',
  productType: 'fashion',
  hauledLine: (p.hauled_line as 'originals' | 'basics' | 'encargo') ?? 'originals',
  sizes: p.sizes ?? [],
  unit: '1pc',
  featured: false,
  sellCount: 0,
  tags: [],
  reviews: [],
  additionalInformation: [],
})

export function useProducts() {
  const config = useRuntimeConfig()
  const apiBase = (config.public.apiBase as string) || 'http://localhost:8000'

  const products = ref<IProduct[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const totalPages = ref(1)
  const usedFallback = ref(false)

  const fetchProducts = async (params: Record<string, string> = {}) => {
    loading.value = true
    error.value = null
    usedFallback.value = false
    try {
      const data = await $fetch<ApiResponse>(`${apiBase}/api/v1/products`, {
        params: { per_page: '60', ...params },
      })
      products.value = (data.data ?? []).map(mapApiProduct)
      totalPages.value = data.last_page ?? 1
    } catch (e) {
      console.error('useProducts: API unreachable, falling back to mock data', e)
      // Fallback: mostrar productos mock para evitar tienda vacía si la API está caída
      products.value = product_data
      usedFallback.value = true
      error.value = null
    } finally {
      loading.value = false
    }
  }

  return { products, loading, error, totalPages, usedFallback, fetchProducts }
}
