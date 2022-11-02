//importation de express
const express = require ("express");

//importation de morgan (logger http)
const morgan = require("morgan");

//pour créer une application express
const app = express();

//logger les requête (req) et réponse res
app.use(morgan("dev"));

//app.use () route générale et la fonction
app.use((req,res, next) => {
    console.log("première requête 1");
    next();
});

//statut de la réponse
app.use((req,res, next) => {
    res.status(200);
    next();
});

app.use((req,res) => {
    res.json({message : "ça fonctionne"})
});

//exportation de app.js pour pouvoir y accéder d'un autre fichier
module.exports = app;
