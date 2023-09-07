import { MSG } from '../models/concern.js'

import {
  _get_category,
  _get_category_by
} from "../models/category.js"

// READ
//
export const get_categories = async (_, res) => { 
  try {
    const { rows } = await _get_category()
    
    return res.json(rows)
  } catch (e) {
    return res.status(500).json({
      mensagem: MSG.INTERNAL,
    })
  }
}

export const get_category_by = async (_, res, id) => { 
  try {
    const { rows } = await _get_category_by({ id })
    
    return res.json(rows)
  } catch (e) {
    return res.status(500).json({
      mensagem: MSG.INTERNAL,
    })
  }
}

