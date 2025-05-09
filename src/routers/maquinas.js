const controller = require('../controllers/maquinas');
const express = require('express');
const router = express.Router(); 

// Definindo as rotas para as Maquinas
router.get('/', controller.getMaquinas);
router.post('/', controller.postMaquinas);

module.exports = router;