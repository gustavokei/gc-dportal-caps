const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);
const gcappemail = require("../models/GCAPPEMAIL")(sequelize, DataTypes);
const validateRegisterInput = require("../validation/register");
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

const register = function(req, res){
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  users.findOne({ where: {Login: req.body.Login }}).then(users => {
    if (users) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
     password =  md5(req.body.passwd);

  userRegstr(req.body.Login, password, req.body.email);

    }
  });



function userRegstr(Login, passwd, email){

   users.sequelize.query("SET IDENTITY_INSERT dbo.users ON; INSERT INTO dbo.users (Login , passwd , sex, LoginUID, firstLogin, lastConnect, lastLogin, playTime, gamePoint, IPAddress, Connecting, ModeLevel, ChannelingID, Grade) VALUES('" + Login + "','" + passwd + "','0',(SELECT TOP 1 LoginUID FROM dbo.users ORDER BY LoginUID DESC) + 1, GETDATE(), GETDATE(),GETDATE(), 0, 30000, '0.0.0.0', 0, 0x000000, 0, 0)",
   { type: sequelize.QueryTypes.INSERT }
   ).then(function (result) {
        if(result){
          users.sequelize.query("INSERT INTO GCAPPEmail (Login, email) VALUES('" + Login + "','" + email + "')",{ type: sequelize.QueryTypes.INSERT });
        return res.json(200, {response: {code: 200, message:'User Registered Successfully'}});
    } else{
       res.json(400, {response: {code: 400, message: 'Error Occured while Registration'}});
    } 
})

}



}






module.exports = {
  getAllUsers,
  getOneUser,
  userAuth,
  register,
  

};
