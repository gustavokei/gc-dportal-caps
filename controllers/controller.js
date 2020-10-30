const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);

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
  users.findAll().then((data) => {
    res.status(200).json(data);
  });
};

const getUserAuth = (req, res) => {
  console.log(req.params);
  users
    .findAll({
      where: {
        Login: req.body.login,
        passwd: req.body.passwd,
      },
    })
    .then((data) => {
      data.passwd =  md5(data.passwd);
      res.status(200).json(data);
  });
};

module.exports = {
  getAllUsers,
  getOneUser,
  userAuth,
  getUserAuth
};
