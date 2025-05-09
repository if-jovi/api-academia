const jwt = require("jsonwebtoken");

async function verificaToken (req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      throw new Error('Informe um token');
    }

    jwt.verify(token, process.env.SECRET_KEY, async function (err, decoded) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (!req.body) req.body = {};
      req.body.userId = decoded.id;
      req.body.userEmail = decoded.email;
      next();
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  verificaToken
}