module.exports = {
  async store(req, res) {
    const {
      titulo,
      cep,
      numero,
      logradouro,
      complemento,
      descricao,
      data_inicio,
      data_fim,
      hora_inicio,
      hora_fim,
    } = req.body;

    const { firebaseUrl } = req.file;

    const { institutionId } = req;

    res.status(200).send({ 
        titulo,
        cep,
        numero,
        logradouro,
        complemento,
        descricao,
        data_inicio,
        data_fim,
        hora_inicio,
        hora_fim,
        firebaseUrl,
        institutionId,
     });
  },
};
