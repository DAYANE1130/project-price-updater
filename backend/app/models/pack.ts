import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Pack extends BaseModel {
  @column({ isPrimary: true })
  declare id: bigint

  @column()
  declare pack_id: number

  @column()
  declare product_id: number

  @column()
  declare qty: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
