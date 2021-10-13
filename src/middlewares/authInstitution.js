module.exports = async (req, res, next) => {
    if (req.userPerfil !== "institution")
        return res.status(401).send({ error: "Acesso negado" });

    return next();
}