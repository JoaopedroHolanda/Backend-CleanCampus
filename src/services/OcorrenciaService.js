const db = require("../config/conexao");

class OcorrenciaService {
    async criaOcorrencia(dto) {
        try {
            const [result] = await db.query(
                `INSERT INTO ocorrencias (categoria_id, cliente_id, bloco, sala, descricao, severidade) VALUES (?, ?, ?, ?, ?, ?)`,
                [dto.categoria_id, dto.cliente_id, dto.bloco, dto.sala, dto.descricao, dto.severidade]
            );

            return result
        } catch (error) {
            console.error("Erro ao criar ocorrência:", error);
            throw new Error("Erro ao criar ocorrência", error);
        }
    }

    async pegaTodasAsOcorrencias(){
        try{
            const [result] = await db.query(
                `SELECT * FROM ocorrencias`
            )
            return result
        }catch(error){
            throw new Error(error)
        }
    }

    async pegaTodasAsOcorrenciasCliente(id){
        try{
            const [result] = await db.query(
                `SELECT * FROM ocorrencias WHERE cliente_id = ?`, [id]
            )
    
            return result
        }catch(error){
            throw new Error(error)
        }
    }

    async pegaAsOcorrenciasCategoriaPrestador(id){
        try{
            const [result] = await db.query(
                `select  o.* from ocorrencias o
                where o.resolvida = 0 and o.categoria_id = 
                (select tipo_servico from prestadores p where id = ?)   `, [id]
            )
            return result

        }catch(error){
            throw new Error(error)
    }}

    async pegaTodasAsOcorrenciasLimpeza(){
        try{
            const [result] = await db.query(
                `SELECT * FROM ocorrencias o
                INNER JOIN categorias c on c.id=o.categoria_id
                 WHERE c.titulo = "limpeza"`
            )

            return result
        }catch(error){
            throw new Error(error)
        }
    }

    async pegaTodasAsOcorrenciasManutencaoEquipamentos(){
        try{
            const [result] = await db.query(
                `SELECT * FROM ocorrencias o
                INNER JOIN categorias c on c.id=o.categoria_id
                WHERE c.titulo = "manutencao_equipamentos" `
            )

            return result
        }catch(error){
            throw new Error(error)
        }
    }
    
    async pegaTodasAsOcorrenciasProblemasEletricos(){
        try{
            const [result] = await db.query(
                `SELECT * FROM ocorrencias o
                INNER JOIN categorias c on c.id=o.categoria_id
                 WHERE c.titulo = "problemas_eletricos" `
            )

            return result
        }catch(error){
            throw new Error(error)
        }
    }

    async pegaTodasAsOcorrenciasClimatizacao(){
        try{
            const [result] = await db.query(
                `SELECT * FROM ocorrencias o
                INNER JOIN categorias c on c.id=o.categoria_id
                 WHERE c.titulo = "climatizacao"`
            )
            return result
        }catch(error){
            throw new Error(error)
        }
    }

    async resolverOcorrencia(idOcorrencia, idPrestador) {
        try {
            await db.query(
                'UPDATE ocorrencias SET resolvida = 1 WHERE id = ?',
                [idOcorrencia]
            )
            const [result] = await db.query(
                'INSERT INTO ocorrencias_resolvidas (ocorrencia_id, prestador_id) VALUES (?, ?)',
                [idOcorrencia, idPrestador]
            )
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
    


    async excluirOcorrencia(id){
        try{
            const [result] = await db.query(
                `DELETE FROM ocorrencias WHERE id = ?`, [id]
            )
            return result

        }catch(error){
            throw new Error(error)
        }
    }
}

module.exports = OcorrenciaService;
