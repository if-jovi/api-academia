const service = require('../services/auth');

async function registrar (req, res) {
  try {
    if (!req.body.email || !req.body.nome || !req.body.senha) {
      return res.status(400).json({
        message: 'Campos obrigatórios faltando'
      })
    }

    await service.registrar(req.body);
    return res.status(201).json({
      message: 'Conta criada com sucesso'
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

async function login (req, res) {
  try {
    if (!req.body.email || !req.body.senha) {
      return res.status(400).json({
        message: 'Campos obrigatórios faltando'
      })
    }

    const data = await service.login(req.body);
    return res.status(200).json({
      message: 'Logado com sucesso',
      data
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  registrar,
  login
}