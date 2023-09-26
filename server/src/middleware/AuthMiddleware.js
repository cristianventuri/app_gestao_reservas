const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateUser = (request, response, next) => {
  const { body } = request;

  if (isInvalidData(body.usuario)) {
    return response.status(400).json({ message: "O campo de usuário é obrigatório" });
  }

  if (isInvalidData(body.senha)) {
    return response.status(400).json({ message: "O campo de senha é obrigatório" });
  }

  next();
};

const validateJwt = (request, response, next) => {
  const { body } = request;

  if (isInvalidData(body.token)) {
    return response.status(400).json({ auth: false, message: "Não foi possível recuperar a seção do usuário." });
  }

  jwt.verify(body.token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return response.status(500).json({ auth: false, message: 'Falha na autenticação do token.' });
    }

    /* Se o token for valido, continua... */
    request.body.usuario = decoded.id;
    next();
  });
}

const isInvalidData = (data) => {
  return data === undefined || data === 'undefined' || (typeof data === "string" && data.trim() === '');
};

module.exports = {
  validateUser,
  validateJwt
}