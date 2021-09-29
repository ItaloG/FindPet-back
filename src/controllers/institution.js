const Institution = require("../models/institution");
const bcrypt = require("bcryptjs");

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
      rua,
      numero,
      complemento,
    } = req.body;

    const institution = await Institution.findOne({
      where: {
        email: email,
      },
    });

    if (!institution || bcrypt.compareSync(senha, institution.senha)) {
      return res
        .status(403)
        .send({ error: "Este -email está ja está sendo utilizado" });
    }

    const senhaHashed = bcrypt.hashSync(senha);

    institution = await Institution.create({
      nome,
      tipoEstabelecimento,
      cnpj,
      email,
      senha: senhaHashed,
    });

    let perfilIntituicao = await Institution.findByPk(institution.id);

    if (!perfilIntituicao) {
      return res.status(404).send({ error: "Instituição não encontrada" });
    }

    let telephone = await perfilIntituicao.createTelephone({
      telefone,
    });

    if (celular) {
      let cellphone = await perfilIntituicao.createTelephone({
        celular,
      });
    }

    

    res.send({
      institution: {
        email: institution,
      },
    });
  },
};
