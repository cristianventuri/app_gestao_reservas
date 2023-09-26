const connection = require('../db/connection');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
require('dotenv').config();

const authUser = async (user) => {
  const { usuario, senha } = user;
  const query = `SELECT usrId, 
                        usrNome 
                   FROM usuarios 
                  WHERE (usrId = ? OR usrNome = ? )
                    AND usrSenha = ? 
                  LIMIT 1;`;

  const [authUser] = await connection.execute(query, [usuario, usuario, md5(senha)]);

  if (authUser.length > 0) {
    var userData = { ...authUser[0], token: await createJwtAuth(usuario) };
    return { auth: userData, message: "Login efetuado com sucesso!" }
  }
  return { auth: false, message: "Usuário ou senha incorretos, tente novamente!" }
};

const createJwtAuth = async (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: parseInt(process.env.SECTION_TIME_EXPIRES)
  });

  return token;
};

module.exports = {
  authUser
};