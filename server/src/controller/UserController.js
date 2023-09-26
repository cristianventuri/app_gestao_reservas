const UserModel = require('../model/UserModel');

const getAll = async (request, response) => {
  const usuarios = await UserModel.getAll();
  return response.json(usuarios);
};

const createUser = async (request, response) => {
  const usuario = await UserModel.createUser(request.body);
  return response.json(usuario);
};

const updateUser = async (request, response) => {
  const { id } = request.params;
  const usuario = await UserModel.updateUser(id, request.body);
  return response.json(usuario);
};

const deleteUser = async (request, response) => {
  const { id } = request.params;
  const usuario = await UserModel.deleteUser(id);
  return response.json(usuario);
};

module.exports = {
  getAll,
  createUser,
  updateUser,
  deleteUser
};