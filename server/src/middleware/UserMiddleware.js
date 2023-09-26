const UserModel = require('../model/UserModel');

const validateUser = async (request, response, next) => {
  const { body } = request;

  if (isInvalidData(body.nome)) {
    return response.status(400).json({ message: "O campo nome é obrigatório" });
  }

  if (isInvalidData(body.senha)) {
    return response.status(400).json({ message: "O campo senha é obrigatório" });
  }

  const { nome } = body;
  const usuario = await UserModel.getUserById(nome);
  if (usuario.length > 0) {
    return response.status(400).json({ message: "Já existe um usuário com estas informações, por favor, verifique!" });
  }

  next();
};

const isInvalidData = (data) => {
  return data === undefined || data === 'undefined' || (typeof data === "string" && data.trim() === '');
};

module.exports = {
  validateUser
}