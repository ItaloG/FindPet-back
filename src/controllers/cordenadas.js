const Institution = require("../models/institution");

module.exports = {
  async index(req, res) {
    try {
      const cordenadas = await Institution.findAll({
        attributes: ["lat", "lng"],
      });
   
      return res.status(200).send(cordenadas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
