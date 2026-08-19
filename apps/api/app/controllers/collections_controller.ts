import type { HttpContext } from '@adonisjs/core/http'
import Collection from '#models/collection'

export default class CollectionsController {
  async index() {
    const collections = await Collection.query()
      .where('is_published', true)
      .orderBy('sort_order', 'asc')
      .orderBy('name', 'asc')
    return { data: collections }
  }

  async show({ params }: HttpContext) {
    const collection = await Collection.query()
      .where('slug', params.slug)
      .where('is_published', true)
      .firstOrFail()
    return { data: collection }
  }
}
