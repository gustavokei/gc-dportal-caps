const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.SQL_DATABASE,
  process.env.SQL_USER,
  process.env.SQL_PASS,
  {
    host: process.env.NGROK_HOST,
    port: process.env.NGROK_PORT,
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
