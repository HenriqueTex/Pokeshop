import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { DateTime } from 'luxon'
import Collection from '#models/collection'
import Product from '#models/product'

const productValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(180),
    slug: vine.string().trim().minLength(2).maxLength(200),
    description: vine.string().trim().maxLength(5000).optional(),
    priceCents: vine.number().min(0).withoutDecimals(),
    stock: vine.number().min(0).withoutDecimals(),
    status: vine.enum(['draft', 'published', 'archived'] as const),
    productType: vine.string().trim().minLength(2).maxLength(80),
    coverImageUrl: vine.string().trim().url().maxLength(2000).optional(),
    isFeatured: vine.boolean(),
    collectionIds: vine.array(vine.number().positive().withoutDecimals()).maxLength(8),
  })
)

async function ensureCollectionsExist(collectionIds: number[], response: HttpContext['response']) {
  const uniqueIds = [...new Set(collectionIds)]
  if (!uniqueIds.length) return uniqueIds
  const count = await Collection.query().whereIn('id', uniqueIds).count('* as total')
  if (Number(count[0].$extras.total) !== uniqueIds.length) {
    response.badRequest({ message: 'Uma ou mais coleções selecionadas não existem.' })
    return undefined
  }
  return uniqueIds
}

function serialize(product: Product) {
  return product
}

export default class AdminProductsController {
  async index() {
    const products = await Product.query()
      .preload('collections')
      .preload('images', (query) => query.orderBy('sort_order', 'asc'))
      .orderBy('updated_at', 'desc')
    return { data: products.map(serialize) }
  }

  async store({ request, response }: HttpContext) {
    const { collectionIds, ...attributes } = await productValidator.validate(request.all())
    const validCollectionIds = await ensureCollectionsExist(collectionIds, response)
    if (!validCollectionIds) return

    const product = await Product.create({
      ...attributes,
      publishedAt: attributes.status === 'published' ? DateTime.now() : null,
    })
    await product.related('collections').sync(validCollectionIds)
    await product.load('collections')
    return response.created({ data: serialize(product) })
  }

  async update({ params, request, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const { collectionIds, ...attributes } = await productValidator.validate(request.all())
    const validCollectionIds = await ensureCollectionsExist(collectionIds, response)
    if (!validCollectionIds) return

    product.merge({
      ...attributes,
      publishedAt:
        attributes.status === 'published' ? (product.publishedAt ?? DateTime.now()) : null,
    })
    await product.save()
    await product.related('collections').sync(validCollectionIds)
    await product.load('collections')
    return { data: serialize(product) }
  }

  async destroy({ params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    await product.delete()
    return response.noContent()
  }
}
