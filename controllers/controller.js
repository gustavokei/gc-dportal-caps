const sequelize = require("../config/sequelize").sequelize;
const DataTypes = require("sequelize");
const users = require("../models/users")(sequelize, DataTypes);
const Characters = require("../models/Characters")(sequelize, DataTypes);
const ConnectStatusDB = require("../models/ConnectStatusDB")(
  sequelize,
  DataTypes
);
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
  getOneUser,
  getCharRankExp,
  getCharRankWin,
  userAuth,
  getCharacter,
  updateCharacter,
  addItem,
  getItem,
  deleteItem,
  restoreItem,
  getServerStatus,
};
