const Institution = require("../models/institution");
const bcrypt = require("bcryptjs");
const AddressInstitution = require("../models/AddressInsitution");
const Cep = require("../models/Cep");

module.exports = {
  async index(req, res) {
    const user = { name: "elais", email: "elasi@gmail.com", password: "123" };

    res.status(200).send(user);
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


    try {

      let institution = await Institution.findOne({
        where: {
          email: email,
        },
      });

      if (institution) {
        return res
          .status(400)
          .send({ error: "Este e-mail está ja está sendo utilizado" });
      }

      const senhaHashed = bcrypt.hashSync(senha);

      institution = await Institution.create({
        nome,
        email,
        senha: senhaHashed,
        cnpj,
        type_institution_id: tipoEstabelecimento
      });

      let newInstitution = await Institution.findByPk(institution.id);

      if (!newInstitution) {
        return res.status(404).send({ error: "Instituição não encontrada" });
      }

      // let TypeInstitution = await newInstitution.createTypeInstitution({
      //   tipoDeInstituicao: tipoEstabelecimento,
      // })

      let telephone = await newInstitution.createTelephoneInstitution({
        numero: telefone,
      })

      let cellphone = ""

      if (celular) {
        cellphone = await newInstitution.createTelephoneInstitution({
          numero: celular
        });
      }

      let newCep = await Cep.findOne({
        where: {
          cep: cep,
        }
      })

      if (!newCep) {
        newCep = await Cep.create({
          cep
        });
      }

      let address = await newInstitution.createAddressInstitution({
        logradouro,
        numero,
        complemento,
        cep_id: newCep.id
      });

      res.status(201).send({
        nome: institution.nome,
        email: institution.email,
        senha: institution.senha,
        cnpj: institution.cnpj,
        tipoEstab: tipoEstabelecimento,
        tell: telefone,
        cell: cellphone.numero,
        rua: address.logradouro,
        num: address.numero,
        comp: address.complemento,
        seuCep: newCep.cep
      });

    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
