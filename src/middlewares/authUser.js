const jwt = require("jsonwebtoken");
const { secret } = require("../config/auth");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).send({ error: "Token não informado" });

    const parts = authHeader.split(" ");

    if (!parts.lenght === 2)
        return res.status(401).send({ error: "Erro no token" });

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: "Token mal informado" });

    try {
        const response = await jwt.verify(token, secret);

        req.userPerfil = response.perfil;
    } catch (e) {
        console.error(e);
        return res.status(401).send({ error: "Token inválido" });
    }

    return next();
}