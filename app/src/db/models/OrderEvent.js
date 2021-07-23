const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const OrderEvent = sequelize.define('OrderEvent', {
  id_order_event: {
    type: DataTypes.INTEGER({ length : 11 }),
    autoIncrement : true
  },
  id_order : {
     type : DataTypes.INTEGER({ length : 11 }),
  },
  user : {
     type : DataTypes.STRING(45)
  },
  id_status_order : {
     type : DataTypes.INTEGER({ length : 11 })
  },
  id_role : {
     type : DataTypes.INTEGER({ length : 11 })
  },
  comment : {
     type : DataTypes.STRING(200),
  },
  receptor_name : {
     type : DataTypes.STRING(45),
  },
  creatad_at : {
     type : DataTypes.DATE,
  },
  updated_at : {
     type : DataTypes.DATE
  }
}, {
});

module.exports = () => OrderEvent