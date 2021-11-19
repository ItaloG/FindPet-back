const InstitutionService = require("../models/InstitutionService");

module.exports = {
  async store(req, res) {
    const { servicos } = req.body;
    const { institutionId } = req;

    try {
      const servico = await InstitutionService.create({
        institution_id: institutionId,
        service_id: servicos,
      });

      res.status(201).send(servico);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },

  async delete(req, res) {
    const { id } = req.params;

    try {
      let servicoInstituicaoRow = await InstitutionService.findOne({
        where: {
          service_id: id,
        },
      });

      if (!servicoInstituicaoRow) {
        return res.status(404).send({ error: "servico não encontrado" })
      }

      servicoInstituicaoRow.destroy()

      return res.status(200).send({ mensagem: "servico desassociado com sucesso" })

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
