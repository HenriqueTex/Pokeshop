import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import app from '@adonisjs/core/services/app'
import type { HttpContext } from '@adonisjs/core/http'

const mediaFilename = /^[0-9a-f-]{36}\.(jpg|jpeg|png|webp)$/
const contentTypes: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
}

export default class MediaController {
  async show({ params, response }: HttpContext) {
    const filename = params.filename
    const extension = typeof filename === 'string' ? filename.split('.').at(-1) : undefined

    if (!filename || !extension || !mediaFilename.test(filename)) {
      return response.notFound()
    }

    const filePath = app.makePath(`storage/uploads/${filename}`)
    try {
      const file = await stat(filePath)
      if (!file.isFile()) return response.notFound()
    } catch {
      return response.notFound()
    }

    response.header('Content-Type', contentTypes[extension])
    response.header('Cache-Control', 'public, max-age=31536000, immutable')
    return response.stream(createReadStream(filePath))
  }
}
