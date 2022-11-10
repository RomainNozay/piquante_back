//importer mongoose
const mongoose = require('mongoose');

//importation mongoose unique validtaor
const uniqueValidator = require("mongoose-unique-validator");

// le modèle de base de donnée pour le signup 
const usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

//Ne pas enregistré deux fois le même email 
usersSchema.plugin(uniqueValidator);

//exportation du module
module.exports = mongoose.model("user", usersSchema);