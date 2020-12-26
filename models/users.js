/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      Login: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true,
      },
      passwd: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      sex: {
        type: DataTypes.CHAR(1),
        allowNull: false,
      },
      LoginUID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
      },
      firstLogin: {
        type: "SMALLDATETIME",
        allowNull: false,
        defaultValue: sequelize.fn("getdate"),
      },
      lastConnect: {
        type: "SMALLDATETIME",
        allowNull: false,
        defaultValue: sequelize.fn("getdate"),
      },
      lastLogin: {
        type: "SMALLDATETIME",
        allowNull: false,
        defaultValue: sequelize.fn("getdate"),
      },
      playTime: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      gamePoint: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2000,
      },
      IPAddress: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: "(N0.0.0.0",
      },
      Connecting: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      ModeLevel: {
        type: DataTypes.BLOB,
        allowNull: false,
        defaultValue: "((0))",
      },
      ChannelingID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "users",
      schema: "dbo",
      hasTrigger: true,
      timestamps: false,
    }
  );
};
