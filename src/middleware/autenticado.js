const {verify, decode} = require('jsonwebtoken')
const jsonSecret = require('../config/jsonSecret')

module.exports = async(req, res, next) =>{
    const token = req.headers.authorization

    if(!token){
        return res.status(401).send('Acess token não informado')
    }
    
    const [, acessToken] = token.split(' ')

    try{
        verify(acessToken, jsonSecret.secret)

        const {id, ra} = await decode(acessToken)

        req.usuarioId = id
        req.usuarioRa = ra
        
        return next()

    }catch(error){
        res.status(401).send(`Usuário não autorizado: ${error}`)
    }

}