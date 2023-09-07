// @params
// id SERIAL PRIMARY KEY,
// nome VARCHAR(120) NOT NULL,
// email VARCHAR(100) UNIQUE NOT NULL,
// senha VARCHAR(256) NOT NULL
//

import { 
  _get,
  _create,
  _update
} from './concern.js'

// CONSTANTS
//
const TABLE = 'USUARIOS'

// SELECT
//
export const _get_user = async () => {
  return await _get(TABLE)
}

export const _get_user_by = async (fields) => {
  return await _get(TABLE, fields)
}

// INSERT
//
export const _create_user = async (user_attributes) => {
  return await _create(TABLE, user_attributes)
};

// UPDATE
//
export const _update_user = async (user_attributes, id) => {
  return await _update(TABLE, user_attributes, id)
};

