const Institution = require("../models/institution");
const Cep = require("../models/Cep");
const Campaigns = require("../models/Campaigns");

module.exports = {

  async index(req, res) {

    try {
      const campaigns = await Campaigns.findAll({
        order: [["created_at", "DESC"]]
      });

      res.status(200).send([campaigns]);

    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }

  },
  async find(req, res) {
    const { id } = req.params;

    try {
      const campaign = await Campaigns.findByPk(id);

      res.status(200).send([campaign]);

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }

  },
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

    if (
      !titulo ||
      !descricao ||
      !data_inicio ||
      !data_fim ||
      !hora_inicio ||
      !hora_fim ||
      !cep ||
      !logradouro ||
      !numero
    ) {
      return res.status(400).send({ error: "Faltam alguns dados." });
    }

    if (!firebaseUrl) {
      return res.status(400).send({ error: "Campo imagem é obrigatório" });
    }

    try {
      let institution = await Institution.findByPk(institutionId);

      if (!institution)
        return res.status(404).send({ error: "Instituição não encontrada" });

      let newCep = await Cep.findOne({
        where: {
          cep
        },
      });

      if (!newCep) {
        newCep = await Cep.create({
          cep,
        });
      }

      const campanha = await Campaigns.create({
        numero,
        logradouro,
        complemento,
        url_foto: firebaseUrl,
        titulo,
        descricao,
        data_inicio,
        data_fim,
        hora_inicio,
        hora_fim,
        cep_id: newCep.id,
        institution_id: institutionId,
      });

      res.status(200).send({
        campanha,
      });

    } catch (error) {

      console.log(error);
      res.status(500).send(error);

    }
  },
};
