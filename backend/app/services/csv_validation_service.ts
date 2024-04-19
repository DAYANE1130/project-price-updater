import Product from '#models/product'
import Pack from '#models/pack'
import { FormatResponseValidationProduct } from '#utils/format_response_validation_product'
import { updateProductValidator } from '#validators/product'
import { ProductSendByUser } from '../Interfaces/product_types.js'

export default class CSVValidationService {
  static async validateProductFields(data: any) {
    data.map((product: Product) => updateProductValidator.validate(product))
  }

  // static async validate(data: ProductSendByUser[]) {
  //   const products: any = await this.verifyExistProduct(data)
  //   const { existingProducts, productsNoExist } = products
  //   if (!existingProducts.length) {
  //     return productsNoExist
  //   } else if (existingProducts.length > 0 && productsNoExist.length > 0) {
  //     return { existingProducts, productsNoExist }
  //   }

  //   const errors = []
  //   errors.push(await this.validatePriceAboveCost(existingProducts, data))
  //   errors.push(await this.validatePriceChangeWithinLimit(existingProducts, data))
  //   // errors.push(this.validatePackagePrice(data))

  //   // const validationResults = await Promise.all(errors)
  //   // console.log("EUSOU ERRO E ABOVE", validationResults)

  //   // const errorMessages = validationResults.flat().filter((error) => error !== null)
  //   const [resultErrorsValidation] = errors
  //   const ResponseFormatProducts = FormatResponseValidationProduct.simplifiedResults(
  //     existingProducts,
  //     data
  //   )

  //   if (resultErrorsValidation.length > 0) {
  //     return errors
  //   } else {
  //     return ResponseFormatProducts
  //   }
  //   // return response
  // }

  static async coletarErros(existingProducts: any, data: ProductSendByUser[]) {
    const erros = []
    erros.push(await this.validatePriceAboveCost(existingProducts, data))
    erros.push(await this.validatePriceChangeWithinLimit(existingProducts, data))

    return erros
  }

  static async formatarResultadosValidacao(existingProducts: any, data: ProductSendByUser[]) {
    const ResponseFormatProducts = FormatResponseValidationProduct.simplifiedResults(
      existingProducts,
      data
    )

    return ResponseFormatProducts
  }

  static async validate(data: ProductSendByUser[]) {
    const products: any = await this.verifyExistProduct(data)
    const { existingProducts, productsNoExist } = products

    if (!existingProducts.length) {
      return productsNoExist
    } else if (!productsNoExist.length) {
      return existingProducts
      //tive que add, pois quando recebi somente casos de sucesso retornava um array vazio para produtos que não existem
    } else if (existingProducts.length > 0 && productsNoExist.length > 0) {
      return { existingProducts, productsNoExist }
    }

    const erros = await this.coletarErros(existingProducts, data)
    if (erros.length > 0) {
      return erros
    } else {
      return this.formatarResultadosValidacao(existingProducts, data)
    }
  }

  static async verifyExistProduct(data: ProductSendByUser[]) {
    const products = await Promise.all(
      data.map(async (item: any) => await Product.findBy('code', item.product_code))
    )

    const productsCodesSendByUser = data.map((item: any) => item.product_code)

    const productsNoExist = productsCodesSendByUser
      .filter((item, index) => item.product_code === products[index]?.code)
      .map((productCodeNotOk) => ({
        code: productCodeNotOk,
        message: 'Produto não encontrado',
      }))
    const existingProducts = products.filter((product) => product !== null)
    return { existingProducts, productsNoExist }
  }

  static async validatePriceAboveCost(products: any, data: ProductSendByUser[]) {
    const verifyPriceAboveCost = await Promise.all(
      products
        .map((item: Product, index: number) => {
          const ResponseErrorProduct = FormatResponseValidationProduct.simplifiedResultError(
            item,
            data,
            index
          )
          if (data[index].new_price < Number(item.$attributes.cost_price)) {
            return {
              ...ResponseErrorProduct,
              message: 'Novo preço está abaixo do preço de custo desse produto',
            }
          }
        })
        .filter(Boolean)
    )
    return verifyPriceAboveCost
  }

