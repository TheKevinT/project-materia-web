'use strict'
var express = require('express'); //cargar el modulo de express
var bodyParser = require('body-parser');

var app = express();
//cargar de archivos de rutas
var project_routes = require('./routes/project');
//const { nextTick } = require('process');

//middlewares
//cualquier dato que llegue por post se convierta en json
app.use(bodyParser.urlencoded({ extended: false }));
//todo lo que llega se convierte en json
app.use(bodyParser.json());

//configurar cabeceras
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//rutas 

//rutas
app.use('/api', project_routes);
/*app.get('/', (req, res) => {
    res.status(200).send(
        "<h1>página de inicio</h1>"
    )
})*/
module.exports = app;