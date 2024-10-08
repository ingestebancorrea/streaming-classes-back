const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require("./swagger.json");
require('dotenv').config()
const cors = require('cors');
const { dbConnection } = require('./src/database/config');

//Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

//CORS
app.use(cors());

// Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Lectura y Parseo del Body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/class', require('./src/routes/class'));
app.use('/api/messages', require('./src/routes/message'));

//Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Running on port ${ 3001 }`);
});