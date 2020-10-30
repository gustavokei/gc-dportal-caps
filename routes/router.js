const express = require("express");
const router = express.Router();

const ctrlMain = require("../controllers/controller");

router.get("/all", ctrlMain.getAllUsers);
router.get("/one/:login", ctrlMain.getOneUser);
router.get("/rank/:chartype", ctrlMain.userAuth);
router.get("/auth", ctrlMain.userAuth);

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router;
