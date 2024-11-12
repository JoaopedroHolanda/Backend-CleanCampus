const ClienteService = require('../services/ClienteService');
const clienteService = new ClienteService();

class ClienteController {
    static async login(req, res) {
        const dto = req.body;
        try {
            const login = await clienteService.login(dto)
            res.status(200).send(login);
        } catch (error) {
            res.status(401).send({ message: error.message })
        }
    }

    static async cadastrar(req, res) {
        const dto = req.body;
        console.log(dto)
        try {
            const cliente = await clienteService.cadastrar(dto)
            res.status(201).send(cliente);
        } catch (error) {
            res.status(400).send({ message: error.message })
        }
    }
}

module.exports = ClienteController;
