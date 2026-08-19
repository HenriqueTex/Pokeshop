import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Collection from '#models/collection'

const collectionValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(160),
    slug: vine.string().trim().minLength(2).maxLength(180),
    description: vine.string().trim().maxLength(5000).optional(),
    imageUrl: vine.string().trim().url().maxLength(2000).optional(),
    bannerUrl: vine.string().trim().url().maxLength(2000).optional(),
    sortOrder: vine.number().min(0).withoutDecimals(),
    isPublished: vine.boolean(),
  })
)

export default class AdminCollectionsController {
  async index() {
    const collections = await Collection.query().orderBy('sort_order', 'asc').orderBy('name', 'asc')
    return { data: collections }
  }

  async store({ request, response }: HttpContext) {
    const payload = await collectionValidator.validate(request.all())
    const collection = await Collection.create(payload)
    return response.created({ data: collection })
  }

  async update({ params, request }: HttpContext) {
    const collection = await Collection.findOrFail(params.id)
    collection.merge(await collectionValidator.validate(request.all()))
    await collection.save()
    return { data: collection }
  }

  async destroy({ params, response }: HttpContext) {
    const collection = await Collection.findOrFail(params.id)
    await collection.delete()
    return response.noContent()
  }
}