  static async validatePriceChangeWithinLimit(products: any, data: ProductSendByUser[]) {
    const verifyPriceChangeWithinLimit = await Promise.all(
      products.map(async (item: any, index: number) => {
        const currentPrice = Number(Number.parseFloat(item.$attributes.sales_price))
        const limit = currentPrice * 0.1
        const productAboveTenPerCent = Number((currentPrice + limit).toFixed(2))
        const productLessTenPerCent = Number((currentPrice - limit).toFixed(2))
        const ResponseErrorProduct = FormatResponseValidationProduct.simplifiedResultError(
          item,
          data,
          index
        )

        if (data[index].new_price > productAboveTenPerCent) {
          return {
            ...ResponseErrorProduct,
            message: 'O reajuste  é maior que 10% do preço atual do produto',
          }
        } else if (data[index].new_price < productLessTenPerCent) {
          return {
            ...ResponseErrorProduct,
            message: 'O reajuste  é menor que 10% do preço atual do produto',
          }
        }
      })
    )
    const result = verifyPriceChangeWithinLimit.filter(Boolean)
    return result
  }

  // acho que só funciona se for enviado apenas um pacote e produto componente
  // separar a função em duas, quanta coisas ela faz
  static async validatePackagePrice(data: ProductSendByUser[]) {
    let pricePack: number = 0
    let priceComponentProduct: number = 0
    let quantity: number = 0
    const errorPackPrice = []
    for (const product of data) {
      const findPack = await Pack.findBy('pack_id', product.product_code)
      if (findPack) {
        await Product.findBy('code', findPack.$attributes.product_id)
        pricePack = product.new_price
        quantity = findPack.$attributes.qty
      } else {
        const findComponent = await Product.findBy('code', product.product_code)
        if (findComponent) {
          priceComponentProduct = product.new_price
        }
      }
      const sumPriceComponents = priceComponentProduct * quantity
      // console.log(sumPriceComponents, pricePack) // 0 60
      if (sumPriceComponents !== pricePack) {
        errorPackPrice.push({
          code: product.product_code,
          message: 'A soma dos produtos é diferente do preço do pacote',
        })
      }
      return errorPackPrice
    }
    // const sumPriceComponents = priceComponentProduct * quantity
    // if (sumPriceComponents !== pricePack) {
    //   return 'A soma dos preços dos produtos componentes não é igual ao valor do pacote a ser reajustado'
    // }
    // console.log(sumPriceComponents, pricePack)
  }
}

//   static async validatePackagePrice(data: any) {
//     // entradas são 2 productsCode e 2 new_price
//     console.log('eu sou atributes', data)
//     let pricePack: number
//     let priceComponentProduct: number
//     let componentProduct: Product | null
//     const find = await Promise.all(
//       data.map(async (product: DataSendByCsv) => {
//         const findPack = await Pack.findBy('pack_id', product.product_code)
//         if (findPack) {
//           const findComponentProduct = await Product.findBy(
//             'code',
//             findPack?.$attributes.product_id
//           )
//           pricePack = product.new_price
//           componentProduct = findComponentProduct
//           // priceComponentProduct = findComponentProduct?.$attributes.sales_price
//         } else {
//           const findComponent = await Product.findBy('code', product.product_code)
//           if (findComponent !== undefined) {
//             priceComponentProduct = product.new_price
//           }
//         }

//         console.log(pricePack, priceComponentProduct)
//       })
//     )
//   }
// }

// static async validatePackagePrice(data: any) {
//   // entradas são 2 productsCode e 2 new_price
//   console.log('eu sou atributes', data)
//   let pricePack: number
//   let priceComponentProduct: number
//   let componentProduct: Product | null
//   const find = await Promise.all(

//     data.map(async (product: DataSendByCsv) => {
//       const findPack = await Pack.findBy('pack_id', product.product_code)
//       const findComponent = await Product.findBy('code', findPack?.$attributes.product_id)
//       if (findPack) {
//         const findComponentProduct = await Product.findBy(
//           'code',
//           findPack?.$attributes.product_id
//         )
//         pricePack = product.new_price
//         componentProduct = findComponentProduct
//         // priceComponentProduct = findComponentProduct?.$attributes.sales_price
//       }
//       if (componentProduct && componentProduct.$attributes.code === product.product_code) {
//         priceComponentProduct = product.new_price
//       }
//       console.log(pricePack, priceComponentProduct)
