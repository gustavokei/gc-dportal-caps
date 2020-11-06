const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);
const Characters = require("../models/Characters")(sequelize, DataTypes);

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

const getCharRankExp = (req, res) => {
  Characters
    .findAll({
      order: [["Exp", "DESC"]],
      where: {
        CharType: req.params.chartype,
      },
      limit : 10,
    })
    .then((data) => {
      res.status(200).json(data);
  });
};

const getCharRankWin = (req, res) => {
  Characters
    .findAll({
      order: [["Win", "DESC"]],
      where: {
        CharType: req.params.chartype,
      },
      limit : 10,
    })
    .then((data) => {
      res.status(200).json(data);
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  getCharRankExp,
  getCharRankWin
};
