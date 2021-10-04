const Institution = require("../models/institution");
const bcrypt = require("bcryptjs");

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;

    try {
      const institution = await Institution.findOne({
        where: {
          email,
        },
      });

      if (!institution || !bcrypt.compareSync(senha, institution.senha)) {
        return res.status(403).send({ error: "Usuário e/ou senha inválidos" });
      }

      setTimeout(() => {
        res.status(201).send({
          usuario: {
            email,
            senha,
          },
        });
      }, 3000);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
