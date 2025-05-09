// controllers/alunosController.js

const alunosService = require('../services/alunos');

// Buscar todos os alunos
async function getAlunos(req, res) {
  try {
    const alunos = await alunosService.getAlunos();
    return res.status(200).json(alunos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Buscar um aluno por ID
async function getAlunoPorId(req, res) {
  try {
    const id = req.params.id;
    const aluno = await alunosService.getAlunoPorId(id);

    if (!aluno) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    return res.status(200).json(aluno);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Criar um novo aluno
async function postAluno(req, res) {
  try {
    console.log(req.body)
    const aluno = await alunosService.createAluno(req.body);
    return res.status(201).json(aluno);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

// Atualizar aluno
async function putAluno(req, res) {
  try {
    const id = req.params.id;
    const alunoAtualizado = await alunosService.putAluno(id, req.body);
    
    if(req.body.tipo_pessoa !== "Aluno"){
      return res.status(400).json("Dado tipo_pessoa precisa ser Aluno")
    }

    if (!alunoAtualizado) {
      return res.status(404).json({ message: 'Aluno não encontrado' });
    }

    return res.status(200).json(alunoAtualizado);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}


module.exports = {
  getAlunos,
  getAlunoPorId,
  postAluno,
  putAluno
};
