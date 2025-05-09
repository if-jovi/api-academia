const db = require('../configs');

// GET todos os treinos
async function getTreinos() {
  const sql = `
    SELECT * FROM treinos
  `;
  const result = await db.query(sql);
  return result.rows;
}

// GET treino por ID
async function getTreinoPorId(id) {
  const sql = `
    SELECT * FROM treinos WHERE id_treino = $1
  `;
  const result = await db.query(sql, [id]);
  return result.rows[0];
}

// POST novo treino
async function postTreino({ id_professor, id_aluno, nome_treino, observacoes, data_treino, data_inicio, data_fim }) {
  const sql = `
    INSERT INTO treinos (
      id_professor, 
      id_aluno, 
      nome_treino, 
      observacoes,
      data_treino, 
      data_inicio, 
      data_fim
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const values = [id_professor, id_aluno, nome_treino, observacoes, data_treino, data_inicio, data_fim];
  const result = await db.query(sql, values);
  return result.rows[0];
}

// PUT atualizar treino
async function putTreino(id, dados) {
  const sql = `
    UPDATE treinos SET
      id_professor = $1,
      id_aluno = $2,
      nome_treino = $3,
      observacoes = $4,
      data_treino = $5,
      data_inicio = $6,
      data_fim = $7
    WHERE id_treino = $8
    RETURNING *
  `;
  const values = [
    dados.id_professor,
    dados.id_aluno,
    dados.nome_treino,
    dados.observacoes,
    dados.data_treino,
    dados.data_inicio,
    dados.data_fim,
    id
  ];

  const result = await db.query(sql, values);
  return result.rows[0];
}


async function getTreinoCompletoPorDia(id_aluno, dia) {
  const sql = `
    SELECT 
      t.id_treino,
      t.nome_treino,
      t.observacoes,
      t.data_treino,
      te.series,
      te.repeticoes,
      te.carga_kg,
      te.descanso,
      e.grupo_muscular,
      e.equipamento,
      m.nome_maquina,
      m.em_manutencao
    FROM treinos t
    JOIN treinos_exercicios te ON t.id_treino = te.id_treino
    JOIN exercicios e ON te.id_exercicio = e.id_exercicio
    JOIN maquinas m ON e.id_maquina = m.id_maquina
    WHERE t.id_aluno = $1
      AND LOWER(t.data_treino) = LOWER($2)
  `;

  const result = await db.query(sql, [id_aluno, dia]);
  return result.rows;
}

module.exports = {
  getTreinos,
  getTreinoPorId,
  postTreino,
  putTreino,
  getTreinoCompletoPorDia
};