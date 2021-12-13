const Institution = require("../models/institution");
const bcrypt = require("bcryptjs");
const Cep = require("../models/Cep");
const jwt = require("jsonwebtoken");
const auth = require("../config/auth");
const mapApi = require("../services/mapApi");

module.exports = {
  async index(req, res) {
    try {
      const institutions = await Institution.findAll({
        attributes: ["id", "nome", "url_foto_perfil", "url_foto_banner", "lat", "lng"],
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

  async find(req, res) {
    const { id } = req.params;

    try {
      const institution = await Institution.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "email",
          "url_foto_banner",
          "url_foto_perfil",
          "lat", 
          "lng",
          "descricao"
        ],
        include: [
          {
            association: "TelephoneInstitutions",
            attributes: ["numero"],
          },
          {
            association: "TypeInstitution",
            attributes: ["type_institution"],
          },
          {
            association: "Services",
            attributes: ["id", "servico"],
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
      });

      res.status(200).send(institution);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
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

      const mapaResponse = await mapApi.post(
        `json?address=${newCep.cep}&key=${process.env.API_KEY}`
      );

      const lat = mapaResponse.data.results[0].geometry.location.lat;
      const lng = mapaResponse.data.results[0].geometry.location.lng;

      institution = await Institution.create({
        nome,
        email,
        senha: senhaHashed,
        cnpj,
        descricao: "Inssira uma descrição para que todos saibam o que você faz",
        type_institution_id: tipoEstabelecimento,
        lat,
        lng,
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

      res.status(201).send({
        id: institution.id,
        nome: institution.nome,
        email: institution.email,
        senha: institution.senha,
        cnpj: institution.cnpj,
        tipoEstabelecimento: tipoEstabelecimento,
        telefone: telephone,
        celular: cellphone,
        logradouro: address.logradouro,
        numero: address.numero,
        complemento: address.complemento,
        cep: newCep.cep,
        descricao: institution.descricao,
        tipo_usuario: "instituicao",
        lat,
        lng,
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
