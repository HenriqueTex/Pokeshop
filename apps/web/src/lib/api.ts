export type Collection = {
  id: number
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  bannerUrl: string | null
}

export type Product = {
  id: number
  name: string
  slug: string
  description: string | null
  priceCents: number
  stock: number
  productType: string
  coverImageUrl: string | null
  isFeatured: boolean
  collections: Collection[]
}

export type PromotionalBanner = {
  id: number
  title: string
  subtitle: string | null
  ctaLabel: string
  ctaUrl: string
  imageUrl: string
}

type Paginated<T> = {
  data: T[]
  meta: { total: number; perPage: number; currentPage: number; lastPage: number }
}

export type HomeData = {
  banners: PromotionalBanner[]
  featured: Product[]
  latest: Product[]
  collections: Collection[]
}

export type ProductFilters = {
  collection?: string
  type?: string
  availability?: string
  sort?: string
}

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

async function request<T>(path: string) {
  const response = await fetch(`${apiUrl}${path}`)
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo.')
  return response.json() as Promise<T>
}

export function fetchHome() {
  return request<{ data: HomeData }>('/api/v1/home')
}

export function fetchCollections() {
  return request<{ data: Collection[] }>('/api/v1/collections')
}

export function fetchProducts(filters: ProductFilters) {
  const search = new URLSearchParams()
  Object.entries(filters).forEach(([key, value]) => {
    if (value) search.set(key, value)
  })
  const suffix = search.size > 0 ? `?${search}` : ''
  return request<Paginated<Product>>(`/api/v1/products${suffix}`)
}

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceCents / 100)
}
