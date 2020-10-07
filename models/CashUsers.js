/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "CashUsers",
    {
      Login: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
      Cash: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 2000,
      },
    },
    {
      sequelize,
      tableName: "CashUsers",
      schema: "dbo",
      timestamps: false,
    }
  );
};
