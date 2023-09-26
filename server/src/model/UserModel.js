const connection = require('../db/connection');
const md5 = require('md5');

const getAll = async () => {
  const [usuarios] = await connection.execute('SELECT usrId, usrNome FROM usuarios');
  return usuarios;
};

const getUserById = async (user) => {
  const [usuarios] = await connection.execute('SELECT usrId, usrNome FROM usuarios WHERE (usrId = ? OR usrNome = ?)', [user, user]);
  return usuarios;
};

const createUser = async (user) => {
  const { nome, senha } = user;
  const [createUser] = await connection.execute('INSERT IGNORE INTO usuarios(usrNome, usrSenha) VALUES(?, ?)', [nome, md5(senha)]);
  return { id: createUser.insertId };
};

const updateUser = async (userId, user) => {
  const { nome, senha } = user;
  await connection.execute('UPDATE usuarios SET usrNome = ?, usrSenha = ? WHERE usrId = ?', [nome, md5(senha), userId]);
  return { message: "Usuário atualizado com sucesso!" };
};

const deleteUser = async (userId) => {
  await connection.execute('DELETE FROM usuarios WHERE usrId = ?', [userId]);
  return { message: "Usuário removido com sucesso!" };
};

module.exports = {
  getAll,
  createUser,
  updateUser,
  deleteUser,
  getUserById
};