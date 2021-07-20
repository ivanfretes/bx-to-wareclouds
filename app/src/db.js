const Sequelize = require("sequelize");
const {DB, USER, PASSWORD, HOST, DIALECT} = require("./config/db.config.js");

const sequelize = new Sequelize(DB, USER, PASSWORD, {
  host: HOST,
  dialect: DIALECT,
  operatorsAliases: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;