import jwt from 'jsonwebtoken' 

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
    return res.status(401).json({ mensagem: 'Não Autorizado.' })
  }

  const token = authorization.split(' ')[1]

  try {
    const { id } = jwt.verify(token, JWT_PASSWORD)
    const { rows, rowCount } = await _get_user_by({ id })
    const { senha, ...user } = rows[0]

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: 'Usuário não mais existe. Contactar o banco pelo número 4402 8922.'
      })
    }

    req.user_id = id
    req.user = user
  } catch (e) {
    return res.status(401).json({ 
      mensagem: "Para acessar este recurso um token de autenticação válido deve ser enviado."
    })
  }

  next()
} 

