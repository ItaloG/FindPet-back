const Institution = require("../models/institution");

module.exports = {
    async store(req, res) {
        const { id } = req.params;

        const { descricao } = req.body;

        let institution = await Institution.findByPk(id);

        if(!institution)
            return res.status(404).send({ error: "Instituição não encontrada" });

        institution.descricao = descricao;

        institution.save();

        res.status(201).send({
            instituicaoId: id,
            descricao,
        });

    },
}