// services/alunos.js

const db = require('../configs');

// Buscar todos os alunos
async function getAlunos() {
  const sql =
   `SELECT a.id_aluno,
           p.nome_completo,
           p.cpf,
           p.email,
           p.data_nascimento,
           p.sexo,
           a.objetivo,
           a.data_inicio
      FROM alunos a 
      inner join pessoas p on p.id_pessoa = a.id_pessoa`
      ;

  const result = await db.query(sql);
  return result.rows;
}

// Buscar aluno por ID
async function getAlunoPorId(id) {
  const sql = `
  SELECT
  a.id_aluno,
  p.nome_completo,
  p.cpf,
  p.email,
  p.data_nascimento,
  p.sexo,
  a.objetivo,
  a.data_inicio
FROM alunos a 
inner join pessoas p on p.id_pessoa = a.id_pessoa
 WHERE id_aluno = $1`

  const result = await db.query(sql, [id]);
  return result.rows[0]; // retorna um único aluno
}

// Inserir um novo aluno
async function createAluno({ nome_completo, cpf, email,data_nascimento, sexo, data_inicio, objetivo = 'teste' }) {
  const sql = `
WITH ins_pessoa AS (
  INSERT INTO pessoas (
    nome_completo,
    cpf,
    email,
    data_nascimento,
    sexo
  ) 
  VALUES ($1, $2, $3, $4, $5)
  RETURNING id_pessoa
)

INSERT INTO alunos (
  id_pessoa,
  data_inicio,
  objetivo
)
SELECT id_pessoa, $6, $7
FROM ins_pessoa
RETURNING id_aluno;


  `;
try {
  await db.query('begin transaction;')
  const result = await db.query(sql, [ nome_completo, cpf, email, data_nascimento, sexo,data_inicio,objetivo]);
  await db.query('commit;')
  return result.rows[0]; // retorna o id inserido
} catch (error) {
  await db.query('rollback;')
  console.log(error)
}

}

// Atualizar aluno
async function putAluno(id, params) {
  const sql = `
    UPDATE pessoas
       SET nome_completo = $1,
           cpf = $2,
           email = $3,
           data_nascimento = $4,
           sexo = $5,
           tipo_pessoa = $6
     WHERE id_pessoa = $7
    RETURNING id_pessoa
  `;

  const { nome_completo, cpf, email,data_nascimento,sexo,tipo_pessoa } = params;
  const result = await db.query(sql, [nome_completo, cpf, email,data_nascimento,sexo,tipo_pessoa, id]);
  return result.rows[0]; // retorna o id atualizado
}


module.exports = {
  getAlunos,
  getAlunoPorId,
  createAluno,
  putAluno
};


