import { pool } from './bd.js'

export const _create_user = async (user_attributes) => {
  const { nome, email, senha } = user_attributes;

  const query = `
      INSERT INTO USUARIOS (NOME, EMAIL, SENHA)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    return await pool.query(query, [nome, email, senha])
};

export const _get_user = async (conditions = '', terms = []) =>{
  const query = `
      SELECT * FROM USUARIOS
      WHERE 1 = 1
      ${conditions}
    `
  return await pool.query(query, terms)
}

export const _get_user_by = async (obj) =>{
  const keys = Object.keys(obj)
  const values = Object.values(obj)
  let conditions = ''

  for (let i = 0; i < keys.length; i++) {
    conditions += ` AND ${keys[i]} = $${i + 1} `
  }

  return await _get_user(conditions, values)
}

