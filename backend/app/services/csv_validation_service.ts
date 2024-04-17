import Product from '#models/product'
import Pack from '#models/pack'
//import { FormatResponseValidationProduct } from '#utils/format_response_validation_product'
import { updateProductValidator } from '#validators/product'

export default class CSVValidationService {
  static async validateProductFields(row: any) {
    row.map((product: Product) => updateProductValidator.validate(product))
  }

  static async validate(row: any) {
    // corrigir tipo any
    //const product = await Product.findByOrFail('code', row.product_code)
    const productCodes = row.map((item: any) => item.product_code)
    const products = await Product.query().whereIn('code', productCodes)
    const errors = []
    errors.push(this.validatePriceAboveCost(row))
    errors.push(this.validatePriceChangeWithinLimit(products, row))
    this.validatePackagePrice(row)
    // const response = FormatResponseValidationProduct.simplifiedResults(product, row.new_price)
    return products
  }

  static async validatePriceAboveCost(row: any) {
    // const arr: any = []
    // let isPriceAboveCost = false

    // for (const product of row) {
    //   const findProduct = await Product.findBy('code', product.product_code)
    //   if (product.new_price < findProduct?.$attributes.cost_price) {
    //     arr.push([product.new_price, findProduct?.$attributes.cost_price]) // pushing an array to keep both values
    //     isPriceAboveCost = true;
    //   }
    // }
    const verifyPriceIsAbove = await Promise.all(
      row.map(async (item: any) => {
        const findProduct = await Product.findBy('code', item.product_code)
        if (item.new_price < findProduct?.$attributes.cost_price) {
          return {
            code: item.product_code,
            message: 'O novo preço é menor que o preço de custo',
          }
        }
      })
    )
    return verifyPriceIsAbove
    // console.log("eu sou abovecost", verifyPriceIsAbove)
    // if (isPriceAboveCost) {
    //   return 'O novo preço é menor que o preço de custo.'
    // }
    // for (const product of row) {
    //   const findProduct = await Product.findBy('code', product.product_code)
    //   if (product.new_price > findProduct?.$attributes.cost_price) {
    //     arr.push(product.new_price)
    //     return 'O novo preço é maior que o preço de custo.'

    //   } else {
    //     null
    //   }
    // }
    // console.log("eu sou abovecost", arr)
    // return newPrice > product.$attributes.cost_price
    //   ? 'O novo preço é maior que o preço de custo.'
    //   : null
  }

  static async validatePriceChangeWithinLimit(product: any, row: any) {
    // add um filter para limpar os undefineds e enviar somnte os erros para o front
    const verifyPriceChangeWithinLimit = await Promise.all(
      row.map(async (item: any, index: number) => {
        const tenPercent = product.$attributes.sales_price[index] * 0.1
        const productMoreTenPerCent = product.$attributes.sales_price[index] + tenPercent
        const productLessTenPerCent = product.$attributes.sales_price[index] - tenPercent

        if (item.newPrice > productMoreTenPerCent) {
          return {
            code: item.product_code,
            message: 'O reajuste  é maior que 10% do preço atual do produto',
          }
        } else if (item.newPrice < productLessTenPerCent) {
          return {
            code: item.product_code,
            message: 'O reajuste  é menor que 10% do preço atual do produto',
          }
        }
      })
    )
    return verifyPriceChangeWithinLimit
  }

  // static async validatePriceChangeWithinLimit(product : any , newPrice: any) {
  //   const tenPercent = product.$attributes.sales_price * 0.1
  //   const productMoreTenPerCent = product.$attributes.sales_price + tenPercent
  //   const productLessTenPerCent = product.$attributes.sales_price - tenPercent

  //   if (newPrice > productMoreTenPerCent) {
  //     return 'O reajuste  é maior que 10% do preço atual do produto'
  //   } else if (newPrice < productLessTenPerCent) {
  //     return 'O reajuste  é menor que 10% do preço atual do produto'
  //   }
  // }

  // acho que só funciona se for enviado apenas um pacote e produto componente
  static async validatePackagePrice(row: any) {
    let pricePack: number = 0
    let priceComponentProduct: number = 0
    let quantity: number = 0
    const errorPackPrice = []
    for (const product of row) {
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
      if (sumPriceComponents !== pricePack) {
        errorPackPrice.push({
          code: row.product_code,
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

//   static async validatePackagePrice(row: any) {
//     // entradas são 2 productsCode e 2 new_price
//     console.log('eu sou atributes', row)
//     let pricePack: number
//     let priceComponentProduct: number
//     let componentProduct: Product | null
//     const find = await Promise.all(
//       row.map(async (product: DataSendByCsv) => {
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

// static async validatePackagePrice(row: any) {
//   // entradas são 2 productsCode e 2 new_price
//   console.log('eu sou atributes', row)
//   let pricePack: number
//   let priceComponentProduct: number
//   let componentProduct: Product | null
//   const find = await Promise.all(

//     row.map(async (product: DataSendByCsv) => {
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
