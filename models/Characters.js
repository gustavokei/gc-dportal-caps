/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Characters",
    {
      Login: {
        type: DataTypes.STRING(40),
        allowNull: false,
        primaryKey: true,
      },
      CharType: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      Promotion: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Exp: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 0,
      },
      Level: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Win: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      Lose: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      LoginUID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ExpS4: {
        type: DataTypes.BIGINT,
        allowNull: false,
        defaultValue: 1865394200,
      },
    },
    {
      sequelize,
      tableName: "Characters",
      schema: "dbo",
      timestamps: false,
    }
  );
};
