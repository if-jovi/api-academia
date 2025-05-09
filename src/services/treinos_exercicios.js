const db = require('../configs');

// SELECT Treinos_Exercicios com detalhes da máquina
async function getTreinos_Exercicios() {
    const sql = `
    Select 
        te.id_treino_exercicio,
        te.id_treino,
        te.id_exercicio,
        te.series,
        te.repeticoes,
        te.carga_kg,
        te.descanso,
        e.grupo_muscular,
        e.equipamento,
        m.nome_maquina,
        m.em_manutencao
      FROM treinos_exercicios te
      JOIN exercicios e ON te.id_exercicio = e.id_exercicio
      JOIN maquinas m ON e.id_maquina = m.id_maquina
    `;

    const result = await db.query(sql);
    return result.rows;
}

async function getTreino_ExercicioById(id) {
  const sql = `SELECT * FROM treinos_exercicios WHERE id_treino_exercicio = $1`;
  const result = await db.query(sql, [id]);
  return result.rows[0];
}

async function postTreinos_Exercicios({ id_treino, id_exercicio, series, repeticoes, carga_kg, descanso }) {
  const sql = `
    INSERT INTO treinos_exercicios (
       id_treino,
       id_exercicio, 
       series, 
       repeticoes, 
       carga_kg, 
       descanso
    ) VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;
  await db.query('BEGIN');
  const result = await db.query(sql, [id_treino, id_exercicio, series, repeticoes, carga_kg, descanso]);
  await db.query('COMMIT');
  return result.rows[0];
}

async function putTreino_Exercicio(id, { id_treino, id_exercicio, series, repeticoes, carga_kg, descanso }) {
  const sql = `
    UPDATE treinos_exercicios
    SET 
    id_treino = $1, 
    id_exercicio = $2, 
    series = $3, 
    repeticoes = $4, 
    carga_kg = $5, 
    descanso = $6
    WHERE id_treino_exercicio = $7
    RETURNING *
  `;
  const result = await db.query(sql, [id_treino, id_exercicio, series, repeticoes, carga_kg, descanso, id]);
  return result.rows[0];
}

async function deleteTreino_Exercicio(id) {
  const sql = `DELETE FROM treinos_exercicios WHERE id_treino_exercicio = $1`;
  await db.query(sql, [id]);
}

module.exports = {
  getTreinos_Exercicios,
  getTreino_ExercicioById,
  postTreinos_Exercicios,
  putTreino_Exercicio,
  deleteTreino_Exercicio
};