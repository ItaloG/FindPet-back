const Employee = require("../models/Employee");
const Institution = require("../models/institution");
const sequelize = require("sequelize");

module.exports = {
    async index(req, res) {

        const { institutionId } = req;

        try {
            let funcionarios = await Employee.findAll({
                attributes: [
                    "id",
                    "url_foto_perfil",
                    "nome",
                    [
                        sequelize.fn('timestampdiff', sequelize.literal('year'), sequelize.col('dia_entrada'), sequelize.fn('curdate')), "anos"
                    ],
                    [
                        sequelize.fn('timestampdiff', sequelize.literal('month'), sequelize.col('dia_entrada'), sequelize.fn('curdate')), "meses"
                    ],
                    [
                        sequelize.fn('timestampdiff', sequelize.literal('day'), sequelize.col('dia_entrada'), sequelize.fn('curdate')), "dias"
                    ]
                ],
                include: [
                    {
                        association: "Position",
                        attributes: ["cargo"]
                    },

                ],
                where: {institution_id: institutionId}
            });

            res.status(201).send(funcionarios);
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }

    },
    async find(req, res) {
        const { id } = req.params;

        try {
            let funcionario = await Employee.findByPk(id, {
                attributes: [
                    "id",
                    "url_foto_perfil",
                    "nome",
                    [
                        sequelize.fn('timestampdiff', sequelize.literal('year'), sequelize.col('dia_entrada'), sequelize.fn('curdate')), "anos"
                    ],
                    [
                        sequelize.fn('timestampdiff', sequelize.literal('month'), sequelize.col('dia_entrada'), sequelize.fn('curdate')), "meses"
                    ],
                    [
                        sequelize.fn('timestampdiff', sequelize.literal('day'), sequelize.col('dia_entrada'), sequelize.fn('curdate')), "dias"
                    ]
                ],
                include: [
                    {
                        association: "Position",
                        attributes: ["cargo"]
                    },
                ],
            });

            res.status(201).send(funcionario);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error)
        }

    },
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
                position_id: cargo,
                institution_id: institutionId,
            });

            res.status(201).send(funcionario);
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }

    }
}