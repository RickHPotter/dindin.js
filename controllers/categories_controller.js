import { MSG } from '../models/concern.js'

import {
  _get_category,
  _get_category_by
} from "../models/category.js"

// READ
//
export const get_categories = async (_, res) => { 
  try {
    const { rows, rowCount } = await _get_category()
    
    if (rowCount === 0) {
      return res.status(400).json({
        mensagem: MSG.VALID_TOKEN_NO_USER
      })
    }

    return res.json(rows)
  } catch (e) {
    return res.status(500).json({
      mensagem: MSG.INTERNAL,
    })
  }
}

