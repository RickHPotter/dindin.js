import jwt from 'jsonwebtoken' 

import { MSG } from '../models/concern.js'

import {
  _get_user_by
} from "../models/user.js"

// CONSTANTS
//
const JWT_PASSWORD = 'noot noot'

// VALIDATIONS
//
export const validate_token = async (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ mensagem: MSG.UNAUTHORISED })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, JWT_PASSWORD)
    const { rows, rowCount } = await _get_user_by({ id })
    const { senha, ...user } = rows[0]

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: MSG.VALID_TOKEN_NO_USER
      })
    }

    req.user_id = id
    req.user = user
  } catch (e) {
    return res.status(403).json({ 
      mensagem: MSG.INVALID_TOKEN,
    })
  }

  next()
} 

