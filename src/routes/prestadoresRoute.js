const {Router} = require('express')
const PrestadorController = require('../controllers/PrestadorController.js')


const router = Router()

router.post("/prestadores/login", PrestadorController.login)
router.post("/prestadores/cadastro", PrestadorController.cadastrar)

module.exports = router