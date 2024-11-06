const PrestadorService = require('../services/PrestadorService');
const prestadorService = new PrestadorService();
 
class PrestadorController {
    static async login(req, res) {
        const dto = req.body;
        
        try {
            const login = await prestadorService.login(dto);
            res.status(200).send(login);
        } catch (error) {
            res.status(401).send({ message: error.message });
        }
    }

    static async cadastrar(req, res) {
        const dto = req.body;
        try {
            console.log(dto)
            const prestador = await prestadorService.cadastrar(dto);
            res.status(201).send(prestador);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    }
}

module.exports = PrestadorController;
