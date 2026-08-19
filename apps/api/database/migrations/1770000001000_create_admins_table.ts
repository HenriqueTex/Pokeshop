import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.createTable('admins', (table) => {
      table.increments('id').notNullable()
      table.string('name', 120).notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('password', 255).notNullable()
      table.string('role', 30).notNullable().defaultTo('admin')
      table.boolean('is_active').notNullable().defaultTo(true).index()
      table.timestamps(true, true)
    })
  }

  async down() {
    this.schema.dropTable('admins')
  }
}
