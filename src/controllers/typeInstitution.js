const TypeInstitution = require("../models/TypeInstitution")


module.exports = {
    async index(req, res) {
        try {
            const typeInstitutions = await TypeInstitution.findAll({
                attributes: ["id", "type_institution"]
            });
            
            res.status(200).send({
                typeInstitutions,
            });

        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }
    }
}