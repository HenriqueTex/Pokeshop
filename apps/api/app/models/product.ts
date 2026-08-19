import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import { DateTime } from 'luxon'
import Collection from '#models/collection'
import ProductImage from '#models/product_image'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare priceCents: number

  @column()
  declare stock: number

  @column()
  declare status: 'draft' | 'published' | 'archived'

  @column()
  declare productType: string

  @column()
  declare coverImageUrl: string | null

  @column.date()
  declare releaseDate: DateTime | null

  @column()
  declare isFeatured: boolean

  @column.dateTime()
  declare publishedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Collection, { pivotTable: 'product_collections' })
  declare collections: ManyToMany<typeof Collection>

  @hasMany(() => ProductImage)
  declare images: HasMany<typeof ProductImage>
}
