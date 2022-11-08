//importation
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//exportattion de la fonction du middleware
module.exports = (res, req, next) => {
    try {

    }catch(error){
       res.status(401).json({error}) 
    }
}