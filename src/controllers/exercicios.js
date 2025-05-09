const exerciciosService = require('../services/exercicios');

async function getExercicios(req, res) {
  try {
    const exercicios = await exerciciosService.getExercicios();
    return res.status(200).json(exercicios);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
async function createExercicios(req, res) {
  try {
    const params = req.body
    const novoExercicio = await exerciciosService.createExercicios(params);
    return res.status(201).json(novoExercicio);
  } catch (error) {
    console.log(params)
    return res.status(500).json({ error: error.message });
  }
}

async function updateExercicio(req, res) {
  try {
    const id = req.params.id;
    const updated = await exerciciosService.updateExercicio(id, req.body);
    
    if (!updated) {
      return res.status(404).json({ message: 'Exercicio não encontrado' });
    }
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getExercicios,
  createExercicios, 
  updateExercicio
};
