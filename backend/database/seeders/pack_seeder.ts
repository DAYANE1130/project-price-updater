import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Pack from '#models/pack'

export default class extends BaseSeeder {
  async run() {
    const uniqueKey = 'pack_id'
    await Pack.updateOrCreateMany(uniqueKey, [
      { pack_id: 1000, product_id: 18, qty: 6 },
      { pack_id: 1010, product_id: 24, qty: 1 },
      { pack_id: 1010, product_id: 26, qty: 1 },
      { pack_id: 1020, product_id: 19, qty: 3 },
      { pack_id: 1020, product_id: 21, qty: 3 },
    ])
  }
}
