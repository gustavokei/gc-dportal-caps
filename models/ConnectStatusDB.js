/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "ConnectStatusDB",
    {
      NO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      GameCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      ServerCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      UserNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      ServerIP: {
        type: DataTypes.STRING(25),
        allowNull: true,
      },
      ServerPort: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      ServerPart: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      ServerName: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      MaxNum: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      ExtraFlag: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      tableName: "ConnectStatusDB",
      schema: "dbo",
      timestamps: false,
    }
  );
};
