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

export const _get_user_by_email = async (email) =>{
  const query = `
      SELECT * FROM USUARIOS
      WHERE EMAIL = $1
    `

  return await pool.query(query, [email])
}

