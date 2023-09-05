import {
  user_create 
} from "../models/user.js"

// READ
//
export const get_user = (_, res) => {  }

export const get_users = (req, res) => { }

// CREATE
//
export const create_user = async (req, res) => {
  const { nome, email, senha } = req.body

  const user = { nome, email, senha }
  const user_attributes = Object.keys(user)

  for (const field of user_attributes) {
    if (!user[field]) {
      return res.status(400).json({ error: `O campo ${field} é obrigatório.` })
    }
  }

  try {
    const { rows } = await user_create(user)
    const usuario = {
      id: rows[0].id,
      nome: rows[0].nome,
      email: rows[0].email,
    }

    return res.status(201).json(usuario)
  } catch (e) {
    return res.status(500).json({ 
      error: 'Erro Interno do Servidor.',
      cause: e.detail
    })
  }
}

// UPDATE
//
export const update_bank_account_user = (req, res) => { }

// DELETE
//
export const delete_bank_account = (req, res) => { }

