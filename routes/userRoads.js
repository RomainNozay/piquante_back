//importation express
const express = require ("express");

///importantion du controllers/user.js
const userControllers = require("../controllers/userControllers");
//Importation du middleware/password
const password = require("../middleware/password");
//Router
const router = express.Router();

//la route signup (endpoint)
router.post('/signup', password, userControllers.signup);

//la route login (endpoint)
router.post("/login", userControllers.login)

//exportation du module
module.exports = router;