/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const AdminBannersController = () => import('#controllers/admin_banners_controller')
const AdminCollectionsController = () => import('#controllers/admin_collections_controller')
const AdminProductsController = () => import('#controllers/admin_products_controller')
const AdminSessionsController = () => import('#controllers/admin_sessions_controller')
const AdminUploadsController = () => import('#controllers/admin_uploads_controller')
const CollectionsController = () => import('#controllers/collections_controller')
const HomeController = () => import('#controllers/home_controller')
const ProductsController = () => import('#controllers/products_controller')
const MediaController = () => import('#controllers/media_controller')

router.get('/', async () => ({ name: 'PokeShop API', status: 'ok' }))

router.get('/api/v1/health', async () => ({ status: 'ok', service: 'pokeshop-api' }))
router.get('/api/v1/media/:filename', [MediaController, 'show'])

router
  .group(() => {
    router.get('/home', [HomeController, 'index'])
    router.get('/products', [ProductsController, 'index'])
    router.get('/products/:slug', [ProductsController, 'show'])
    router.get('/collections', [CollectionsController, 'index'])
    router.get('/collections/:slug', [CollectionsController, 'show'])
  })
  .prefix('/api/v1')

router.post('/api/v1/admin/session', [AdminSessionsController, 'store'])

router
  .group(() => {
    router.get('/session', [AdminSessionsController, 'show'])
    router.delete('/session', [AdminSessionsController, 'destroy'])

    router.get('/products', [AdminProductsController, 'index'])
    router.post('/products', [AdminProductsController, 'store'])
    router.put('/products/:id', [AdminProductsController, 'update'])
    router.delete('/products/:id', [AdminProductsController, 'destroy'])

    router.get('/collections', [AdminCollectionsController, 'index'])
    router.post('/collections', [AdminCollectionsController, 'store'])
    router.put('/collections/:id', [AdminCollectionsController, 'update'])
    router.delete('/collections/:id', [AdminCollectionsController, 'destroy'])

    router.get('/banners', [AdminBannersController, 'index'])
    router.post('/banners', [AdminBannersController, 'store'])
    router.put('/banners/:id', [AdminBannersController, 'update'])
    router.delete('/banners/:id', [AdminBannersController, 'destroy'])

    router.post('/uploads', [AdminUploadsController, 'store'])
  })
  .prefix('/api/v1/admin')
  .use(middleware.admin())
