const treinosService = require('../services/treinos');

async function getTreinos(req, res) {
  try {
    const treinos = await treinosService.getTreinos();
    return res.status(200).json(treinos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getTreinoPorId(req, res) {
  const { id } = req.params;
  try {
    const treino = await treinosService.getTreinoPorId(id);
    if (!treino) return res.status(404).json({ error: 'Treino não encontrado' });
    return res.status(200).json(treino);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function postTreino(req, res) {
  const params = req.body;

  // Validação de data_treino
  const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
  if (!diasSemana.includes(params.data_treino?.toLowerCase())) {
    return res.status(400).json({
      error: 'O campo "data_treino" deve conter um dia da semana válido (ex: segunda, terca, quarta...)'
    });
  }

  try {
    // Padroniza o valor para minúsculo antes de salvar
    params.data_treino = params.data_treino.toLowerCase();

    const novoTreino = await treinosService.postTreino(params);
    return res.status(201).json(novoTreino);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao cadastrar treino' });
  }
}

async function putTreino(req, res) {
  const { id } = req.params;
  const dados = req.body;
  try {
    const atualizado = await treinosService.putTreino(id, dados);
    if (!atualizado) return res.status(404).json({ error: 'Treino não encontrado' });
    return res.status(200).json(atualizado);
  } catch (error) {
    return res.status(500).json({ error: 'Erro ao atualizar treino' });
  }
}

async function getTreinoCompletoPorDia(req, res) {
  const { id_aluno, dia } = req.params;
  console.log(dia)

  try {
    const treinoCompleto = await treinosService.getTreinoCompletoPorDia(id_aluno, dia);
    
    if (treinoCompleto.length === 0) {
      return res.status(404).json({ message: 'Treino não encontrado para esse aluno e dia.' });
    }

    return res.status(200).json(treinoCompleto);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar o treino completo.' });
  }
}

module.exports = {
  getTreinos,
  getTreinoPorId,
  postTreino,
  putTreino,
  getTreinoCompletoPorDia
};