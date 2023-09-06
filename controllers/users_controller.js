import {
  MSG,
  _get_user_by,
  _create_user,
  _update_user,
} from "../models/user.js"

import {
  prepare_create_update,
  pg_catch,
  validate_pass,
  generate_token
} from '../helpers/users_helpers.js'

// READ
//
export const get_user = (req, res) => { return res.json(req.user) }

// CREATE
//
export const create_user = async (req, res) => {
  const { error, user } = await prepare_create_update(req, res)

  if (error) return error

  try {
    const { rows } = await _create_user(user)
    const { senha, ...user_created } = rows[0]

    return res.status(201).json(user_created)
  } catch (e) {
    const { status, json } = pg_catch(e.constraint)
    return res.status(status).json(json)
  }
}

// UPDATE
//
export const update_user = async (req, res) => {
  const { error, user } = await prepare_create_update(req, res)

  if (error) return error

  try {
    await _update_user({ ...user, id: req.user_id })

    return res.status(204).send()
  } catch (e) {
    const { status, json } = pg_catch(e.constraint)
    return res.status(status).json(json)
  }
}

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
    const { rows, rowCount } = await _get_user_by({ email })
    const { senha: password, ...user } = rows[0]

    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: MSG.INVALID_EMAIL
      })
    }

    const invalid = await validate_pass(res, senha, password) 
    if (invalid) return invalid

    const { error, token } = generate_token(user.id)
    if (error) return error

    return res.status(201).json({ usuario: user, token })
  } catch (e) {
    return res.status(500).json({
      mensagem: MSG.INTERNAL,
      cause: e
    })
  }
}

