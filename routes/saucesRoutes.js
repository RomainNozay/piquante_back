const express = require("express");
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require("../middleware/authentification");

const saucesControllers = require("../controllers/saucesControllers");
const likesControllers = require("../controllers/likesControllers")

router.post("/", auth, multer, saucesControllers.createSauce);
router.get("/", auth, saucesControllers.getSauces);
router.get("/:id", auth, saucesControllers.getOneSauce);
router.put("/:id", auth, multer, saucesControllers.modifyOneSauce);
router.delete("/:id", auth, saucesControllers.deleteSauce);
router.post("/:id/like", auth, likesControllers.giveLike);

module.exports = router;