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
export const _get_user_transactions_by = async (fields, raw_conditions = '') =>{
  const keys = Object.keys(fields)
  const values = Object.values(fields)
  let conditions = ''

  for (let i = 0; i < keys.length; i++) {
    conditions += `AND T.${keys[i]} = ${values[i]} `
  }

  const query = `
    SELECT
      T.ID, T.TIPO, T.DESCRICAO, T.VALOR, T.DATA, T.USUARIO_ID,
      T.CATEGORIA_ID, C.DESCRICAO AS CATEGORIA_DESCRICAO
    FROM TRANSACOES T
    INNER JOIN CATEGORIAS C
    ON C.ID = T.CATEGORIA_ID
    WHERE 1 = 1
      ${conditions}
      ${raw_conditions};
  `

  return await raw(query)
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

