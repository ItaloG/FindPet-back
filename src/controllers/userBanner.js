const User = require("../models/User");

module.exports = {
    async update(req, res) {

        const { firebaseUrl } = req.file;

        const { id } = req.params;

        if (!firebaseUrl) {
            return res.status(400).send({ error: "Campo imagem é obrigatório" });
        }

        try {
            let user = await User.findByPk(id);

            if (!user)
                return res.status(404).send({ error: "Usuário não encontrado" })

            user.url_foto_banner = firebaseUrl;

            user.save();

            res.status(201).send({
                image: firebaseUrl
            })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ error });
        }



    }
}