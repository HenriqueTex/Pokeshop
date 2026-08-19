import type { HttpContext } from '@adonisjs/core/http'
import Collection from '#models/collection'
import Product from '#models/product'
import PromotionalBanner from '#models/promotional_banner'

export default class HomeController {
  async index({ request }: HttpContext) {
    const productLimit = Math.min(
      Math.max(Number.parseInt(String(request.input('limit', 8)), 10) || 8, 1),
      12
    )
    const now = new Date()

    const [banners, featured, latest, collections] = await Promise.all([
      PromotionalBanner.query()
        .where('is_active', true)
        .where((query) => {
          query.whereNull('starts_at').orWhere('starts_at', '<=', now)
        })
        .where((query) => {
          query.whereNull('ends_at').orWhere('ends_at', '>=', now)
        })
        .orderBy('sort_order', 'asc'),
      Product.query()
        .where('status', 'published')
        .whereNotNull('published_at')
        .where('is_featured', true)
        .preload('collections')
        .orderBy('published_at', 'desc')
        .limit(productLimit),
      Product.query()
        .where('status', 'published')
        .whereNotNull('published_at')
        .preload('collections')
        .orderBy('release_date', 'desc')
        .limit(productLimit),
      Collection.query().where('is_published', true).orderBy('sort_order', 'asc').limit(8),
    ])

    return { data: { banners, featured, latest, collections } }
  }
}
