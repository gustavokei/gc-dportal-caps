const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);
const Characters = require("../models/Characters")(sequelize, DataTypes);
var md5 = require("md5");

const getAllUsers = (req, res) => {
  users.findAll().then((data) => {
    res.status(200).json(data);
  });
};

const getOneUser = (req, res) => {
  console.log(req.params);
  users
    .findAll({
      where: {
        Login: req.params.login,
      },
    })
    .then((data) => {
      res.status(200).json(data);
    });
};

const userAuth = (req, res) => {
  let { Login, passwd } = req.body;
  users
    .findOne({
      where: {
        Login: Login,
      },
    })
    .then((users) => {
      if (!users) {
        return res.status(404).send("User not found");
      } else {
        if (md5(passwd) !== users.passwd)
          return res.status(404).send("Invalid password");
        res.status(200).send("Success");
      }
    });
};

const getCharacter = (req, res) => {
  let { Login, CharType } = req.body;
  Characters.findAll({
    where: {
      Login: Login,
      CharType: CharType,
    },
  }).then((data) => {
    if (data == "") {
      return res
        .status(404)
        .send(
          "This user does not exist or CharType " + CharType + " is invalid"
        );
    } else {
      res.status(200).json(data);
    }
  });
};

const updateCharacter = (req, res) => {
  let { Login, CharType, Level, ExpS4, Promotion, Win, Lose } = req.body;
  Characters.update(
    { Level: Level, ExpS4: ExpS4, Promotion: Promotion, Win: Win, Lose: Lose },
    {
      where: {
        Login: Login,
        CharType: CharType,
      },
    }
  ).then((data) => {
    if (data == "") {
      return res
        .status(404)
        .send(
          "This user does not exist or CharType " + CharType + " is invalid"
        );
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  userAuth,
  getCharacter,
  updateCharacter,
};
