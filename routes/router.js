const express = require("express");
const router = express.Router();

const ctrlMain = require("../controllers/controller");

router.get("/all", ctrlMain.getAllUsers);
router.get("/one/:login", ctrlMain.getOneUser);
router.post("/auth", ctrlMain.userAuth);
router.post("/register", ctrlMain.register);
router.post("/verify/:token", ctrlMain.verify);
router.post("/verify", ctrlMain.verifyToken);

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router;
