const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const StatusOrder = sequelize.define('StatusOrder', {
   id_status_order: {
      type: DataTypes.INTEGER({ length : 11 }),
      autoIncrement : true
   },
   status_order_name : {
      type : DataTypes.STRING(45),
   },
   status_order_description : {
      type : DataTypes.STRING(200),
   }
}, {
   // Other model options go here
});

module.exports = () => StatusOrder