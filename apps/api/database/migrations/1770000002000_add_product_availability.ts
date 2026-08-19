import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('products', (table) => {
      table.string('availability', 20).notNullable().defaultTo('in_stock').index()
    })
  }

  async down() {
    this.schema.alterTable('products', (table) => {
      table.dropColumn('availability')
    })
  }
}
