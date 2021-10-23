const Institution = require("../models/institution");


module.exports = {
    async store(req, res) {
        const { nome, personalidade, idade, castrado, historia, tipoAnimal, condicaoEspecial } = req.body;

        const { firebaseUrl } = req.file;

        const { institutionId } = req;

        if (!nome || !castrado || !historia) {
            return res.status(400).send({ error: "Faltam alguns dados" });
        }

        try {
            let institution = await Institution.findByPk(institutionId);

            if (!institution) {
                return res.status(404).send({ error: "Instituição não encontrada" });
            }

            let animal = await Institution.createAnimal({
                url_foto_perfil: firebaseUrl,
                nome,
                personalidade,
                idade,
                castrado,
                historia,
                type_animal_id: tipoAnimal,
            });


            await animal.addTypeSpecialCondition(condicaoEspecial);



        } catch (error) {
            
        }

    },
}