//importer mongoose
const mongoose = require('mongoose');

// le modèle de base de donnée pour le signup 
const usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true}
});


//exportation du module
module.exports = mongoose.model("user", usersSchema);