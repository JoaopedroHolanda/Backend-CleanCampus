const express = require('express')
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); 

const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
routes(app)



module.exports = app