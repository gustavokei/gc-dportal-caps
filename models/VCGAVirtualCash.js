/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "VCGAVirtualCash",
    {
      LoginUID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      VCPoint: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "VCGAVirtualCash",
      schema: "dbo",
      timestamps: false,
    }
  );
};
