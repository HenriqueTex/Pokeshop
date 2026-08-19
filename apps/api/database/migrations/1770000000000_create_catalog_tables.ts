import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('collections', (table) => {
      table.increments('id').notNullable()
      table.string('name', 160).notNullable()
      table.string('slug', 180).notNullable().unique()
      table.text('description').nullable()
      table.text('image_url').nullable()
      table.text('banner_url').nullable()
      table.integer('sort_order').notNullable().defaultTo(0)
      table.boolean('is_published').notNullable().defaultTo(false).index()
      table.timestamps(true, true)
    })

    this.schema.createTable('products', (table) => {
      table.increments('id').notNullable()
      table.string('name', 180).notNullable()
      table.string('slug', 200).notNullable().unique()
      table.text('description').nullable()
      table.integer('price_cents').unsigned().notNullable()
      table.integer('stock').unsigned().notNullable().defaultTo(0)
      table.string('status', 20).notNullable().defaultTo('draft').index()
      table.string('product_type', 80).notNullable().index()
      table.text('cover_image_url').nullable()
      table.date('release_date').nullable()
      table.boolean('is_featured').notNullable().defaultTo(false).index()
      table.timestamp('published_at', { useTz: true }).nullable().index()
      table.timestamps(true, true)
      table.index(['status', 'product_type'])
      table.index(['status', 'is_featured'])
    })

    this.schema.createTable('product_collections', (table) => {
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table
        .integer('collection_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('collections')
        .onDelete('CASCADE')
      table.primary(['product_id', 'collection_id'])
    })

    this.schema.createTable('product_images', (table) => {
      table.increments('id').notNullable()
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .index()
      table.text('url').notNullable()
      table.string('alt_text', 255).nullable()
      table.integer('sort_order').notNullable().defaultTo(0)
      table.timestamps(true, true)
    })

    this.schema.createTable('promotional_banners', (table) => {
      table.increments('id').notNullable()
      table.string('title', 180).notNullable()
      table.text('subtitle').nullable()
      table.string('cta_label', 80).notNullable()
      table.string('cta_url', 500).notNullable()
      table.text('image_url').notNullable()
      table.timestamp('starts_at', { useTz: true }).nullable()
      table.timestamp('ends_at', { useTz: true }).nullable()
      table.boolean('is_active').notNullable().defaultTo(false).index()
      table.integer('sort_order').notNullable().defaultTo(0)
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable('promotional_banners')
    this.schema.dropTable('product_images')
    this.schema.dropTable('product_collections')
    this.schema.dropTable('products')
    this.schema.dropTable('collections')
  }
}
