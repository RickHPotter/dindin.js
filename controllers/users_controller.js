import bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken' 

import {
  _get_user_by_email,
  _create_user 
} from "../models/user.js"

// CONSTANTS
//
const JWT_PASSWORD = 'noot noot'

// READ
//
export const get_user = (_, res) => {  }

// CREATE
//
export const create_user = async (req, res) => {
  const { nome, email, senha } = req.body
  const crypt = await bcrypt.hash(senha, 10)

  const user = { nome, email, senha: crypt }
  const user_attributes = Object.keys(user)

  for (const field of user_attributes) {
    if (!user[field]) {
      return res.status(400).json({ error: `O campo ${field} é obrigatório.` })
    }
  }

  try {
    const { rows } = await _create_user(user)
    const usuario = rows[0]
    delete usuario.senha

    return res.status(201).json(usuario)
  } catch (e) {
    let status = 500
    const obj = { }

    switch (e.constraint) {
      case 'usuarios_email_key':
        status = 400
        obj['mensagem'] = 'Já existe usuário cadastrado com o e-mail informado.'
        break
      default:
        obj['mensagem'] = 'Erro Interno do Servidor.'
    }
    
    return res.status(status).json(obj)
  }
}

// UPDATE
//
export const update_user = (req, res) => { }

// DELETE
//
export const delete_user = (req, res) => { }

// LOGIN
//
export const login = async (req, res) => {
  const { email, senha } = req.body
  const login = { email, senha }

  for (const attribute of ['email', 'senha']) {
    if (!login[attribute]) {
      return res.status(400).json({
        messagem: `Campo ${attribute} precisa ser informado.`
      })
    }
  }

  try {
    const { rows, rowCount } = await _get_user_by_email(email)
    const user = rows[0]

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: 'Email inválido.'
      })
    }

    const is_valid_pass = await bcrypt.compare(senha, user.senha)

    if (!is_valid_pass) {
      return res.status(400).json({
        mensagem: 'Senha inválido(s).'
      })
    }

    // generate JWT
    const token = jwt.sign({ id: user.id }, JWT_PASSWORD, { expiresIn: '1h' })
    delete user.senha

    return res.status(201).json({ usuario: user, token })
  } catch (e) {
    return res.status(500).json({
      mensagem: 'Erro Interno do Servidor.',
      cause: e
    })
  }
}

