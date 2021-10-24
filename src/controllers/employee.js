const Employee = require("../models/Employee");
const Institution = require("../models/institution");


module.exports = {
    async store(req, res) {
        const { cpf, nome, cargo, diaEntrada } = req.body;

        const { firebaseUrl } = req.file;

        const { institutionId } = req;

        if (!cpf || !nome || !cargo || !diaEntrada) {
            return res.status(400).send({ error: "Faltam alguns dados" });
        }

        try {
            let institution = await Institution.findByPk(institutionId);

            if (!institution) {
                return res.status(404).send({ error: "Instituição não encontrada" });
            }

            let funcionario = await Employee.create({
                cpf,
                url_foto_perfil: firebaseUrl,
                nome,
                dia_entrada: diaEntrada,
                cargo_id: cargo,
                institution_id: institutionId,
            });

            res.status(201).send(funcionario);
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }

    }
}