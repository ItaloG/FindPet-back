const Institution = require("../models/Institution");

module.exports = {
  async update(req, res) {
    const { id } = req.params;

    const { descricao } = req.body;

    try {
      let institution = await Institution.findByPk(id);

      if (!institution)
        return res.status(404).send({ error: "Instituição não encontrada" });

      institution.descricao = descricao;

      institution.save();

      res.status(201).send({
        descricao,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
