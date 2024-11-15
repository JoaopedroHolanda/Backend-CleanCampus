const OcorrenciaService = require("../services/OcorrenciaService");
const ocorrenciaService = new OcorrenciaService();

class OcorrenciaController {
    static async criaOcorrencia(req, res) {
        const { categoria_id, bloco, sala, descricao, severidade } = req.body;
        const usuarioId = req.usuarioId;

        try {
            const ocorrencia = await ocorrenciaService.criaOcorrencia({
                categoria_id,
                cliente_id: usuarioId,
                bloco,
                sala,
                descricao,
                severidade
            });
            return res.status(201).json(ocorrencia);
        } catch (error) {
            console.error("Erro ao criar ocorrência:", error);
            return res.status(400).json({ message: error.message });
        }
    }

    static async pegaTodasAsOcorrencias(req, res){
        try{
            const listaOcorrencias = await ocorrenciaService.pegaTodasAsOcorrencias()
            res.status(200).send(listaOcorrencias)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodasAsOcorrenciasCliente(req, res){
        const usuarioId = req.usuarioId;
        try{
            const listaOcorrencias = await ocorrenciaService.pegaTodasAsOcorrencias(usuarioId)
            res.status(200).send(listaOcorrencias)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodasAsOcorrenciasLimpeza(req, res){
        try{
            const listaOcorrencias = await ocorrenciaService.pegaTodasAsOcorrenciasLimpeza()
            res.status(200).send(listaOcorrencias)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodasAsOcorrenciasManutencaoEquipamentos(req, res){
        try{
            const listaOcorrencias = await ocorrenciaService.pegaTodasAsOcorrenciasManutencaoEquipamentos()
            res.status(200).send(listaOcorrencias)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodasAsOcorrenciasProblemasEletricos(req, res){
        try{
            const listaOcorrencias = await ocorrenciaService.pegaTodasAsOcorrenciasProblemasEletricos()
            res.status(200).send(listaOcorrencias)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async pegaTodasAsOcorrenciasClimatizacao(req, res){
        try{
            const listaOcorrencias = await ocorrenciaService.pegaTodasAsOcorrenciasClimatizacao()
            res.status(200).send(listaOcorrencias)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async resolverOcorrencia(req,res){
        const {ocorrenciaId} = req.params
        const prestadorId = req.usuarioId

        try{
            const result = await ocorrenciaService.resolverOcorrencia(Number(ocorrenciaId), prestadorId)
            res.status(200).send(result)
        }catch(error){
            res.status(400).send({message: error.message})
        }
    }

    static async excluirOcorrencia(req, res){
        const {id} = req.params

        try{
            const ocorrenciaExcluida = await ocorrenciaService.excluirOcorrencia(id)
            res.status(200).send(ocorrenciaExcluida)
        }catch(error){
            res.status(400).send(error)
        }
    }
}


module.exports = OcorrenciaController;
