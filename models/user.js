import { pool } from './bd.js'

export const user_create = async (user_attributes) => {
  const { nome, email, senha } = user_attributes;

  const query = `
      INSERT INTO USUARIOS (NOME, EMAIL, SENHA)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    return await pool.query(query, [nome, email, senha])
};

