/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "GCAPPEmail",
    {
      Login: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "GCAPPEmail",
      schema: "dbo",
      timestamps: false,
    }
  );
};
