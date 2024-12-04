const express = require('express')
const routes = require('./routes')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json'); 
const cors = require('cors')

const app = express()
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use(cors())
routes(app)



module.exports = app