import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken' 

import { MSG } from '../models/concern.js'

// PRIVATE
//
const JWT_PASSWORD = 'noot noot'

const validate_model_attributes = (model, attributes = []) => {
  const missing = Object.keys(model)
    .filter(e => !model[e] && model[e] !== 0)
    .filter(e => attributes.includes(e))

  return missing
}

// PUBLIC
//
export const prepare_user = async (req, res) => {
  const { nome, email, senha } = req.body
  const user = { nome, email, senha }
  const user_attributes = Object.keys(user)
  let error 

  const missing = validate_model_attributes(user, user_attributes)
  if (missing.length) {
    const attributes = missing.join(', ')
    error = res.status(400).json({ mensagem: MSG.MISSING_FIELDS + attributes + '.' })
  }

  const crypt = await bcrypt.hash(senha, 10)
  user.senha = crypt

  return { error, user }
}

export const prepare_transaction = async (req, res) => {
  const { tipo, descricao, valor, data, categoria_id } = req.body
  const transaction = { tipo, descricao, valor, data, usuario_id: req.user_id, categoria_id }
  const transaction_attributes = Object.keys(transaction)
  let error 

  const missing = validate_model_attributes(transaction, transaction_attributes)
  if (missing.length) {
    const attributes = missing.join(', ')
    error = res.status(400).json({ mensagem: MSG.MISSING_FIELDS + attributes + '.' })
  }

  transaction.tipo = tipo.toLowerCase()

  if (transaction.tipo !== 'entrada' && transaction.tipo !== 'saida') {
    error = res.status(400).json({ mensagem: MSG.INVALID_TYPE })
  }

  return { error, transaction }
}

export const pg_catch = (constraint) => {
  let status = 400
  const json = { }

  switch (constraint) {
    case 'usuarios_email_key':
      json.mensagem = MSG.EMAIL_TAKEN
      break
    case 'transacoes_categoria_id_fkey':
      json.messagem = MSG.INVALID_CATEGORY
      break
    case 'transacoes_usuario_id_fkey':
      json.messagem = MSG.VALID_TOKEN_NO_USER
      break
    default:
      status = 500
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

