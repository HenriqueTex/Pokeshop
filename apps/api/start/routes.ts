/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => ({ name: 'Triade Arte API', status: 'ok' }))

router.get('/api/v1/health', async () => ({ status: 'ok', service: 'triade-api' }))
