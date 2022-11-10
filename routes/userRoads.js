//importation express
const express = require("express");
const raterLimit = require("express-rate-limit")
///importantion du controllers/user.js
const userControllers = require("../controllers/userControllers");
//Importation du middleware/password
const password = require("../middleware/password");
//Router
const router = express.Router();

const limiter = raterLimit ({
    windowMs : 5 * 60 * 1000,
    max : 5,
})
//la route signup (endpoint)
router.post('/signup', password, userControllers.signup);

//la route login (endpoint)
router.post("/login", limiter, userControllers.login)

//exportation du module
module.exports = router;