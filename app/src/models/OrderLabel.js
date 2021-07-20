const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const OrderLabel = sequelize.define('OrderLabel', {
   id_label : {
      type: DataTypes.INTEGER({ length : 11 }),
   },
   id_order : {
      type : DataTypes.INTEGER({ length : 11 }),
   }
}, {
   // Other model options go here
});

module.exports = () => OrderLabel