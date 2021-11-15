const TypeAnimal = require("../models/TypeAnimal");

module.exports = {
    async index(req, res) {
        try {
            const TypeAnimals = await TypeAnimal.findAll({
                attributes: ["id", "tipo"]
            });

            res.status(200).send(TypeAnimals);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}