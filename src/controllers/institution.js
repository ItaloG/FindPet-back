

module.exports = {
    async index(req, res) {
        const user = {name: "elais", email: "elasi@gmail.com", password: "123"};

        res.status(200).send(user);
    }
}