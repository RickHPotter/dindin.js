import express from 'express'

import {
  validate_token
} from '../controllers/middleware.js'

import {
  create_user,
  login,
  get_user,
  update_user
} from '../controllers/users_controller.js'

import {
  get_categories
} from '../controllers/categories_controller.js'

import {
  get_user_transactions,
  get_user_transaction,
  create_transaction,
  update_transaction,
  delete_transaction
} from '../controllers/transactions_controller.js'

const routes = express()

routes.post('/usuario', create_user)
routes.post('/login', login)

// TOKEN_VALIDATION
//
routes.use(validate_token)
routes.get('/usuario', get_user)
routes.put('/usuario', update_user)

routes.get('/categoria', get_categories)
routes.get('/transacao', get_user_transactions)
routes.get('/transacao/:id', get_user_transaction)
routes.post('/transacao', create_transaction)
routes.put('/transacao/:id', update_transaction)
routes.delete('/transacao/:id', delete_transaction)

export { routes } 

