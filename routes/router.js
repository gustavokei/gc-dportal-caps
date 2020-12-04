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
router.get("/additem/:loginuid/:itemid", ctrlMain.addItem);
router.get("/getitem/:loginuid", ctrlMain.getItem);
router.get("/delitem/:itemuid", ctrlMain.deleteItem);
router.get("/restoreitem/:itemuid", ctrlMain.restoreItem);
router.get("/server", ctrlMain.getServerStatus);

//https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object
module.exports = router;
