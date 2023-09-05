import express from 'express'

import {
  validate_token
} from '../controllers/middleware.js'

import {
  create_user,
  login,
} from '../controllers/users_controller.js'

const routes = express()

routes.post('/usuario', create_user)
routes.post('/login', login)

export { routes } 

