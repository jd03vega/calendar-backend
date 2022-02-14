

const express = require("express");
require('dotenv').config();

const cors = require("cors");
const { dbConection } = require('./database/config')


//crear el servidor de express
const app = express();

// BD
dbConection();

// CORS
app.use(cors());

// Directorio publico
app.use( express.static("public") );

// Lectura y parseo del body
app.use( express.json() );

//Rutas
app.use("/api/auth", require("./routes/auth"));
app.use("/api/events", require("./routes/events"));
// autn -> crear, login, renew
// crud -> eventos


//escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo ${process.env.PORT}`);
})