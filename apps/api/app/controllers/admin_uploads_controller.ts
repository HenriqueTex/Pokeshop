import { randomUUID } from 'node:crypto'
import { mkdir } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'

const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp']

export default class AdminUploadsController {
  async store({ request, response }: HttpContext) {
    const image = request.file('image', {
      size: '5mb',
      extnames: allowedExtensions,
    })

    if (!image) {
      return response.badRequest({ message: 'Envie uma imagem.' })
    }
    if (!image.isValid || !image.extname) {
      return response.badRequest({ message: 'Use JPG, PNG ou WebP com até 5 MB.' })
    }

    const uploadsDirectory = app.makePath('storage/uploads')
    await mkdir(uploadsDirectory, { recursive: true })

    const filename = `${randomUUID()}.${image.extname.toLowerCase()}`
    await image.move(uploadsDirectory, { name: filename, overwrite: false })

    if (image.hasErrors) {
      return response.badRequest({ message: 'Não foi possível salvar a imagem.' })
    }

    return response.created({ data: { url: `/api/v1/media/${filename}` } })
  }
}
