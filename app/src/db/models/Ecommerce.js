const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Ecommerce = sequelize.define('Ecommerce', {
   id_ecommerce: {
      type: DataTypes.INTEGER({ length : 11 }),
      autoIncrement : true
   },
   password : DataTypes.STRING(200),
   ecommerce_name : {
      type : DataTypes.STRING(45),
   },
   tax_registry_number : {
      type : DataTypes.STRING(45),
   }
}, {
   // Other model options go here
});

module.exports = () => Ecommerce