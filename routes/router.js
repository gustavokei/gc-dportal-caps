const express = require("express");
const router = express.Router();

const ctrlMain = require("../controllers/controller");

router.get("/all", ctrlMain.getAllUsers);
router.get("/one/:login", ctrlMain.getOneUser);
router.get("/rank/exp/:chartype", ctrlMain.getCharRankExp);
router.get("/rank/win/:chartype", ctrlMain.getCharRankWin);
router.post("/auth", ctrlMain.userAuth);
router.post("/getchar", ctrlMain.getCharacter);
router.post("/upchar", ctrlMain.updateCharacter);

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router;
