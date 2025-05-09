// routers/alunos.js

const controller = require('../controllers/alunos');
const express = require('express');
const router = express.Router();

router.get('/', controller.getAlunos);
router.get('/:id([0-9]+)', controller.getAlunoPorId);
router.post('/', controller.postAluno);  
router.put('/:id([0-9]+)', controller.putAluno);

  // Exemplo de rota de teste
//   app.get('/example', (req, res) => {
//     return res.status(200).json({
//       status: 'ok'
//     });
//   });

module.exports = router;
