import { MSG } from '../models/concern.js'

import {
  _get_user_transactions_by,
  _create_transaction
} from "../models/transaction.js"

import {
  _get_category_by
} from "../models/category.js"

import {
  prepare_transaction,
  pg_catch
} from './concern.js'


// HELPERS
//
const transaction_with_category = async (transaction) => {
  const { rows: category } = await _get_category_by({ id: transaction.categoria_id })
  const { descricao: categoria_descricao  } = category[0]

  return {
    id: transaction.id,
    tipo :transaction.tipo,
    descricao: transaction.descricao,
    valor: transaction.valor,
    data: transaction.data,
    usuario_id: transaction.usuario_id,
    categoria_id: transaction.categoria_id,
    categoria_descricao
  }
}

// READ
//
export const get_user_transactions = async (req, res) => { 
  try {
    const { rows: transactions } = await _get_user_transactions_by({ usuario_id: req.user_id })

    let json = []
    for (const transaction of transactions) {
      const element = await transaction_with_category(transaction)
      json.push(element)
    }

    return res.json(json)
  } catch (e) {
    return res.status(500).json({
      mensagem: MSG.INTERNAL,
    })
  }
}

// CREATE
//
export const create_transaction = async (req, res) => {
  const { error, transaction } = await prepare_transaction(req, res)

  if (error) return error

  try {
    const { rows } = await _create_transaction(transaction)
    const transaction_created = rows[0]
    const element = await transaction_with_category(transaction_created)

    return res.status(201).json(element)
  } catch (e) {
    const { status, json } = pg_catch(e.constraint)
    return res.status(status).json(json)
  }
}

