import express from 'express'

import {
  create_user
} from '../controllers/users_controller.js'

const routes = express()

routes.post('/usuario', create_user)

export { routes } 

