import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import PromotionalBanner from '#models/promotional_banner'

const bannerValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(180),
    subtitle: vine.string().trim().maxLength(5000).optional(),
    ctaLabel: vine.string().trim().minLength(2).maxLength(80),
    ctaUrl: vine.string().trim().maxLength(500),
    imageUrl: vine.string().trim().minLength(1).maxLength(2000),
    isActive: vine.boolean(),
    sortOrder: vine.number().min(0).withoutDecimals(),
  })
)

export default class AdminBannersController {
  async index() {
    const banners = await PromotionalBanner.query()
      .orderBy('sort_order', 'asc')
      .orderBy('created_at', 'desc')
    return { data: banners }
  }

  async store({ request, response }: HttpContext) {
    const banner = await PromotionalBanner.create(await bannerValidator.validate(request.all()))
    return response.created({ data: banner })
  }

  async update({ params, request }: HttpContext) {
    const banner = await PromotionalBanner.findOrFail(params.id)
    banner.merge(await bannerValidator.validate(request.all()))
    await banner.save()
    return { data: banner }
  }

  async destroy({ params, response }: HttpContext) {
    const banner = await PromotionalBanner.findOrFail(params.id)
    await banner.delete()
    return response.noContent()
  }
}
