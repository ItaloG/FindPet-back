const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user || !bcrypt.compareSync(senha, user.senha)) {
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
