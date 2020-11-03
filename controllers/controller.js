const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);
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


const userAuth = (req, res) => {
     let { Login, passwd } = req.body;
     users.findOne({
      where: {
       Login: Login
      }
     }).then(users => {
       if (!users) {
         return res.status(404).json({
           errors: [{ users: "not found" }],
         });
          }  else {
          
             if (md5(passwd)!==users.passwd) 
              return res.status(400).json({"Incorrect" : "Password"});
            res
            .status(200)
            .json({"status" : "success"}); 
       }  
   });
  
}



module.exports = {
  getAllUsers,
  getOneUser,
  userAuth
};
