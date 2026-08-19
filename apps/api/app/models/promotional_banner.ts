import { BaseModel, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'

export default class PromotionalBanner extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare subtitle: string | null

  @column()
  declare ctaLabel: string

  @column()
  declare ctaUrl: string

  @column()
  declare imageUrl: string

  @column.dateTime()
  declare startsAt: DateTime | null

  @column.dateTime()
  declare endsAt: DateTime | null

  @column()
  declare isActive: boolean

  @column()
  declare sortOrder: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
