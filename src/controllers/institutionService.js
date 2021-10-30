const InstitutionService = require("../models/InstitutionService");

module.exports = {
    async store(req, res) {
        const { servicos } = req.body;
        const { institutionId } = req;

        try {
            const servicosExistentes = await InstitutionService.findAll({
                attributes: ["service_id"], where: {
                    institution_id: institutionId
                }
            });

            for (let index = 0; index < servicosExistentes.length; index++) {
                servicos.forEach(s => {
                    if (s === servicosExistentes[index].getDataValue("service_id")) {
                        return res.status(400).send({ error: "Esse serviços ja foram selecionados" })
                    }
                });
            }
            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
        try {
            let newServicos = []
            for (let index = 0; index < servicos.length; index++) {

                const servicoAux = await InstitutionService.create({
                    institution_id: institutionId,
                    service_id: servicos[index]
                });
                newServicos.push(servicoAux);
            }

            res.status(201).send(newServicos);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }

}