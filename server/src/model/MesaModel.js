const connection = require('../db/connection');

const getAll = async () => {
  const [mesas] = await connection.execute('SELECT * FROM mesas');
  return mesas;
};

const createMesa = async (mesa) => {
  const { descricao } = mesa;
  const [createMesa] = await connection.execute('INSERT INTO mesas(msaDescricao) VALUES(?)', [descricao]);
  return { id: createMesa.insertId };
};

const updateMesa = async (mesaId, mesa) => {
  const { descricao } = mesa;
  await connection.execute('UPDATE mesas SET msaDescricao = ? WHERE msaId  = ?', [descricao, mesaId]);
  return { message: "Mesa atualizada com sucesso!" };
};

const deleteMesa = async (mesaId) => {
  await connection.execute('DELETE FROM mesas WHERE msaId = ?', [mesaId]);
  return { message: "Mesa removida com sucesso!" };
};

module.exports = {
  getAll,
  createMesa,
  updateMesa,
  deleteMesa
};