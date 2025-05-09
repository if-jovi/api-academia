const professoresService = require('../services/professores');

// Buscar todos
async function getProfessores(req, res) {
    try {
        const professores = await professoresService.getProfessores();
        return res.status(200).json(professores);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao buscar professores.' });
    }
}

// Buscar por ID
async function getProfessor(req, res) {
    const id = req.params.id;

    try {
        const professor = await professoresService.getProfessorPorID(id);

        if (!professor) {
            return res.status(404).json({ mensagem: 'Professor não encontrado.' });
        }

        return res.status(200).json(professor);
    } catch (error) {
        return res.status(500).json({ erro: error });
    }
}

// Criar novo professor
async function postProfessor(req, res) {
    const params = req.body;
    console.log

    try {
        const novoProfessor = await professoresService.postProfessor(params);
        return res.status(201).json(novoProfessor);
    } catch (error) {
        return res.status(500).json({ erro: error });
    }
}

// Atualizar professor existente
async function putProfessor(req, res) {
    const id = req.params.id;
    const params = req.body;

    try {
        const professorAtualizado = await professoresService.putProfessor(id, params);

        if (!professorAtualizado) {
            return res.status(404).json({ mensagem: 'Professor não encontrado para atualizar.' });
        }

        return res.status(200).json(professorAtualizado);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno ao atualizar professor.' });
    }
}



module.exports = {
    getProfessores,
    getProfessor,
    postProfessor,
    putProfessor
};
