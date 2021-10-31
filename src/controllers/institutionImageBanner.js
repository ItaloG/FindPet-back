const Institution = require("../models/institution");

module.exports = {
    async update(req, res) {

        const { firebaseUrl } = req.file

        const { id } = req.params;

        if (!firebaseUrl) {
            return res.status(400).send({ error: "Campo imagem é obrigatório" });
        }

        try {
            let institution = await Institution.findByPk(id);

            if (!institution)
                return res.status(404).send({ error: "Instituição não encontrada" });

            institution.url_foto_banner = firebaseUrl;

            institution.save();

            res.status(201).send({
                instituicaoId: id,
                image: firebaseUrl,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ error });
        }
    },
}