const Service = require("../models/Service");

module.exports = {
    async index(req, res) {
        try {
            const servicos = await Service.findAll();

            res.status(201).send(servicos);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}