const validateReserva = (request, response, next) => {
  const { body } = request;

  if (isInvalidData(body.nome)) {
    return response.status(400).json({ message: "O campo nome é obrigatório" });
  }

  if (isInvalidData(body.dataHora)) {
    return response.status(400).json({ message: "O campo data/hora é obrigatório" });
  }

  if (isInvalidData(body.user)) {
    return response.status(400).json({ message: "O campo usuário de reserva é obrigatório" });
  }

  if (isInvalidData(body.mesa)) {
    return response.status(400).json({ message: "O campo mesa é obrigatório" });
  }

  next();
};

const isInvalidData = (data) => {
  return data === undefined || data === 'undefined' || (typeof data === "string" && data.trim() === '');
};

module.exports = {
  validateReserva
}