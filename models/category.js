// @params
// id SERIAL PRIMARY KEY,
// descricao VARCHAR(120) NOT NULL
//

import { select } from './concern.js'

// CONSTANTS
//
const TABLE = 'CATEGORIAS'

// SELECT
//
export const _get_category = async () =>{
  return await select(TABLE)
}

export const _get_category_by = async (fields) =>{
  return await select(TABLE, fields)
}

