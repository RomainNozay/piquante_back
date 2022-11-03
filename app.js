//importation de express
const express = require ("express");

//importation de morgan (logger http)
const morgan = require("morgan");

//importation connexion base de donnée mongoDB;
const mongoose = require("./db/db");

//importation de body-parser
const bodyParser = require("body-parser");

//importation des routes
const userRoads = require("./routes/user");

//pour créer une application express
const app = express();

//logger les requête (req) et réponse res
app.use(morgan("dev"));

//Transformer le corps (le body) en json objet javascript utilisable
app.use(bodyParser.json());

//gérer les problèmes de CORS (Cross Origin Request Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})


//la route d'authentification 
app.use('/api/auth', userRoads);


//exportation de app.js pour pouvoir y accéder d'un autre fichier
module.exports = app;
