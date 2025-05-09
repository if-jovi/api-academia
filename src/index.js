// app.js

require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./configs');
const routes = require('./routers'); // Deve ser um router do Express


const PORT = process.env.PORT || 3000;

app.use(express.json({limit: '50mb'}));

// Aqui usamos o roteador de forma correta
app.use(routes);

// Rota raiz para testar conexão com o banco de dados
app.get('/', async (req, res) => {
  try {
    const sql = 'SELECT version()';
    const result = await db.query(sql);
    
    return res.status(200).json({
      status: 'ok',
      message: 'Conexão com o banco de dados realizada com sucesso',
      data: result.rows
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Erro ao conectar ao banco de dados',
      error: error.message
    });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
