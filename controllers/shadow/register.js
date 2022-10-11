const sequelize = require("../../config/shadow").sequelize;
var md5 = require("md5");

const register = (req, res) => {
  sequelize
    .query(
      "mup_create_user @strUserID_=:userId, @strPassword_=:pwd, @strUserName_=:userName, @strIDCardNum_=:idCardNum, @iOK=:okCode, @iUserUID=:userUid",
      {
        replacements: {
          userId: req.body.userId,
          pwd: md5(req.body.pwd).toUpperCase(),
          userName: req.body.userName,
          idCardNum: req.body.idCardNum,
          okCode: req.body.okCode,
          userUid: req.body.userUid,
        },
      }
    )
    .then((val) => {
      res.status(200).json(val);
    });
};

module.exports = {
  register,
};
