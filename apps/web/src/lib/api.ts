export type Collection = {
  id: number
  name: string
  slug: string
  description: string | null
  imageUrl: string | null
  bannerUrl: string | null
  sortOrder?: number
  isPublished?: boolean
}

export type Product = {
  id: number
  name: string
  slug: string
  description: string | null
  priceCents: number
  stock: number
  status?: 'draft' | 'published' | 'archived'
  productType: string
  coverImageUrl: string | null
  isFeatured: boolean
  collections: Collection[]
  images?: ProductImage[]
}

export type ProductImage = {
  id: number
  url: string
  altText: string | null
  sortOrder: number
}

export type CollectionDetails = Collection & { products: Product[] }

export type PromotionalBanner = {
  id: number
  title: string
  subtitle: string | null
  ctaLabel: string
  ctaUrl: string
  imageUrl: string
  isActive?: boolean
  sortOrder?: number
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

export type Admin = { id: number; name: string; email: string }

export type AdminProductInput = {
  name: string
  slug: string
  description?: string
  priceCents: number
  stock: number
  status: 'draft' | 'published' | 'archived'
  productType: string
  coverImageUrl?: string
  isFeatured: boolean
  collectionIds: number[]
}

export type AdminCollectionInput = {
  name: string
  slug: string
  description?: string
  imageUrl?: string
  bannerUrl?: string
  sortOrder: number
  isPublished: boolean
}

export type AdminBannerInput = {
  title: string
  subtitle?: string
  ctaLabel: string
  ctaUrl: string
  imageUrl: string
  isActive: boolean
  sortOrder: number
}

const apiUrl = import.meta.env.VITE_API_URL ?? 'http://localhost:3333'

async function request<T>(path: string) {
  const response = await fetch(`${apiUrl}${path}`)
  if (!response.ok) throw new Error('Não foi possível carregar o catálogo.')
  return response.json() as Promise<T>
}

async function adminRequest<T>(path: string, init?: RequestInit) {
  const response = await fetch(`${apiUrl}${path}`, {
    ...init,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...init?.headers },
  })
  if (!response.ok) {
    const body = await response.json().catch(() => undefined)
    throw new Error(body?.message ?? body?.errors?.[0]?.message ?? 'Não foi possível concluir a operação.')
  }
  return response.status === 204 ? undefined : (response.json() as Promise<T>)
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

export function fetchProduct(slug: string) {
  return request<{ data: Product }>(`/api/v1/products/${slug}`)
}

export function fetchCollection(slug: string) {
  return request<{ data: CollectionDetails }>(`/api/v1/collections/${slug}`)
}

export function fetchAdminSession() {
  return adminRequest<{ data: Admin }>('/api/v1/admin/session')
}

export function loginAdmin(email: string, password: string) {
  return adminRequest<{ data: Admin }>('/api/v1/admin/session', {
    method: 'POST', body: JSON.stringify({ email, password }),
  })
}

export function logoutAdmin() {
  return adminRequest<void>('/api/v1/admin/session', { method: 'DELETE' })
}

export function fetchAdminProducts() {
  return adminRequest<{ data: Product[] }>('/api/v1/admin/products')
}

export function saveAdminProduct(input: AdminProductInput, id?: number) {
  return adminRequest<{ data: Product }>(`/api/v1/admin/products${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify({
      ...input,
      description: input.description || undefined,
      coverImageUrl: input.coverImageUrl || undefined,
    }),
  })
}

export function deleteAdminProduct(id: number) {
  return adminRequest<void>(`/api/v1/admin/products/${id}`, { method: 'DELETE' })
}

export function fetchAdminCollections() {
  return adminRequest<{ data: Collection[] }>('/api/v1/admin/collections')
}

export function saveAdminCollection(input: AdminCollectionInput, id?: number) {
  return adminRequest<{ data: Collection }>(`/api/v1/admin/collections${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST',
    body: JSON.stringify({
      ...input,
      description: input.description || undefined,
      imageUrl: input.imageUrl || undefined,
      bannerUrl: input.bannerUrl || undefined,
    }),
  })
}

export function deleteAdminCollection(id: number) {
  return adminRequest<void>(`/api/v1/admin/collections/${id}`, { method: 'DELETE' })
}

export function fetchAdminBanners() {
  return adminRequest<{ data: PromotionalBanner[] }>('/api/v1/admin/banners')
}

export function saveAdminBanner(input: AdminBannerInput, id?: number) {
  return adminRequest<{ data: PromotionalBanner }>(`/api/v1/admin/banners${id ? `/${id}` : ''}`, {
    method: id ? 'PUT' : 'POST', body: JSON.stringify(input),
  })
}

export function deleteAdminBanner(id: number) {
  return adminRequest<void>(`/api/v1/admin/banners/${id}`, { method: 'DELETE' })
}

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(priceCents / 100)
}
