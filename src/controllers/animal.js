const Animal = require("../models/Animal");
const AnimalSpecialCondition = require("../models/AnimalSpecialCondition");
const Institution = require("../models/institution");

module.exports = {
  async index(req, res) {
    const { id } = req.params;
    const { institutionId } = req;

    try {
      let animais = await Animal.findAll({
        attributes: [
          "id",
          "url_foto_perfil",
          "nome",
          "personalidade",
          "idade",
          "castrado",
          "historia",
        ],
        include: [
          {
            association: "TypeAnimal",
            attributes: ["tipo"],
          },
        ],
        where: { institution_id: id ? id : institutionId },
        order: [["created_at", "DESC"]],
      });

      res.status(201).send(animais);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async find(req, res) {
    const { id } = req.params;

    try {
      let animais = await Animal.findByPk(id, {
        attributes: [
          "id",
          "url_foto_perfil",
          "nome",
          "personalidade",
          "idade",
          "castrado",
          "historia",
        ],
        include: [
          {
            association: "TypeAnimal",
            attributes: ["tipo"],
          },
          {
            association: "Institution",
            attributes: ["id", "nome"],
          },
        ],
        order: [["created_at", "DESC"]],
      });

      res.status(201).send(animais);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  async store(req, res) {
    const {
      nome,
      personalidade,
      idade,
      castrado,
      historia,
      tipoAnimal,
      condicoesEpeciais,
    } = req.body;

    let firebaseUrl = null;
    if (req.file) {
      firebaseUrl = req.file.firebaseUrl;
    }

    const { institutionId } = req;

    if (!nome || !castrado || !historia || !firebaseUrl) {
      return res.status(400).send({ error: "Faltam alguns dados" });
    }

    try {
      let institution = await Institution.findByPk(institutionId);

      if (!institution) {
        return res.status(404).send({ error: "Instituição não encontrada" });
      }

      let animal = await Animal.create({
        url_foto_perfil: firebaseUrl,
        nome,
        personalidade,
        idade,
        castrado,
        historia,
        type_animal_id: tipoAnimal,
        institution_id: institutionId,
      });

      const condicoesEpeciaisArray = condicoesEpeciais.split(",");

      if (condicoesEpeciaisArray[0] !== "") {
        await animal.addSpecialCondition(condicoesEpeciaisArray);
      }

      res.status(201).send(animal);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async update(req, res) {
    const { nome, personalidade, idade, castrado, historia } = req.body;

    let firebaseUrl = "";
    if (req.file) {
      firebaseUrl = req.file.firebaseUrl;
    }

    const { id } = req.params;

    if (!nome || !castrado || !historia || !firebaseUrl) {
      return res.status(400).send({ error: "Faltam alguns dados" });
    }

    try {
      let animal = await Animal.findByPk(id);

      if (!animal) {
        return res.status(404).send({ error: "Animal não encontrado" });
      }

      animal.nome = nome;
      animal.personalidade = personalidade;
      animal.idade = idade;
      animal.castrado = castrado;
      animal.historia = historia;

      animal.save();

      res.status(201).send(animal);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  async delete(req, res) {
    const { id } = req.params;

    try {
      let animal = await Animal.findByPk(id);

      if (!animal) {
        return res.status(404).send({ error: "Animal não encontrado" });
      }

      let animalSpecialConditionRow = await AnimalSpecialCondition.findOne({
        where: {
          animal_id: id,
        },
      });

      await animalSpecialConditionRow.destroy();

      const deleteAnimal = async () => {
        await animal.destroy();
      };
      setTimeout(() => {
        deleteAnimal();
      }, 2000);

      return res.status(201).send({ mensagem: "Animal excluido com sucesso" });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
