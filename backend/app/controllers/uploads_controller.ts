import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import * as fs from 'node:fs'
import * as csv from 'fast-csv'
import CSVValidationService from '#services/csv_validation_service'
import Product from '#models/product'

export default class UploadsController {
  // private csvValidationService = new CSVValidationService()
  /**
   * Display a list of resource
   */
  // async index({ }: HttpContext) { }

  /**
   * Display form to create a new record
   */
  // async create({ }: HttpContext) { }

  /**
   * Handle form submission for the create action
   */

  // async processCsv(file: MultipartFile | null) {
  //   return new Promise((resolve, reject) => {
  //     const validationResults: any = []
  //     //@ts-ignore
  //     fs.createReadStream('./uploads/' + file.fileName)
  //       .pipe(csv.parse({ headers: true }))
  //       .on('data', async (row) => {
  //         row.product_code = Number.parseInt(row.product_code, 10)
  //         row.new_price = Number.parseFloat(row.new_price)
  //         await updateProductValidator.validate(row)
  //         const validationResult = await this.csvValidationService.validate(row)
  //         console.log('first', validationResult)
  //         validationResults.push(validationResult)
  //         console.log('eu sou o array', validationResults)
  //       })
  //       .on('end', () => {
  //         console.log('CSV file successfully processed')
  //         resolve(validationResults)
  //       })
  //       .on('error', (error) => {
  //         console.log('An error occurred:', error)
  //         reject(error)
  //       })
  //   })
  // }

  async processCsv(file: MultipartFile | null) {
    return new Promise((resolve, reject) => {
      const validationPromises: any = []
      //@ts-ignore
      fs.createReadStream('./uploads/' + file.fileName)
        .pipe(csv.parse({ headers: true }))
        .on('data', (row) => {
          row.product_code = Number.parseInt(row.product_code, 10)
          row.new_price = Number.parseFloat(row.new_price)
          // const validationResultPromise = updateProductValidator
          //   .validate(row)
          //   .then(() => CSVValidationService.validate(row))
          validationPromises.push(row)
        })
        .on('end', () => {
          Promise.all(validationPromises)
            .then((validationResults) => {
              console.log('CSV file successfully processed')
              resolve(validationResults)
            })
            .catch(reject)
        })
        .on('error', (error) => {
          console.log('An error occurred:', error)
          reject(error)
        })
    })
  }

  async store({ request, response }: HttpContext) {
    const arquivo: MultipartFile | null = request.file('meuArquivo', {
      size: '2mb',
      extnames: ['csv'],
    })
    //@ts-ignore
    if (!arquivo.isValid) {
      return response.badRequest({
        //@ts-ignore
        errors: arquivo.errors,
      })
    } //@ts-ignore
    await arquivo.move(app.makePath('uploads'), {
      //@ts-ignore
      name: `${cuid()}.${arquivo.extname}`,
    })
    const arrayOfReadCsv = await this.processCsv(arquivo)
    await CSVValidationService.validateProductFields(arrayOfReadCsv)
    const resultValidation = await CSVValidationService.validate(arrayOfReadCsv)
    // await CSVValidationService.validatePriceAboveCost(arrayOfReadCsv)
    return resultValidation
    // try {
    // } catch (error) {
    //   console.log(error.message)
    // }
  }
  // REVER SOBRE COMO FAZER ESSA ATUALIZAÇÃO POIS AS VALIDAÇÕES FORAM FEITAS NA STORE
  // TEM QUE FAZER AQUI NOVAMENTE?
  // async update({ params, request }: HttpContext) {
  //   const { product_code, name, sales_price, new_price } = request.all()
  //   // await updateProductValidator.validate(request.all())
  //   const product = await Product.findOrFail(product_code)
  //   const updatedProduct = await product.merge(request.all()).save()
  //   return updatedProduct
  // }
}
