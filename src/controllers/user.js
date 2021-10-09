const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Cep = require("../models/Cep");

module.exports = {
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
            complemento
        } = req.body;

        if (!nome || !email || !senha || !cpf || !cep || !logradouro || !numero ) {
            return res.status(400).send({ error: "Faltam alguns dados." })
        }

        try {

            let user = await User.findOne({
                where: {
                    email: email,
                }
            });

            if (user) {
                return res
                    .status(400)
                    .send({ error: "Este e-mail ja está sendo utilizado." })
            }

            let newCep = await Cep.findOne({
                where: {
                    cep: cep,
                }
            });

            if (!newCep) {
                newCep = await Cep.create({
                    cep
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
                cep_id: newCep.id
            });

            let newUser = await User.findByPk(user.id);

            if (!newUser) {
                return res
                    .status(404)
                    .send({ error: "Usuário não encontrado" });
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


            res.status(201).send({
                nome: user.nome,
                email: user.email,
                senha: user.senha,
                tell: telephone,
                cell: cellphone,
                rua: user.logradouro,
                num: user.numero,
                comp: user.complemento,
                seuCep: newCep.cep
            });

        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    }
};