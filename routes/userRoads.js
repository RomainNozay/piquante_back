const express = require("express");

const router = express.Router();

const userControllers = require("../controllers/userControllers");
const password = require("../middleware/password");
const raterLimit = require("express-rate-limit")

const limiter = raterLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
})


router.post('/signup', password, userControllers.signup);

router.post("/login", limiter, userControllers.login)

module.exports = router;