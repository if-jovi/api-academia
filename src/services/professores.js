// services/professores.js

const db = require('../configs');

// Buscar todos os professores
async function getProfessores() {
    const sql = `
      SELECT pr.id_professor,
           pr.id_pessoa,
           pr.cref,
           pr.especialidade,
           p.nome_completo,
           p.cpf,
           p.email,
           p.data_nascimento,
           p.sexo
           FROM professores pr 
      join pessoas p on p.id_pessoa = pr.id_pessoa;`
    

    const result = await db.query(sql);
    return result.rows;
}

// Buscar professor por ID
async function getProfessorPorID(id) {
    const sql = `
        SELECT pr.id_professor,
       pr.id_pessoa,
       pr.cref,
       pr.especialidade,
       p.nome_completo,
       p.cpf,
       p.email,
       p.data_nascimento,
       p.sexo
  FROM professores pr
  JOIN pessoas p ON pr.id_pessoa = p.id_pessoa
 WHERE pr.id_professor = $1
    `;

    const result = await db.query(sql, [id]);
    const professor = result.rows[0];

    if (!professor) {
        return null;
    } else {
        return professor;
    }
}

// Criar um novo professor
async function postProfessor(params) {
    try {
      const { nome_completo, cpf, email, data_nascimento, sexo, cref, especialidade } = params;
  
      const insertPessoa = `
        INSERT INTO pessoas (nome_completo, cpf, email, data_nascimento, sexo)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id_pessoa
      `;
      const pessoaResult = await db.query(insertPessoa, [nome_completo, cpf, email, data_nascimento, sexo]);
      const id_pessoa = pessoaResult.rows[0].id_pessoa;
  
      const insertProfessor = `
        INSERT INTO professores (id_pessoa, cref, especialidade)
        VALUES ($1, $2, $3)
        RETURNING id_professor
      `;
      const professorResult = await db.query(insertProfessor, [id_pessoa, cref, especialidade]);
  
      return professorResult.rows[0];
  
    } catch (error) {
      console.error("Erro em postProfessor service:", error);
      throw error;
    }
  }
// Atualizar um professor existente
async function putProfessor(id_professor, params) {
    const { nome_completo, cpf, email, data_nascimento, sexo, cref, especialidade } = params;
  
    const result = await db.query('SELECT id_pessoa FROM professores WHERE id_professor = $1', [id_professor]);
    const id_pessoa = result.rows[0]?.id_pessoa;
    if (!id_pessoa) return null;
  
   
    await db.query(`
      UPDATE pessoas SET 
        nome_completo = $1, 
        cpf = $2, 
        email = $3,
        data_nascimento = $4,
        sexo = $5
      WHERE id_pessoa = $6
    `, [nome_completo, cpf, email, data_nascimento, sexo, id_pessoa]);
  
   
    const updateProfessor = await db.query(`
      UPDATE professores SET cref = $1, especialidade = $2
      WHERE id_professor = $3
      RETURNING id_professor
    `, [cref, especialidade, id_professor]);
  
    return updateProfessor.rows[0];
  }



module.exports = {
    getProfessores,
    getProfessorPorID,
    postProfessor,
    putProfessor
};
