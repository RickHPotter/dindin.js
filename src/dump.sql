DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_database WHERE datname = 'dindin') THEN
        CREATE DATABASE dindin;
    END IF;
END $$;

\c dindin

CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(120) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(256) NOT NULL
);

CREATE TABLE IF NOT EXISTS categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(120) NOT NULL
);

INSERT INTO categorias (descricao)
SELECT DISTINCT descricao
FROM (VALUES
    ('Alimentação'),
    ('Assinaturas e Serviços'),
    ('Casa'),
    ('Mercado'),
    ('Cuidados Pessoais'),
    ('Educação'),
    ('Família'),
    ('Lazer'),
    ('Pets'),
    ('Presentes'),
    ('Roupas'),
    ('Saúde'),
    ('Transporte'),
    ('Salário'),
    ('Vendas'),
    ('Outras receitas'),
    ('Outras despesas')
) AS categories (descricao)
WHERE NOT EXISTS (
    SELECT 1
    FROM categorias
    WHERE categorias.descricao = categories.descricao
);

CREATE TABLE IF NOT EXISTS transacoes (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(120) NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    data DATE NOT NULL,
    categoria_id INT NOT NULL,
    usuario_id INT NOT NULL,
    tipo VARCHAR(36) NOT NULL
);

ALTER TABLE IF EXISTS transacoes
ADD FOREIGN KEY (categoria_id) REFERENCES categorias (id),
ADD FOREIGN KEY (usuario_id) REFERENCES usuarios (id);

