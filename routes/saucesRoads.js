const express = require ("express");

const saucesControllers = require("../controllers/saucesControllers");

const router = express.Router();
const multer = require('../middleware/multer');

//Route
router.post("/",multer, saucesControllers.createSauce);
router.get("/", saucesControllers.getSauces)
router.get("/:id", saucesControllers.getOneSauce)
router.put("/:id",multer, saucesControllers.modifyOneSauce)


module.exports = router;