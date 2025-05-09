// routers/professores.js

const controller = require('../controllers/professores');
const express = require('express');
const router = express.Router(); 

// Definindo as rotas para os professores
router.get('/', controller.getProfessores);
router.get('/:id([0-9]+)', controller.getProfessor);
router.post('/', controller.postProfessor);
router.put('/:id([0-9]+)', controller.putProfessor);

module.exports = router;
