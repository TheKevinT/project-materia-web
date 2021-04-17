'use strict'
var mongoose = require('mongoose'); //cargar el modulo de mongoose 
//luego crearemos el app.js
var app = require('./app');
var port = 3700;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/proyectos')
    .then(() => {
        console.log("Conexión a la bdd establecida con éxito...");
        app.listen(port, () => {
            console.log("servidor corriendo correctamente en el url: localhost:3700");
        })
    })

.catch(err => console.log(err));