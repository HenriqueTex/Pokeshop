/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const CollectionsController = () => import('#controllers/collections_controller')
const HomeController = () => import('#controllers/home_controller')
const ProductsController = () => import('#controllers/products_controller')

router.get('/', async () => ({ name: 'Triade Arte API', status: 'ok' }))

router.get('/api/v1/health', async () => ({ status: 'ok', service: 'triade-api' }))

router
  .group(() => {
    router.get('/home', [HomeController, 'index'])
    router.get('/products', [ProductsController, 'index'])
    router.get('/products/:slug', [ProductsController, 'show'])
    router.get('/collections', [CollectionsController, 'index'])
    router.get('/collections/:slug', [CollectionsController, 'show'])
  })
  .prefix('/api/v1')
