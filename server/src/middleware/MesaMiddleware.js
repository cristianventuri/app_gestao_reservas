const validateMesa = (request, response, next) => {
  const { body } = request;

  if (isInvalidData(body.descricao)) {
    return response.status(400).json({ message: "O campo de descrição da mesa é obrigatório" });
  }

  next();
};

const isInvalidData = (data) => {
  return data === undefined || data === 'undefined' || (typeof data === "string" && data.trim() === '');
};

module.exports = {
  validateMesa
}