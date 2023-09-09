// @params
// id SERIAL PRIMARY KEY,
// descricao VARCHAR(120) NOT NULL,
// valor DECIMAL(10, 2) NOT NULL,
// data DATE NOT NULL,
// categoria_id INT NOT NULL,
// usuario_id INT NOT NULL,
// tipo VARCHAR(36) NOT NULL
//

import { 
  select,
  insert,
  update,
  delete_from,
  raw
} from './concern.js'

// CONSTANTS
//
const TABLE = 'TRANSACOES'

// SELECT
//
export const _get_user_transactions_by = async (fields) =>{
  return await select(TABLE, fields)
}

// INSERT
//
export const _create_transaction = async (transaction_attributes) => { 
  return await insert(TABLE, transaction_attributes)
}

// UPDATE
//
export const _update_transaction = async (transaction_attributes, id) => {
  return await update(TABLE, transaction_attributes, id)
}

// DELETE
//
export const _delete_transaction = async (id) => {
  return await delete_from(TABLE, id)
}

// USER INTERACTIONS
//
export const _get_bank_statement = async () => {
  const query = `SELECT TIPO, SUM(VALOR) FROM TRANSACOES GROUP BY TIPO;`
  return await raw(query)
}

