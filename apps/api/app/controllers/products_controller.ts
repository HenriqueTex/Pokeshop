import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'

const maxPageSize = 48
const availabilityValues = ['in_stock', 'pre_sale', 'sold_out'] as const

function positiveInteger(value: unknown, fallback: number, maximum: number) {
  const parsed = Number.parseInt(String(value), 10)
  return Number.isInteger(parsed) && parsed > 0 ? Math.min(parsed, maximum) : fallback
}

function nonNegativeInteger(value: unknown) {
  const parsed = Number.parseInt(String(value), 10)
  return Number.isInteger(parsed) && parsed >= 0 ? parsed : undefined
}

function textInput(value: unknown, maximum = 120) {
  return typeof value === 'string' && value.trim().length > 0
    ? value.trim().slice(0, maximum)
    : undefined
}

export default class ProductsController {
  async index({ request }: HttpContext) {
    const page = positiveInteger(request.input('page'), 1, 10_000)
    const perPage = positiveInteger(request.input('perPage'), 24, maxPageSize)
    const queryText = textInput(request.input('q'))
    const collection = textInput(request.input('collection'))
    const productType = textInput(request.input('type'), 80)
    const availability = textInput(request.input('availability'), 20)
    const minPrice = nonNegativeInteger(request.input('minPrice'))
    const maxPrice = nonNegativeInteger(request.input('maxPrice'))
    const sort = request.input('sort')

    const productsQuery = Product.query()
      .where('status', 'published')
      .whereNotNull('published_at')
      .preload('collections', (collectionsQuery) => {
        collectionsQuery.where('is_published', true).orderBy('sort_order', 'asc')
      })
      .preload('images', (imagesQuery) => imagesQuery.orderBy('sort_order', 'asc'))

    if (queryText) productsQuery.whereILike('name', `%${queryText}%`)
    if (productType) productsQuery.where('product_type', productType)
    if (collection) {
      productsQuery.whereHas('collections', (collectionsQuery) => {
        collectionsQuery.where('slug', collection).where('is_published', true)
      })
    }
    if (
      availability &&
      availabilityValues.includes(availability as (typeof availabilityValues)[number])
    ) {
      productsQuery.where('availability', availability)
    }
    if (minPrice !== undefined) productsQuery.where('price_cents', '>=', minPrice)
    if (maxPrice !== undefined) productsQuery.where('price_cents', '<=', maxPrice)

    switch (sort) {
      case 'price-asc':
        productsQuery.orderBy('price_cents', 'asc')
        break
      case 'price-desc':
        productsQuery.orderBy('price_cents', 'desc')
        break
      case 'newest':
        productsQuery.orderBy('release_date', 'desc')
        break
      default:
        productsQuery.orderBy('is_featured', 'desc').orderBy('published_at', 'desc')
    }

    const products = await productsQuery.paginate(page, perPage)

    return { data: products.all(), meta: products.getMeta() }
  }

  async show({ params }: HttpContext) {
    const product = await Product.query()
      .where('slug', params.slug)
      .where('status', 'published')
      .whereNotNull('published_at')
      .preload('collections', (collectionsQuery) => {
        collectionsQuery.where('is_published', true).orderBy('sort_order', 'asc')
      })
      .preload('images', (imagesQuery) => imagesQuery.orderBy('sort_order', 'asc'))
      .firstOrFail()

    return { data: product }
  }
}
