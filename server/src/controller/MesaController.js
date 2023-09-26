const MesaModel = require('../model/MesaModel');

const getAll = async (request, response) => {
  const mesas = await MesaModel.getAll();
  return response.json(mesas);
};

const createMesa = async (request, response) => {
  const mesa = await MesaModel.createMesa(request.body);
  return response.json(mesa);
};

const updateMesa = async (request, response) => {
  const { id } = request.params;
  const mesa = await MesaModel.updateMesa(id, request.body);
  return response.json(mesa);
};

const deleteMesa = async (request, response) => {
  const { id } = request.params;
  const mesa = await MesaModel.deleteMesa(id);
  return response.json(mesa);
};

module.exports = {
  getAll,
  createMesa,
  updateMesa,
  deleteMesa
};