import Product from '#models/product'
import { ProductSendByUser } from '../Interfaces/product_types.js'

export class FormatResponseValidationProduct {
  static simplifiedResults(products: any, data: ProductSendByUser[]) {
    // if (!products || products.existingProducts) {
    //   return [] // ou você pode retornar algum tipo de mensagem de erro aqui
    // }
    const formatResponseProducts = products.map((product: Product, index: number) => {
      let priceCurrent = Number.parseFloat(product.$attributes.sales_price)
      return {
        code: product.$attributes.code,
        name: product.$attributes.name,
        current_price: Number(priceCurrent.toFixed(2)),
        new_price: data[index].new_price,
      }
    })
    return formatResponseProducts
  }

  static simplifiedResultError(product: Product, data: ProductSendByUser[], index: number) {
    return {
      code: product.$attributes.code,
      name: product.$attributes.name,
      current_price: Number(product.$attributes.sales_price),
      new_price: data[index].new_price,
    }
  }
}
