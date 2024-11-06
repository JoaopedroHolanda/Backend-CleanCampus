const {Router} = require('express')
const ClienteController = require('../controllers/ClienteController.js')


const router = Router()

router.post("/clientes/login", ClienteController.login)
router.post("/clientes/cadastro", ClienteController.cadastrar)

module.exports = router