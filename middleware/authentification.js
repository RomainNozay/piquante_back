const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");


module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, `${process.env.RND_TKN}`)
        const userId = decodedToken.userId
        if (request.body.userId && request.body.userId !== userId) {
            throw 'User ID non valable !'
        } else {
            next();
        }
    } catch (error) {
        response.status(401).json({ error: error | 'Requête non-authentifiée !' })
    }
}