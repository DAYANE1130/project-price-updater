import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.bigInteger('code').notNullable().primary()
      table.string('name', 100).notNullable()
      table.decimal('cost_price', 9, 2).notNullable()
      table.decimal('sales_price', 9, 2).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
