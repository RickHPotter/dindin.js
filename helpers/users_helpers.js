import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken' 

import { MSG } from "../models/user.js"

// PRIVATE
//
const JWT_PASSWORD = 'noot noot'

const validate_user_attributes = (model, attributes = []) => {
  const missing = Object.keys(model)
    .filter(e => !model[e] && model[e] !== 0)
    .filter(e => attributes.includes(e))

  return missing
}

// PUBLIC
//
export const prepare_create_update = async (req, res) => {
  const { nome, email, senha } = req.body
  const user = { nome, email, senha }
  const user_attributes = Object.keys(user)
  let error 

  const missing = validate_user_attributes(user, user_attributes)
  if (missing.length) {
    const attributes = missing.join(', ')
    error = res.status(400).json({ mensagem: MSG.MISSING_FIELDS + attributes + '.' })
  }

  const crypt = await bcrypt.hash(senha, 10)
  user.senha = crypt

  return { error, user }
}

export const pg_catch = (constraint) => {
  let status = 500
  const json = { }

  switch (constraint) {
    case 'usuarios_email_key':
      status = 400
      json.mensagem = MSG.EMAIL_TAKEN
      break
    default:
      json.mensagem = MSG.INTERNAL
  }

  return { status, json }
}

export const validate_pass = async (res, pass1, pass2) => {
  const is_valid = await bcrypt.compare(pass1, pass2)
  let error

  if (!is_valid) {
    error = res.status(400).json({
      mensagem: MSG.INVALID_PASSWORD
    })
  }

  return error
}

export const generate_token = (res, id) => {
  let error
  let token
  try {
    token = jwt.sign({ id }, JWT_PASSWORD, { expiresIn: '1h' }) 
  } catch (e) {
    error = res.status(500).json({ mensagem: MSG.INTERNAL })
  }

  return { error, token }
}

