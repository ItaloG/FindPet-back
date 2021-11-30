const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Cep = require("../models/Cep");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
  async find(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "email",
          "url_foto_banner",
          "url_foto_perfil",
          "logradouro",
          "complemento",
          "numero"
        ],
        include: [
          {
            association: "TelephoneUsers",
            attributes: ["numero"]
          },
          {
            association: "Cep",
            attributes: ["cep"]
          }
        ]
      });

      return res.status(200).send(user);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async store(req, res) {
    const {
      nome,
      email,
      senha,
      telefone,
      celular,
      cpf,
      cep,
      logradouro,
      numero,
      complemento,
    } = req.body;

    if (!nome || !email || !senha || !cpf || !cep || !logradouro || !numero) {
      return res.status(400).send({ error: "Faltam alguns dados." });
    }

    try {
      let user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        return res
          .status(400)
          .send({ error: "Este e-mail ja está sendo utilizado." });
      }

      let newCep = await Cep.findOne({
        where: {
          cep: cep,
        },
      });

      if (!newCep) {
        newCep = await Cep.create({
          cep,
        });
      }

      const senhaHashed = bcrypt.hashSync(senha);

      user = await User.create({
        nome,
        email,
        senha: senhaHashed,
        cpf,
        logradouro,
        numero,
        complemento,
        cep_id: newCep.id,
      });

      let newUser = await User.findByPk(user.id);

      if (!newUser) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }

      if (!telefone && !celular) {
        return res
          .status(400)
          .send({ error: "Você deve informar um telefone ou celular." });
      }

      let telephone = "";

      if (telefone) {
        telephone = await newUser.createTelephoneUser({
          numero: telefone,
        });

        telephone = telephone.numero;
      }

      let cellphone = "";

      if (celular) {
        cellphone = await newUser.createTelephoneUser({
          numero: celular,
        });

        cellphone = cellphone.numero;
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        auth.secret,
        {
          expiresIn: "24h",
        }
      );

      res.status(201).send({
        id: user.id,
        nome: user.nome,
        email: user.email,
        senha: user.senha,
        cpf: user.cpf,
        telefone: telephone,
        celelular: cellphone,
        logradouro: user.logradouro,
        numero: user.numero,
        complemento: user.complemento,
        cep: newCep.cep,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
