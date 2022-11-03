//importation express
const express = require ("express");

///importantion du controllers/user.js
const userControllers = require("../controllers/userControllers");

//Router
const router = express.Router();

//la route signup (endpoint)
router.post('/signup', userControllers.signup);

//la route login

//exportation du module
module.exports = router;