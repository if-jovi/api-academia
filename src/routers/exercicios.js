const controller = require('../controllers/exercicios');
const express = require('express');
const router = express.Router(); 

router.get('/', controller.getExercicios);
router.post('/', controller.createExercicios);
router.put('/:id([0-9]+)', controller.updateExercicio);

module.exports = router;