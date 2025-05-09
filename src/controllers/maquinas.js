const maquinasService = require('../services/maquinas');

async function getMaquinas(req, res) {
  try {
    const maquinas = await maquinasService.getMaquinas();
    return res.status(200).json(maquinas);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Criar uma nova Maquina
async function postMaquinas(req, res) {
    const params = req.body;
    console.log(params)

    try {
        const novoMaquina = await maquinasService.postMaquinas(params);
        return res.status(201).json(novoMaquina);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao cadastrar nova maquina.' });
    }
}
module.exports = {
    getMaquinas,
    postMaquinas
  };
  