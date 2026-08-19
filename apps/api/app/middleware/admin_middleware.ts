import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

const unsafeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

export default class AdminMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await ctx.auth.authenticate()
    const admin = ctx.auth.getUserOrFail()

    if (admin.role !== 'admin' || !admin.isActive) {
      return ctx.response.forbidden({ message: 'Acesso administrativo necessário.' })
    }

    if (unsafeMethods.has(ctx.request.method())) {
      const origin = ctx.request.header('origin')
      const allowedOrigins = env
        .get('WEB_ORIGIN')
        .split(',')
        .map((value) => value.trim())

      if (!origin || !allowedOrigins.includes(origin)) {
        return ctx.response.forbidden({ message: 'Origem da requisição não permitida.' })
      }
    }

    return next()
  }
}
