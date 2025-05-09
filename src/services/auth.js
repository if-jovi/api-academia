const db = require('../configs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// registrar
async function registrar (params) {
  const { email, nome, senha } = params;
  const sql = `insert into usuarios (email, nome, senha) values ($1, $2, $3);`;
  const hashSenha = await bcrypt.hash(senha, 10);
  await db.query(sql, [email, nome, hashSenha]);
}

// logar
async function login (params) {
  const { email, senha } = params;
  const sql = 'select id, nome, email, senha from usuarios where email = $1';
  const result = await db.query(sql, [email]);

  if (!result.rows.length) {
    throw new Error('Usuário não encontrado');
  }

  const usuario = result.rows[0];

  const senhasIguais = await bcrypt.compare(senha, usuario.senha);
  if (!senhasIguais) {
    throw new Error('Senha incorreta')
  }

  const token = jwt.sign({ id: usuario.id, email: usuario.email, nome: usuario.nome }, process.env.SECRET_KEY, { expiresIn: '15s' });
  return token;
}

module.exports = {
  registrar,
  login
}