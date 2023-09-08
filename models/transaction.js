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
  _get,
  _create,
  _update,
  _delete
} from './concern.js'

// CONSTANTS
//
const TABLE = 'TRANSACOES'

// SELECT
//
export const _get_user_transactions_by = async (fields) =>{
  return await _get(TABLE, fields)
}

// INSERT
//
export const _create_transaction = async (transaction_attributes) => { 
  return await _create(TABLE, transaction_attributes)
};

// UPDATE
//
export const _update_transaction = async (transaction_attributes) => { };

// DELETE
//
export const _delete_transaction = async (id) => { };

// USER INTERACTIONS
//
export const _get_bank_statement = async (user_id) => { };

