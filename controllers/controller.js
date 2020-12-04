const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);
const gcappemail = require("../models/GCAPPEMAIL")(sequelize, DataTypes);
const validateRegisterInput = require("../validation/register");
const Characters = require("../models/Characters")(sequelize, DataTypes);
var md5 = require("md5");
const jwt = require("njwt");
const ConnectStatusDB = require("../models/ConnectStatusDB")(
  sequelize,
  DataTypes
);

const getAllUsers = (req, res) => {
  users.findAll().then((data) => {
    res.status(200).json(data);
  });
};

const getAllEmail = (req, res) => {
  gcappemail.findAll().then((data) => {
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

const getEmail = (req, res) => {
  let { Login } = req.body;
  gcappemail
    .findOne({
      where: {
        Login: Login,
      },
    })
    .then((users) => {
      return res.status(200).json(users.email);
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
  let userEmail = "mooh";
  users
    .findOne({
      where: {
        Login: Login,
      },
    })
    .then((users) => {
      if (!users) {
        return res.status(404).json("User not found");
      } else {
        if (md5(passwd) !== users.passwd) {
          return res.status(404).json("Invalid password");
        } else {
          let { Login } = req.body;

          gcappemail
            .findOne({
              where: {
                Login: users.Login,
              },
            })
            .then((users) => {
              usrEmail = users.email;
            });

          function cow() {
            return gcappemail.findOne({
              where: {
                Login: "zaman",
              },
            });
          }

          cow().then(function (result) {
            userEmail = result.email;
          });

          //  "Login Success"
          const payload = {
            id: users.id,
            name: users.Login,
            email: userEmail,
            UniqueID: users.LoginUID,
            //password: passwd
          };
          //  "Creating Token"

          const token = jwt.create(payload, "top-secret-phrase");
          token.setExpiration(new Date().getTime() + 60 * 1000);
          //      res.send(token.compact())
          res.json({
            success: true,
            token: token.compact(),
          });
        }
      }
    });
};

//  "Verifying Token"

const verifyToken = (req, res) => {
  const jwt = require("njwt");
  const { token } = req.body;
  jwt.verify(token, "top-secret-phrase", (err, verifiedJwt) => {
    if (err) {
      res.send(err.message);
    } else {
      res.json({
        message: "Successful Login...",
        verifiedJwt,
      });
    }
  });

  //return res.status(200).send(token);
};

const register = function (req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  users.findOne({ where: { Login: req.body.Login } }).then((users) => {
    if (users) {
      return res.status(400).send("Email already exists");
    } else {
      password = md5(req.body.passwd);

      userRegstr(req.body.Login, password, req.body.email);
    }
  });

  function userRegstr(Login, passwd, email) {
    users.sequelize
      .query(
        "SET IDENTITY_INSERT dbo.users ON; INSERT INTO dbo.users (Login , passwd , sex, LoginUID, firstLogin, lastConnect, lastLogin, playTime, gamePoint, IPAddress, Connecting, ModeLevel, ChannelingID, Grade) VALUES('" +
          Login +
          "','" +
          passwd +
          "','0',(SELECT TOP 1 LoginUID FROM dbo.users ORDER BY LoginUID DESC) + 1, GETDATE(), GETDATE(),GETDATE(), 0, 30000, '0.0.0.0', 0, 0x000000, 0, 0)",
        { type: sequelize.QueryTypes.INSERT }
      )
      .then(function (result) {
        if (result) {
          gcappemail.sequelize.query(
            "INSERT INTO GCAPPEmail (Login, email) VALUES('" +
              Login +
              "','" +
              email +
              "')",
            { type: sequelize.QueryTypes.INSERT }
          );
          return res.json(200, {
            response: { code: 200, message: "User Registered Successfully" },
          });
        } else {
          res.json(400, {
            response: {
              code: 400,
              message: "Error Occured while Registration",
            },
          });
        }
      });
  }
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

const getItem = (req, res) => {
  sequelize
    .query(
      "SELECT TOP 10 ItemUID, ItemID, DelState,	GoodsName from dbo.UIGAUserItem JOIN dbo.GoodsInfoList ON ( UIGAUserItem.ItemID = GoodsInfoList.GoodsID ) WHERE LoginUID = :LoginUID ORDER BY ItemUID DESC",
      {
        replacements: {
          LoginUID: parseInt(req.params.loginuid),
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    });
};

const deleteItem = (req, res) => {
  sequelize
    .query(
      "UPDATE dbo.UIGAUserItem SET DelState = 6 WHERE ItemUID = :ItemUID",
      {
        replacements: {
          ItemUID: parseInt(req.params.itemuid),
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    });
};

const restoreItem = (req, res) => {
  sequelize
    .query(
      "UPDATE dbo.UIGAUserItem SET DelState = 0 WHERE ItemUID = :ItemUID",
      {
        replacements: {
          ItemUID: parseInt(req.params.itemuid),
        },
      }
    )
    .then((result) => {
      res.status(200).json(result);
    });
};

const getServerStatus = (req, res) => {
  ConnectStatusDB.findAll().then((data) => {
    if (data == "") {
      return res.status(404).send("There were no current server");
    } else {
      res.status(200).json(data);
    }
  });
};

module.exports = {
  getAllUsers,
  getAllEmail,
  getOneUser,
  getEmail,
  userAuth,
  register,
  getCharRankExp,
  getCharRankWin,
  getCharacter,
  updateCharacter,
  verifyToken,
  addItem,
  getItem,
  deleteItem,
  restoreItem,
  getServerStatus,
};
