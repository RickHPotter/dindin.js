// @params
// id SERIAL PRIMARY KEY,
// nome VARCHAR(120) NOT NULL,
// email VARCHAR(100) UNIQUE NOT NULL,
// senha VARCHAR(256) NOT NULL
//

import { 
  select,
  insert,
  update
} from './concern.js'

// CONSTANTS
//
const TABLE = 'USUARIOS'

// SELECT
//
export const _get_user = async () => {
  return await select(TABLE)
}

export const _get_user_by = async (fields) => {
  return await select(TABLE, fields)
}

// INSERT
//
export const _create_user = async (user_attributes) => {
  return await insert(TABLE, user_attributes)
}

// UPDATE
//
export const _update_user = async (user_attributes, id) => {
  return await update(TABLE, user_attributes, id)
}

