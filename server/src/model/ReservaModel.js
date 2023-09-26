const connection = require('../db/connection');

const getAll = async () => {
  const query = `SELECT reservas.rsvId,
                        reservas.rsvNome,
                        reservas.rsvDataHora,
                        reservas.usrId,
                        usuarios.usrNome,
                        reservas.msaId,
                        mesas.msaDescricao 
                   FROM reservas
                   JOIN usuarios
                     ON usuarios.usrId = reservas.usrId
                   JOIN mesas
                     ON mesas.msaId = reservas.msaId`
  const [reservas] = await connection.execute(query);
  return reservas;
};

const getReservasAtivas = async (mesa, params) => {
  const { date } = params;
  const query = `SELECT reservas.rsvId,
                        reservas.msaId,
                        reservas.rsvDataHora
                   FROM reservas
                   JOIN mesas
                     ON mesas.msaId = reservas.msaId
                  WHERE reservas.msaId = ? AND cast(reservas.rsvDataHora as date) = ?`
  const [reservas] = await connection.execute(query, [mesa, date]);
  return reservas;
};

const createReserva = async (reserva) => {
  const { nome, dataHora, user, mesa } = reserva;
  const [createReserva] = await connection.execute('INSERT INTO reservas(rsvNome, rsvDataHora, usrId, msaId) VALUES(?, ?, ?, ?)', [nome, dataHora, user, mesa]);
  return { id: createReserva.insertId };
};

const updateReserva = async (reservaId, reserva) => {
  const { nome, dataHora, user, mesa } = reserva;
  await connection.execute('UPDATE reservas SET rsvNome = ?, rsvDataHora = ?, usrId = ?, msaId = ? WHERE rsvId = ?', [nome, dataHora, user, mesa, reservaId]);
  return { message: "Reserva atualizada com sucesso!" };
};

const deleteReserva = async (reservaId) => {
  await connection.execute('DELETE FROM reservas WHERE rsvId = ?', [reservaId]);
  return { message: "Reserva removida com sucesso!" };
};

module.exports = {
  getAll,
  createReserva,
  updateReserva,
  deleteReserva,
  getReservasAtivas
};