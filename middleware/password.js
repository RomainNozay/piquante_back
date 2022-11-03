//importation de password validator
const passwordValidator = require("password-validator");

//Création du schéma pour le mail
const passwordSchema = new passwordValidator();

//le schema que doit respecter le mot de passe
passwordSchema
.is().min(5)
.is().max(20)
.is().uppercase()
.is().lowercase()
.is().digits(2)
.is().not().spaces()
.is().not().oneOf(['Passw0rd', 'Password123']);

//vérification 


//exportation
module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next()
    }else{
        return res.status(400).send({error : `Le mot de passe n'est pas assez fort :"+ ${passwordSchema.validate('req.body.password', {list: true})}`})
    }
}