const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Warecloud = sequelize.define('Warecloud', {
   id_warecloud: {
      type: DataTypes.INTEGER({ length : 11 }),
      autoIncrement : true
   },
   password : DataTypes.STRING(200),
   first_name : {
      type : DataTypes.STRING(45),
   },
   last_name : {
      type : DataTypes.STRING(45),
   },
   email : {
      type : DataTypes.STRING(45),
   },
   address : {
      type : DataTypes.STRING(200),
   },
   address_detail : {
      type : DataTypes.STRING(500),
   },
   identity_number : {
      type : DataTypes.STRING(45),
   },
   id_city : {
      type : DataTypes.STRING(45),
   },
   phone : {
      type : DataTypes.STRING(45),
   }
}, {
   // Other model options go here
});

module.exports = () => Warecloud