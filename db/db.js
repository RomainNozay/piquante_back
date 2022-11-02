//mongodb+srv://Papours:<password>@cluster0.ealogoq.mongodb.net/?retryWrites=true&w=majority
//importer package pour utiliser les variables d'environnemnt
const dotenv = require("dotenv");
const result = dotenv.config();
//importer mongoose pour me connecter à la abse de donnée mongoDB
const mongoose = require('mongoose');
mongoose.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ealogoq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("connexion à mongoDB réussi"))
.catch(() => console.log("connexion à mongoDB échec"));

//exportation
module.exports = mongoose;