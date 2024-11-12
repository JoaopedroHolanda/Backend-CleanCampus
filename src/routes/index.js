const express = require('express')
const clientes = require('./clientesRoute.js')
const prestadores = require('./prestadoresRoute.js')
const autenticado = require('../middleware/autenticado.js')
const ocorrencias = require("./OcorrenciaRoute.js")

module.exports = app=>{
    app.use(
        express.json(),
        clientes,
        prestadores,
        autenticado,
        ocorrencias
    )
}
