const {Router} = require('express')
const OcorrenciaController = require('../controllers/OcorrenciaController')


const router = Router()

router.post("/ocorrencias", OcorrenciaController.criaOcorrencia)
router.get("/ocorrencias", OcorrenciaController.pegaTodasAsOcorrenciasCliente)
router.get("/ocorrencias/limpeza", OcorrenciaController.pegaTodasAsOcorrenciasLimpeza)
router.get("/ocorrencias/manutencao-equipamentos", OcorrenciaController.pegaTodasAsOcorrenciasManutencaoEquipamentos)
router.get("/ocorrencias/problemas-eletricos", OcorrenciaController.pegaTodasAsOcorrenciasProblemasEletricos)
router.get("/ocorrencias/climatizacao",OcorrenciaController.pegaTodasAsOcorrenciasClimatizacao)
router.delete("/ocorrencias/:id", OcorrenciaController.excluirOcorrencia)

module.exports = router