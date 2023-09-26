const AuthModel = require('../model/AuthModel');
const UserModel = require('../model/UserModel');

const authUser = async (request, response) => {
  const usuario = await AuthModel.authUser(request.body);
  return response.json(usuario);
};

const getUserJwt = async (request, response) => {
  const usuario = await UserModel.getUserById(request.body.usuario);
  var userData = { ...usuario[0], token: request.body.token };
  return response.json({ auth: userData, message: "Login efetuado com sucesso!" });
};

module.exports = {
  authUser,
  getUserJwt
};