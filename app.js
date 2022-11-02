//importation de express
const express = require ("express");

//pour créer une application express
const app = express();

//app.use () route générale et la fonction
app.use((req,res, next) => {
    console.log("première requête 1");
    next();
});

app.use((req,res) => {
    res.json({message : "ça fonctionne"})
});

//exportation de app.js pour pouvoir y accéder d'un autre fichier
module.exports = app;
