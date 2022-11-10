const express = require("express");

const saucesControllers = require("../controllers/saucesControllers");
const like = require("../controllers/like")
const router = express.Router();
//importation du middleware de getsion des images
const multer = require('../middleware/multer');
//importation du middleware d'authentification
const auth = require("../middleware/authentification");

//Route
router.post("/", auth, multer, saucesControllers.createSauce);
router.get("/", auth, saucesControllers.getSauces);
router.get("/:id", auth, saucesControllers.getOneSauce);
router.put("/:id", auth, multer, saucesControllers.modifyOneSauce);
router.delete("/:id", auth, saucesControllers.deleteSauce);
router.post("/:id/like", auth, like.giveLike);

module.exports = router;