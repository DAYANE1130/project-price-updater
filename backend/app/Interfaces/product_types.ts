export type ProductSendByUser = {
  product_code: number
  new_price: number
  index: any
}

export interface Product {
  code: number
  name: string
  costPrice: string
  salesPrice: string
  createdAt: string
  updatedAt: string
}

export interface ExistingProductsResult {
  existingProducts: (Product | null)[]
  productsNoExist: {
    code: any
    message: string
  }[]
  productsExist?: undefined
}

export interface ProductsExistResult {
  productsExist: (Product | null)[]
  existingProducts?: undefined
  productsNoExist?: undefined
}

export type VerifyProductResult = ExistingProductsResult | ProductsExistResult | undefined
