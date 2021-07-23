const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const OrderExtraAttribute = sequelize.define('OrderExtraAttribute', {
   id_order_extra_attribute : {
      type: DataTypes.INTEGER({ length : 11 }),
      autoIncrement : true
   },
   id_order_extra_attribute : {
      type : DataTypes.INTEGER({ length : 11 }),
   },
   tracking_code : {
      type : DataTypes.STRING(45),
   }
}, {
   // Other model options go here
});

module.exports = () => OrderExtraAttribute