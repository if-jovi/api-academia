const express = require('express');
const router = express.Router();
const controller = require('../controllers/treinos');

router.get('/', controller.getTreinos);
router.get('/:id([0-9]+)', controller.getTreinoPorId);
router.post('/', controller.postTreino);
router.put('/:id([0-9]+)', controller.putTreino);
router.get('/treino-completo/:id_aluno([0-9]+)/:dia', controller.getTreinoCompletoPorDia);

module.exports = router;