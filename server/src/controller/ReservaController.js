const ReservaModel = require('../model/ReservaModel');

const getAll = async (request, response) => {
  const reservas = await ReservaModel.getAll();
  return response.json(reservas);
};

const getReservasAtivas = async (request, response) => {
  const { mesa } = request.params;
  const reservas = await ReservaModel.getReservasAtivas(mesa, request.body);
  return response.json(reservas);
};

const createReserva = async (request, response) => {
  const reserva = await ReservaModel.createReserva(request.body);
  return response.json(reserva);
};

const updateReserva = async (request, response) => {
  const { id } = request.params;
  const reserva = await ReservaModel.updateReserva(id, request.body);
  return response.json(reserva);
};

const deleteReserva = async (request, response) => {
  const { id } = request.params;
  const reserva = await ReservaModel.deleteReserva(id);
  return response.json(reserva);
};

module.exports = {
  getAll,
  createReserva,
  updateReserva,
  deleteReserva,
  getReservasAtivas
};