const controller = require('../controllers/treinos_exercicios');
const express = require('express');
const router = express.Router(); 

router.get('/', controller.getTreinos_Exercicios);
router.get('/:id', controller.getTreino_ExercicioById);
router.post('/', controller.postTreinos_Exercicios);
router.put('/:id', controller.putTreino_Exercicio);
router.delete('/:id', controller.deleteTreino_Exercicio);

module.exports = router;