const Institution = require("../models/institution");
const Support = require("../models/Support");

module.exports = {
    async index(req, res) {

        try {
            const supports = await Support.findAll({
                attributes: ["id", "valor", "idade_minima", "horario", "urgencia", "descricao"],
                include: [
                    {
                        association: "TypeSupport",
                        attributes: ["tipo"],
                    },
                    {
                        association: "Institution",
                        attributes: ["id", "nome"],
                    }
                ],
                order: [["created_at", "DESC"]],
            });

            res.status(200).send({
                supports,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },
    async find(req, res) {
        const { id } = req.params;

        try {
            const support = await Support.findByPk(id, {
                attributes: ["id", "valor", "idade_minima", "horario", "urgencia", "descricao"],
                include: [
                    {
                        association: "TypeSupport",
                        attributes: ["tipo"],
                    },
                    {
                        association: "Institution",
                        attributes: ["id", "nome"],
                    }
                ]
            });

            res.status(200).send({
                support,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({ error });
        }

    },
    async store(req, res) {
        const { id } = req.params;

        const {
            tipo,
            urgencia,
            valor,
            idadeMinima,
            horario,
            descricao
        } = req.body;

        if (!tipo || !descricao) {
            return res.status(400).send({ error: "Faltam dados." });
        }

        try {

            let institution = await Institution.findByPk(id);

            if (!institution)
                return res.status(404).send({ error: "Instituição não encontrada" });

            const support = await institution.createSupport({
                valor,
                idade_minima: idadeMinima,
                horario,
                urgencia,
                descricao,
                type_support_id: tipo
            });

            res.status(201).send({
                apoio: support,
            });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },
}