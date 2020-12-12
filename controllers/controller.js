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

const getCharRankExp = (req, res) => {
  Characters.findAll({
    order: [["Exp", "DESC"]],
    where: {
      CharType: req.params.chartype,
    },
    limit: 10,
  }).then((data) => {
    res.status(200).json(data);
  });
};

const getCharRankWin = (req, res) => {
  Characters.findAll({
    order: [["Win", "DESC"]],
    where: {
      CharType: req.params.chartype,
    },
    limit: 10,
  }).then((data) => {
    res.status(200).json(data);
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

const { QueryTypes } = require("sequelize");
const addItem = (req, res) => {
  sequelize
    .query("SELECT GoodsName FROM GoodsInfoList WHERE GoodsID = :GoodsID", {
      type: QueryTypes.SELECT,
      replacements: {
        GoodsID: parseInt(req.params.itemid),
      },
    })
    .then((result) => {
      console.log(result);
      if (result == "") {
        // invalid id
        res.status(200).json("Error! Invalid ItemId");
      } else {
        const itemName = result;
        sequelize
          .query(
            "WIGAWaitItem_insert_20130402 @01iLoginUID_input=:LoginUID, @02iCharType_input=:CharType, @03iItemID_input=:ItemID, @04iGradeID_input=:GradeID, @05iPeriod_input=:Period, @06iDuration_input=:Duration, @07iGetType_input=:GetType, @08iStatus_input=:Status, @09iItemLevel_input=:ItemLevel, @10iStrengthLevel_input=:StrengthLevel",
            {
              replacements: {
                LoginUID: parseInt(req.params.loginuid),
                CharType: -1,
                ItemID: parseInt(req.params.itemid),
                GradeID: 3,
                Period: -1,
                Duration: -1,
                GetType: 0,
                Status: 0,
                ItemLevel: 0,
                StrengthLevel: 0,
              },
            }
          )
          .then((result) => {
            sequelize
              .query(
                "UIGAUserItem_merge_20130415 @01iLoginUID_input=:LoginUID, @02iItemID_input=:ItemID, @03iGradeID_input=:GradeID, @04iWIGAUID_input=:WIGAUID",
                {
                  replacements: {
                    LoginUID: parseInt(req.params.loginuid),
                    ItemID: parseInt(req.params.itemid),
                    GradeID: 3,
                    WIGAUID: Object.values(
                      Object.values(Object.values(result)[0])[0]
                    )[0],
                  },
                }
              )
              .then((result) => {
                console.log(itemName);
                res.status(200).json(itemName);
              });
          });
      }
    });
};

const getAccount = (req, res) => {
  sequelize
    .query(
       "SELECT dbo.users.Login,  dbo.GCAPPEmail.email, dbo.users.passwd, dbo.users.gamePoint, dbo.CashUsers.Cash, dbo.VCGAVirtualCash.VCPoint, dbo.VCGAVirtualCash.LoginUID FROM dbo.VCGAVirtualCash INNER JOIN dbo.users ON (dbo.VCGAVirtualCash.LoginUID = dbo.users.LoginUID) INNER JOIN dbo.GCAPPEmail ON (dbo.users.Login = dbo.GCAPPEmail.Login) INNER JOIN dbo.CashUsers ON (dbo.GCAPPEmail.Login = dbo.CashUsers.Login) WHERE dbo.users.Login = :Login",
      {
        type: QueryTypes.SELECT,
        replacements: {
          Login: req.body.Login,
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    });
};

const updateAccount = (req, res) => {
  users
    .findOne({
      where: {
        Login: req.body.Login,
      },
    })
    .then((result) => {
      if (req.body.passwd !== result.passwd) { // password will be updated and encrypted
        sequelize
          .query(
            "updateAccountStoredProc @Login_input=:Login, @email_input=:email, @passwd_input=:passwd, @gamePoint_input=:gamePoint, @Cash_input=:Cash, @VCPoint_input=:VCPoint",
            {
              replacements: {
                Login: req.body.Login,
                email: req.body.email,
                passwd: md5(req.body.passwd),
                gamePoint: req.body.gamePoint,
                Cash: req.body.Cash,
                VCPoint: req.body.VCPoint,
              },
            }
          )
          .then((val) => {
            console.log(val);
            res.status(200).json(val);
          });
      } else { // current password will remain the same
        sequelize
          .query(
            "updateAccountStoredProc @Login_input=:Login, @email_input=:email, @passwd_input=:passwd, @gamePoint_input=:gamePoint, @Cash_input=:Cash, @VCPoint_input=:VCPoint",
            {
              replacements: {
                Login: req.body.Login,
                email: req.body.email,
                passwd: req.body.passwd,
                gamePoint: req.body.gamePoint,
                Cash: req.body.Cash,
                VCPoint: req.body.VCPoint,
              },
            }
          )
          .then((val) => {
            console.log(val);
            res.status(200).json(val);
          });
      }
    });
};

module.exports = {
  getAllUsers,
  getOneUser,
  getCharRankExp,
  getCharRankWin,
  userAuth,
  getCharacter,
  updateCharacter,
  addItem,
  getAccount,
  updateAccount,
};
