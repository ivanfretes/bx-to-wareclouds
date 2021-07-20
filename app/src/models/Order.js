const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Order = sequelize.define('Order', {
  id_order: {
    type: DataTypes.INTEGER({ length : 11 }),
    autoIncrement : true
  },
  order_code : DataTypes.STRING(20),
  id_ecommerce : {
     type : DataTypes.STRING(45),
  },
  id_warecloud : {
     type : DataTypes.STRING(45),
  },
  id_route : {
     type : DataTypes.INTEGER(11)
  },
  id_status_order : {
     type : DataTypes.INTEGER(11)
  },
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
  address_extra_info : {
     type : DataTypes.STRING(500),
  },
  id_city : {
     type : DataTypes.INTEGER({length : 11})
  },
   id_country : {
     type : DataTypes.INTEGER({length : 11})
   },
   phone : {
     type : DataTypes.STRING(45),
  },
  creatad_at : {
     type : DataTypes.DATE,
  },
  updated_at : {
     type : DataTypes.DATE
  }
}, {
   classMethods : {
      associate : function(models) {
        Order.hasOne(models.Config)
      }
    },
    hooks: {
      afterCreate: function(order, options) {
        //
      }
    }
});

Order.hasMany(OrderEvent, { hooks : true})

module.exports = () => Order