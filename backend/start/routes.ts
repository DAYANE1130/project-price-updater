/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
const UploadsController = () => import('#controllers/uploads_controller')

router.get('/', async () => {
  return {
    hello: 'helo word',
  }
})

router.group(() => {
  router.resource('api/upload', UploadsController).apiOnly()
})
