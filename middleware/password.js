const passwordValidator = require("password-validator");
const passwordSchema = new passwordValidator();

passwordSchema
    .is().min(5)
    .is().max(20)
    .is().uppercase()
    .is().lowercase()
    .is().digits(1)
    .is().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);

module.exports = (request, response, next) => {
    if (passwordSchema.validate(request.body.password)) {
        next()
    } else {
        return response.status(400).send({
            error: `Le mot de passe n'est pas assez fort :"+ ${passwordSchema.validate('request.body.password', { list: true })}`
        })
    }
}