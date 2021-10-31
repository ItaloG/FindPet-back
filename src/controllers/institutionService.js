const InstitutionService = require("../models/InstitutionService");

module.exports = {
    async store(req, res) {
        const { servicos } = req.body;
        const { institutionId } = req;

        const hasDuplicados = (a) => {
            return (new Set(a)).size !== a.length;
        }

        if(hasDuplicados(servicos)) {
            return res.status(400).send({ error: "Você possui servicos repetidos" });
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