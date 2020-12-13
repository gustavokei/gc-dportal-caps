const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);
const Characters = require("../models/Characters")(sequelize, DataTypes);
var md5 = require('md5');

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
      order: [["ExpS4", "DESC"]],
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

const userAuth = (req, res) => {
     let { Login, passwd } = req.body;
     users.findOne({
      where: {
       Login: Login
      }
     }).then(users => {
       if (!users) {
         return res.status(404).send("User not found");
          } else {
             if (md5(passwd)!==users.passwd) 
              return res.status(404).send("Invalid password");
            res
            .status(200)
            .send("Success"); 
       }  
   });
}

module.exports = {
  getAllUsers,
  getOneUser,
  getCharRankExp,
  getCharRankWin,
  userAuth
};
