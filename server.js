//importer package http de Node.js pour avoir les outils pour créer le serveur
const http = require('http');

//importer application 
const app = require('./app');

//importer package pour utiliser les variables d'environnement
const dotenv = require("dotenv");
const result = dotenv.config();

//Paramètrage du port avec la méthode set de Express
app.set("PORT", process.env.PORT);

//La méthode createServer () prend en argument la focntion qui sera reçu par le server ici les fonction de app.js
const server = http.createServer(app);

//serveur écoute les requêtes sur le port :
server.listen(process.env.PORT)
