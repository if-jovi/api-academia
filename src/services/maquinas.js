const db = require('../configs');

async function getMaquinas() {
    const sql = `
      SELECT m.tipo_maquina,
           m.nome_maquina,
           m.em_manutencao
           FROM maquinas m `
    
    const result = await db.query(sql);
    return result.rows;
}

async function postMaquinas(params) {
    const sql = `
    INSERT INTO maquinas (
        tipo_maquina,
        nome_maquina,
        em_manutencao
    ) VALUES ($1, $2, $3)
    RETURNING id_maquinas;
`;
try {
    await db.query('BEGIN');
    const { tipo_maquina, nome_maquina, em_manutencao } = params;
    const result = await db.query(sql, [tipo_maquina, nome_maquina, em_manutencao]);
    await db.query('COMMIT');
    return result.rows[0];
} catch (error) {
    await db.query('ROLLBACK');
    console.error('Erro ao inserir máquina:', error.message);
    throw error;
}
    
}

module.exports = {
    getMaquinas,
    postMaquinas
};