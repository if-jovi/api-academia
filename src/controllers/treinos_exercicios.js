const treinos_exerciciosService = require('../services/treinos_exercicios');

async function getTreinos_Exercicios(req, res) {
  try {
    const treinos_exercicios = await treinos_exerciciosService.getTreinos_Exercicios();
    return res.status(200).json(treinos_exercicios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getTreino_ExercicioById(req, res) {
  const id = req.params.id;
  try {
    const treino = await treinos_exerciciosService.getTreino_ExercicioById(id);
    if (!treino) {
      return res.status(404).json({ error: 'Treino_Exercicio não encontrado' });
    }
    return res.status(200).json(treino);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function postTreinos_Exercicios(req, res) {
  const params = req.body;
  try {
    const novoExercicio = await treinos_exerciciosService.postTreinos_Exercicios(params);
    return res.status(201).json(novoExercicio);
  } catch (error) {
    return res.status(500).json({ error: 'Erro interno ao cadastrar novo exercício.' });
  }
}

async function putTreino_Exercicio(req, res) {
  const id = req.params.id;
  const params = req.body;
  try {
    const atualizado = await treinos_exerciciosService.putTreino_Exercicio(id, params);
    return res.status(200).json(atualizado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteTreino_Exercicio(req, res) {
  const id = req.params.id;
  try {
    await treinos_exerciciosService.deleteTreino_Exercicio(id);
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  getTreinos_Exercicios,
  getTreino_ExercicioById,
  postTreinos_Exercicios,
  putTreino_Exercicio,
  deleteTreino_Exercicio
};