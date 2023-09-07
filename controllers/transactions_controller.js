import { MSG } from '../models/concern.js'

import {
  _get_user_transactions_by
} from "../models/transaction.js"

import {
  _get_category_by
} from "../models/category.js"

// READ
//
export const get_user_transactions = async (req, res) => { 
  try {
    const { rows: transactions } = await _get_user_transactions_by({ usuario_id: req.user_id })

    let json = []
    for (const transaction of transactions) {
      const { rows: category } = await _get_category_by({ id: transaction.categoria_id })
      const { descricao: categoria_descricao  } = category[0]

      const element = { 
        id: transaction.id, 
        tipo :transaction.tipo,
        descricao: transaction.descricao, 
        valor: transaction.valor, 
        data: transaction.data, 
        usuario_id: transaction.usuario_id,
        categoria_id: transaction.categoria_id,
        categoria_descricao 
      }

      json.push(element)
    }

    return res.json(json)
  } catch (e) {
    return res.status(500).json({
      mensagem: MSG.INTERNAL,
    })
  }
}

