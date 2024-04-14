import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'packs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.bigInteger('pack_id').notNullable()
      table.bigInteger('product_id').notNullable()
      table.bigInteger('qty').notNullable()
      table.foreign('pack_id').references('code').inTable('products').onDelete('CASCADE')
      table.foreign('product_id').references('code').inTable('products').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
