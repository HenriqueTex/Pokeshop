import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import Admin from '#models/admin'
import env from '#start/env'

const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email().maxLength(254),
    password: vine.string().minLength(10).maxLength(200),
  })
)

function serializeAdmin(admin: Admin) {
  return { id: admin.id, name: admin.name, email: admin.email }
}

export default class AdminSessionsController {
  async store({ request, auth, response }: HttpContext) {
    const origin = request.header('origin')
    const allowedOrigins = env
      .get('WEB_ORIGIN')
      .split(',')
      .map((value) => value.trim())
    if (!origin || !allowedOrigins.includes(origin)) {
      return response.forbidden({ message: 'Origem da requisição não permitida.' })
    }

    const { email, password } = await loginValidator.validate(request.all())

    try {
      const admin = await Admin.verifyCredentials(email, password)
      if (!admin.isActive || admin.role !== 'admin') {
        return response.unauthorized({ message: 'Credenciais inválidas.' })
      }
      await auth.use('web').login(admin)
      return { data: serializeAdmin(admin) }
    } catch {
      return response.unauthorized({ message: 'Credenciais inválidas.' })
    }
  }

  async show({ auth }: HttpContext) {
    const admin = auth.getUserOrFail()
    return { data: serializeAdmin(admin) }
  }

  async destroy({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.noContent()
  }
}
