const Sequelize = require("sequelize");

module.exports = new Sequelize(
  "martin", // db name,
  "root", // username
  "", // password
  {
    host: "localhost",
    dialect: "mysql",
    // pool: {
    //   max: 5,
    //   min: 0,
    //   require: 30000,
    //   idle: 10000,
    // },
    // logging: false,
  })