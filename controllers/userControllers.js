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
                .then(() => res.status(201).send({ message: "utilisateur créé et sauvegardé" }))
                .catch(() => res.status(500).send({ error }.send))

        })
        .catch((error) => res.status(500).send({ error }).send(console.log(error)));



    //console.log(user);


};

