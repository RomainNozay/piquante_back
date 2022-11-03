//importation models de la base de donnée users.js
const modelUser = require("../models/users");

//importation de bcrypt pour mot de passe
const bcrypt = require("bcrypt")

//importation de crypto-js pour crypter le mail
const cryptojs = require("crypto-js");

//importation variable environnement
const dotenv = require ("dotenv");
const result = dotenv.config();

//signup pour enregistrer nouvel utilisateur
exports.signup = (req, res, next) => {

    //Chiffrer l'email avant de l'envoyer sur mongoDB
    const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();

    //hasher le mot de passe avant de l'envoyer dans la base de donnée
    bcrypt.hash(req.body.password, 10) //salt combien de fois hashons nous le mot de passe
        .then((hashPassword) => {

            const user = new modelUser({
                email: emailCryptoJs,
                password: hashPassword
            });

            //envoyer le user dans la base de donnée MongoDB
            user
                .save()
                .then(() => res.status(201).json({ message: "utilisateur créé et sauvegardé" }))
                .catch((error) => res.status(400).json({ error }).send());

        })
        .catch((error) => res.status(500).json({error}).send(console.log(error)));

};

//loggin pour s'identifier
exports.login = (req, res,next) => {

//chiffrez email de la requête
const emailCryptoJs = cryptojs.HmacSHA256(req.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();

//Chercher dans la la base de donnée si le mail est enregistré
modelUser.findOne({email:emailCryptoJs})
//Si le mail n'existe pas
.then((modelUser) => {
if(!modelUser){
    return res.status(400).json({error : "Utilisateur inexistant"})
}
//Contrôler la validité du password
bcrypt.compare(req.body.password, modelUser.password)
.then((controlPassword) => {
    console.log(controlPassword);

    //si mot de passe incorrect
    if(!controlPassword){
        return res.status(401).json({error : "le mot de passe est incorrect"})
    }

    //mot de passe correct
    res.status(200).json({message : "mot de passe corret"})
})

})
.catch((error) => res.status(500).json({error}));
};

