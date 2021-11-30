const Institution = require("../models/institution");
const Cep = require("../models/Cep");
const Campaigns = require("../models/Campaigns");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const { institutionId } = req;

    try {
      const campaigns = await Campaigns.findAll({
        attributes: [
          "id",
          "logradouro",
          "complemento",
          "url_foto",
          "cidade",
          "titulo",
          "descricao",
          "data_inicio",
          "data_fim",
          "hora_inicio",
          "hora_fim",
        ],
        include: [
          {
            association: "Cep",
            attributes: ["cep"],
          },
        ],
        where: { institution_id: !institutionId ? id : institutionId },
        order: [["created_at", "DESC"]],
      });

      res.status(200).send(campaigns);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
  async find(req, res) { 
    const { id } = req.params;

    try {
      const campaign = await Campaigns.findByPk(id, {
        attributes: [
          "id",
          "logradouro",
          "complemento",
          "numero",
          "url_foto",
          "cidade",
          "titulo",
          "descricao",
          "data_inicio",
          "data_fim",
          "hora_inicio",
          "hora_fim",
        ],
        include: [
          {
            association: "Cep",
            attributes: ["cep"],
          },
        ],
       
        order: [["created_at", "DESC"]],
      });

      res.status(200).send(campaign);
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
      cidade,
      logradouro,
      complemento,
      descricao,
      data_inicio,
      data_fim,
      hora_inicio,
      hora_fim,
    } = req.body;

    let firebaseUrl = null;
    if (req.file) {
      firebaseUrl = req.file.firebaseUrl;
    }

    const { institutionId } = req;

    if (
      !titulo ||
      !descricao ||
      !data_inicio ||
      !data_fim ||
      !hora_inicio ||
      !hora_fim ||
      !cep ||
      !cidade ||
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
          cep,
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
        cidade,
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
  async update(req, res) {
    const {
      titulo,
      cep,
      numero,
      cidade,
      logradouro,
      complemento,
      descricao,
      data_inicio,
      data_fim,
      hora_inicio,
      hora_fim,
    } = req.body;

    let firebaseUrl = "";
    if (req.file) {
      firebaseUrl = req.file.firebaseUrl;
    }

    const { id } = req.params;

    if (
      !titulo ||
      !descricao ||
      !data_inicio ||
      !data_fim ||
      !hora_inicio ||
      !hora_fim ||
      !cep ||
      !cidade ||
      !logradouro ||
      !numero
    ) {
      return res.status(400).send({ error: "Faltam alguns dados." });
    }

    try {
      let campanha = await Campaigns.findByPk(id);

      if (!campanha) {
        return res.status(404).send({ error: "Funcionario não encontra" });
      }

      campanha.titulo = titulo;
      campanha.descricao = descricao;
      campanha.data_inicio = data_inicio;
      campanha.data_fim = data_fim;
      campanha.hora_inicio = hora_inicio;
      campanha.hora_fim = hora_fim;
      campanha.cep = cep;
      campanha.cidade = cidade;
      campanha.logradouro = logradouro;
      campanha.complemento = complemento;
      campanha.numero = numero;
      if (firebaseUrl) {
        campanha.url_foto = firebaseUrl;
      }

      campanha.save();

      res.status(201).send(campanha);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      let campanha = await Campaigns.findByPk(id);

      if (!campanha) {
        return res.status(404).send({ error: "Funcoinario não encontrado" });
      }

      await campanha.destroy();

      res.status(201).send({ mensagem: "funcionario excluido co msucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
