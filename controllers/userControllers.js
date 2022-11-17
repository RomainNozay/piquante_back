const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cryptojs = require("crypto-js")
const User = require('../models/usersModel')

const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

exports.signup = (request, response, next) => {
    if (regex.test(User.email)) {
        return response
            .status(500)
            .json({ error: "Des champs contiennent des caractères invalides" });
    } else {
        const emailCryptoJs = cryptojs.HmacSHA256(request.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
        bcrypt.hash(request.body.password, 10)
            .then((hashPassword) => {
                const user = new User({
                    email: emailCryptoJs,
                    password: hashPassword
                })
                user.save()
                    .then(() => response.status(201).json({ message: 'Utilisateur créé !' }))
                    .catch(error => response.status(400).json({ error }))
            })
            .catch(error => response.status(500).json({ error }))
    }
}

exports.login = (request, response, next) => {
    const emailCryptoJs = cryptojs.HmacSHA256(request.body.email, `${process.env.CRYPTOJS_EMAIL}`).toString();
    User.findOne({ email: emailCryptoJs })
        .then(user => {
            if (!user) {
                return response.status(401).json({ error: 'Utilisateur non trouvé !' })
            }
            bcrypt.compare(request.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return response.status(401).json({ error: 'Mot de passe incorrect !' })
                    }
                    response.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            `${process.env.RND_TKN}`,
                            { expiresIn: '24h' }
                        )
                    })
                })
                .catch(error => response.status(500).json({ error }))
        })
        .catch(error => response.status(500).json({ error }))
}
