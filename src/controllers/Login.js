const User = require("../models/User");
const Institution = require("../models/institution");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
  async store(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).send({ error: "Faltam dados." });
    }

    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        const institution = await Institution.findOne({
          where: {
            email,
          },
        });

        if (!institution || !bcrypt.compareSync(senha, institution.senha)) {
          return res.status(403).send({ error: "Usuário e/ou senha inválidos" });
        }

        const token = jwt.sign({
          institutionId: institution.id,
          perfil: "institution"
        },
          auth.secret, {
          expiresIn: "24h"
        });

        return setTimeout(() => {
          return res.status(201).send({
            instuticao: {
              email,
              senha,
            },
            token
          });
        }, 3000);
      }


      if (!user || !bcrypt.compareSync(senha, user.senha)) {
        return res.status(403).send({ error: "Usuário e/ou senha inválidos" });
      }

      const token = jwt.sign({
        perfil: "user"
      },
        auth.secret, {
        expiresIn: "24h"
      });

      setTimeout(() => {
        return res.status(201).send({
          usuario: {
            email,
            senha,
          },
          token
        });
      }, 3000);

    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
