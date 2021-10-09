const Institution = require("../models/institution");

module.exports = {
    async store(req, res) {

        const { id } = req.params;

        let institution = await Institution.findByPk(id);

        if (!institution)
            return res.status(404).send({ error: "Instituição não encontrada" });

        institution.url_foto_perfil = req.file.filename;

        institution.save();

        res.status(201).send({
            id,
            image: req.file.filename
        });

    },
}