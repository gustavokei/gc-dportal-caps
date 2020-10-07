const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);

const getAllUsers = (req, res) => {
  users.findAll().then((err, data) => {
    if (err) {
      res.status(404).json(err);
      return;
    }
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
    .then((err, data) => {
      if (err) {
        res.status(404).json(err);
        return;
      }
      res.status(200).json(data);
    });
};

module.exports = {
  getAllUsers,
  getOneUser,
};
