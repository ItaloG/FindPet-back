const SpecialCondition = require("../models/SpecialCondition");

module.exports = {
    async index(req, res) {
        try {
            const specialConditions = await SpecialCondition.findAll({
                attributes: ["id", "condicao"]
            });

            res.status(200).send(specialConditions);
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}