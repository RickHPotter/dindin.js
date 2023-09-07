// @params
// id SERIAL PRIMARY KEY,
// descricao VARCHAR(120) NOT NULL
//

import { _get } from './concern.js'

// CONSTANTS
//
const TABLE = 'CATEGORIAS'

// SELECT
//
export const _get_category = async () =>{
  return await _get(TABLE)
}

export const _get_category_by = async (fields) =>{
  return await _get(TABLE, fields)
}

