const db = require('../configs');

async function getExercicios() {
  const sql =
   `SELECT e.grupo_muscular,
    e.equipamento      
    FROM exercicios e`
      ;

  const result = await db.query(sql);
  return result.rows;
}

async function createExercicios(params) {
    const sql = `
    INSERT INTO exercicios (
        id_maquina,
        grupo_muscular,
        equipamento
    ) VALUES ($1, $2, $3)
    RETURNING id_exercicio;
`;
try {
    await db.query('BEGIN');
    const { id_maquina, grupo_muscular, equipamento } = params;
    const result = await db.query(sql, [id_maquina, grupo_muscular, equipamento]);
    await db.query('COMMIT');
    return result.rows[0];
} catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao inserir exercicio:', error.message);
    throw error;
}
    
}

async function updateExercicio(id, params) {
    const { grupo_muscular, equipamento, id_maquina } = params;
    const sql = `
      UPDATE exercicios
      SET 
        grupo_muscular = $1,
        equipamento = $2, 
        id_maquina = $3
      WHERE id_exercicio = $4
      RETURNING *;
    `;
    const result = await db.query(sql, [grupo_muscular, equipamento, id_maquina, id]);
    return result.rows[0];
  }
  
  
  module.exports = {
    getExercicios,
    createExercicios, // já existente
    updateExercicio
  };