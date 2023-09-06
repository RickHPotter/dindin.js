import { pool } from './bd.js'

// CONSTANTS
//
export const MSG = {
  INTERNAL: 'Erro Interno do Servidor.',
  EMAIL_TAKEN: 'Já existe usuário cadastrado com o e-mail informado.',
  INVALID_EMAIL: 'Email inválido.',
  INVALID_PASSWORD: 'Senha inválido.',
  MISSING_FIELDS: 'Campos Obrigatórios estão faltando: '
}

// SELECT
//
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

// INSERT
//
export const _create_user = async (user_attributes) => {
  const { nome, email, senha } = user_attributes;

  const query = `
      INSERT INTO USUARIOS (NOME, EMAIL, SENHA)
      VALUES ($1, $2, $3)
      RETURNING *
    `

    return await pool.query(query, [nome, email, senha])
};

// UPDATE
//
export const _update_user = async (user_attributes) => {
  const { nome, email, senha, id } = user_attributes;

  const query = `
      UPDATE USUARIOS
      SET NOME  = $1,
          EMAIL = $2,
          SENHA = $3
      WHERE ID  = $4;
    `
    return await pool.query(query, [nome, email, senha, id])
};

