const express = require("express");
const router = express.Router();

const ctrlShadowRegister = require("../controllers/shadow/register");

router.post("/register", ctrlShadowRegister.register);

module.exports = router;
