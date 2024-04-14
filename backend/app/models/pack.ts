import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class Pack extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare pack_id: number

  @column()
  declare product_id: number

  @column()
  declare qty: number

  @manyToMany(() => Product)
  declare product: ManyToMany<typeof Product>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
