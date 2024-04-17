import Product from '#models/product'

export class FormatResponseValidationProduct {
  static simplifiedResults(product: Product, newPrice: number) {
    return {
      code: product.$attributes.code,
      name: product.$attributes.name,
      currentPrice: Number(product.$attributes.cost_price), // ou sales_price
      newPrice: newPrice,
    }
  }
}
