const Animal = require("../models/Animal");
const Institution = require("../models/institution");


module.exports = {
    async store(req, res) {
        let { nome, personalidade, idade, castrado, historia, tipoAnimal, condicaoEspecial } = req.body;

        const { firebaseUrl } = req.file;

        const { institutionId } = req;


        if (!nome || !castrado || !historia || !firebaseUrl) {
            return res.status(400).send({ error: "Faltam alguns dados" });
        }



        try {
            let institution = await Institution.findByPk(institutionId);

            if (!institution) {
                return res.status(404).send({ error: "Instituição não encontrada" });
            }

            let animal = await Animal.create({
                url_foto_perfil: firebaseUrl,
                nome,
                personalidade,
                idade,
                castrado,
                historia,
                type_animal_id: tipoAnimal,
                institution_id: institutionId,
            });

            await animal.addSpecialCondition(condicaoEspecial);

            res.status(201).send(animal);
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }

    },
}