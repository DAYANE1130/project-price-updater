import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Pack from './pack.js'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare code: number

  @column()
  declare name: string

  @column()
  declare cost_price: number

  @column()
  declare sales_price: number

  @manyToMany(() => Pack)
  declare pack: ManyToMany<typeof Pack>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
