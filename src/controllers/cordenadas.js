const Institution = require("../models/Institution");

module.exports = {
  async index(req, res) {
    try {
      const cordenadas = await Institution.findAll({
        attributes: ["nome", "lat", "lng"],
        include: [
          {
            association: "TypeInstitution",
            attributes: ["type_institution"],
          },
          {
            association: "AddressInstitutions",
            attributes: ["logradouro", "numero", "complemento"],
          },
        ],
      });

      return res.status(200).send(cordenadas);
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  },
};
