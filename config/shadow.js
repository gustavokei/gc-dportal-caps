const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.SQL_DATABASE_LIST.split(",")[0],
  process.env.SQL_USER,
  process.env.SQL_PASS,
  {
    host: process.env.EXPOSED_HOST,
    port: process.env.EXPOSED_PORT,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
      },
    },
  }
);

module.exports = {
  sequelize,
};
