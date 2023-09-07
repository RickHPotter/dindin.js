import { pool } from './bd.js'

// CONSTANTS
//
export const MSG = {
  INTERNAL: 'Erro Interno do Servidor.',
  EMAIL_TAKEN: 'Já existe usuário cadastrado com o e-mail informado.',
  INVALID_EMAIL: 'Email inválido.',
  INVALID_PASSWORD: 'Senha inválido.',
  INVALID_TOKEN: 'Para acessar este recurso, um token de autenticação válido deve ser enviado.',
  UNAUTHORISED: 'Não Autorizado!',
  VALID_TOKEN_NO_USER: 'Usuário não mais existe. Contactar o banco pelo número 4402 8922.',
  MISSING_FIELDS: 'Campos Obrigatórios estão faltando: '
}

// SELECT
//
export const _get = async (table, fields = []) =>{
  const keys = Object.keys(fields)
  const values = Object.values(fields)
  let conditions = ''

  for (let i = 0; i < keys.length; i++) {
    conditions += ` AND ${keys[i]} = $${i + 1} `
  }

  const query = `
      SELECT * FROM ${table}
      WHERE 1 = 1
      ${conditions}
    `
  return await pool.query(query, values)
}

// INSERT
//
export const _create = async (table, attributes) => {
  const fields = Object.keys(attributes).join(', ')
  const values = Object.values(attributes)
  const format = values.map((_, index) => `$${index + 1}`).join(', ')

  const query = `
      INSERT INTO ${table} (${fields})
      VALUES (${format})
      RETURNING *
    `

  return await pool.query(query, values)
};

// UPDATE
//
export const _update = async (table, attributes, identifier) => { 
  const fields = Object.keys(attributes)
  const values = Object.values(attributes)

  const where = Object.keys(identifier).join(', ')
  const value = Object.values(identifier)

  const assignments = []

  for (let i = 0; i < fields.length; i++) {
    console.log(i)
    assignments.push(`${fields[i]} = $${[i + 1]}`)
  }

  const set = assignments.join(', ')

  const query = `
      UPDATE ${table}
      SET    ${set}
      WHERE  ${where} = $${fields.length + 1};
    `
  console.log(query)

  return await pool.query(query, [...values, value])
};

// DELETE
//
export const _delete = async (id) => { };

