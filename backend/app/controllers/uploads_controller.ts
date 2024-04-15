import type { HttpContext } from '@adonisjs/core/http'
import { cuid } from '@adonisjs/core/helpers'
import app from '@adonisjs/core/services/app'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import * as fs from 'node:fs'
//import * as path from 'node:path'
import * as csv from 'fast-csv'

export default class UploadsController {
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
    //@ts-ignore
    fs.createReadStream('./uploads/' + arquivo.fileName)
      .pipe(csv.parse({ headers: true })) // primeira linha são os cabeçalhos
      .on('error', (error) => console.error(error)) // caso algum erro ocorra
      .on('data', (row) => console.log(row)) // convertetendo cada linha em um objeto js
      .on('end', (rowCount: number) => console.log(`Parsed ${rowCount} rows`)) // analise concluida e informa numero de linhas analisadas
  }
  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  // /**
  //  * Edit individual record
  //  */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete record
  //  */
  // async destroy({ params }: HttpContext) {}
}
