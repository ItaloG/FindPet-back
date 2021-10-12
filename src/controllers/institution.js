const Institution = require("../models/institution");
const bcrypt = require("bcryptjs");
const Cep = require("../models/Cep");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");

module.exports = {
  async index(req, res) {

    try {
      const institutions = await Institution.findAll({
        attributes: ["id", "nome"],
        include: [
          {
            association: "TypeInstitution",
            attributes: ["type_institution"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      res.status(200).send({
        institutions,
      });

    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }

  },

  async store(req, res) {
    const {
      nome,
      tipoEstabelecimento,
      cnpj,
      email,
      senha,
      telefone,
      celular,
      cep,
      logradouro,
      numero,
      complemento,
    } = req.body;

    //validar celular, telefone

    if (
      !nome ||
      tipoEstabelecimento === 0 ||
      !email ||
      !senha ||
      !cnpj ||
      !cep ||
      !logradouro ||
      !numero
    ) {
      return res.status(400).send({ error: "Faltam alguns dados." });
    }

    try {
      let institution = await Institution.findOne({
        where: {
          email: email,
        },
      });

      if (institution) {
        return res
          .status(400)
          .send({ error: "Este e-mail ja está está sendo utilizado." });
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

      institution = await Institution.create({
        nome,
        email,
        senha: senhaHashed,
        cnpj,
        type_institution_id: tipoEstabelecimento,
      });

      let newInstitution = await Institution.findByPk(institution.id);

      if (!newInstitution) {
        return res.status(404).send({ error: "Instituição não encontrada" });
      }

      if (!telefone && !celular) {
        return res
          .status(400)
          .send({ error: "Você deve informar um telefone ou celular." });
      }


      let telephone = "";

      if (telefone) {
        telephone = await newInstitution.createTelephoneInstitution({
          numero: telefone,
        });

        telephone = telephone.numero;
      }

      let cellphone = "";

      if (celular) {
        cellphone = await newInstitution.createTelephoneInstitution({
          numero: celular,
        });

        cellphone = cellphone.numero;
      }

      let address = await newInstitution.createAddressInstitution({
        logradouro,
        numero,
        complemento,
        cep_id: newCep.id,
      });

      const token = jwt.sign({
        institutionId: institution.id
      },
        auth.secret, {
        expiresIn: "24h"
      });

      res.status(201).send({
        nome: institution.nome,
        email: institution.email,
        senha: institution.senha,
        cnpj: institution.cnpj,
        tipoEstab: tipoEstabelecimento,
        tell: telephone,
        cell: cellphone.numero,
        rua: address.logradouro,
        num: address.numero,
        comp: address.complemento,
        seuCep: newCep.cep,
        token,
      });
      
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
