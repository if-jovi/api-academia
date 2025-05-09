const express = require('express');
const router = express.Router();

const rotaAuth = require('./auth');
const alunosRouter = require('./alunos');
const professoresRouter = require('./professores');
const maquinasRouter = require('./maquinas');
const exerciciosRouter = require('./exercicios');
const treinosexerciciosRouter = require('./treinos_exercicios');
const treinosRouter = require('./treinos');

// Aqui usamos um prefixo geral, mas o 'auth.js' já define '/login'
router.use('/auth', rotaAuth);
router.use('/alunos', alunosRouter);
router.use('/exercicios', exerciciosRouter);
router.use('/professores', professoresRouter);
router.use('/maquinas', maquinasRouter);
router.use('/treinos_exercicios', treinosexerciciosRouter);
router.use('/treinos', treinosRouter);

module.exports = router;
