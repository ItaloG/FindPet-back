const Position = require("../models/Position")


module.exports = {
    async index(req, res) {
        try {

            const cargos = await Position.findAll({attributes:["id", "cargo"]});

            res.status(201).send(cargos);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}