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
        include: [
          {
            association: "Cep",
            attributes: ["cep"],
          },
        ],
        where: {
          email,
        },
      });

      if (!user) {
        const institution = await Institution.findOne({
          include: [
            {
              association: "TelephoneInstitutions",
              attributes: ["numero"],
            },
            {
              association: "TypeInstitution",
              attributes: ["id","type_institution"],
            },
            {
              association: "AddressInstitutions",
              attributes: ["logradouro", "numero", "complemento"],
              include: [
                {
                  association: "Cep",
                  attributes: ["cep"],
                },
              ],
            },
          ],
          where: {
            email,
          },
        });

        if (!institution || !bcrypt.compareSync(senha, institution.senha)) {
          return res
            .status(403)
            .send({ error: "Usuário e/ou senha inválidos" });
        }

        const token = jwt.sign(
          {
            institutionId: institution.id,
            perfil: "institution",
          },
          auth.secret,
          {
            expiresIn: "24h",
          }
        );

        let telefone = "";
        let celular = "";
        institution.TelephoneInstitutions.map((t) => {
          if (t.numero.length === 9) {
            telefone = t.numero;
          }
          celular = t.numero;
        });

        let numero = "";
        let logradouro = "";
        let complemento = "";
        let cep = "";
        institution.AddressInstitutions.map((e) => {
          numero = e.numero;
          logradouro = e.logradouro;
          complemento = e.complemento;
          cep = e.Cep.cep;
        });

        return res.status(201).send({
          id: institution.getDataValue("id"),
          nome: institution.getDataValue("nome"),
          email: institution.getDataValue("email"),
          senha: institution.getDataValue("senha"),
          url_foto_perfil: institution.getDataValue("url_foto_perfil"),
          url_foto_banner: institution.getDataValue("url_foto_banner"),
          cnpj: institution.getDataValue("cnpj"),
          tipoEstabelecimento: institution
            .getDataValue("TypeInstitution")
            .getDataValue("id"),
          telefone,
          celular,
          logradouro,
          numero,
          complemento,
          cep,
          tipo_usuario: "instituicao",
          token,
        });
      }

      if (!user || !bcrypt.compareSync(senha, user.senha)) {
        return res.status(403).send({ error: "Usuário e/ou senha inválidos" });
      }

      const token = jwt.sign(
        {
          perfil: "user",
        },
        auth.secret,
        {
          expiresIn: "24h",
        }
      );

      return res.status(201).send({
        id: user.getDataValue("id"),
        nome: user.getDataValue("nome"),
        email: user.getDataValue("email"),
        senha: user.getDataValue("senha"),
        url_foto_perfil: user.getDataValue("urlFotoPerfil"),
        cpf: user.getDataValue("cpf"),
        logradouro: user.getDataValue("logradouro"),
        numero: user.getDataValue("numero"),
        complemento: user.getDataValue("complemento"),
        cep: user.getDataValue("Cep").getDataValue("cep"),
        tipo_usuario: "comum",
        token,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
