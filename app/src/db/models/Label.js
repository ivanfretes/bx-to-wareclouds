const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Label = sequelize.define('Label', {
   id_label: {
      type: DataTypes.INTEGER({ length : 11 }),
      autoIncrement : true
   },
   order_label_link : DataTypes.STRING(200),
   creatad_at : {
      type : DataTypes.DATE,
   },
   updated_at : {
      type : DataTypes.DATE
   },
   expiration_date : {
      type : DataTypes.DATE
   }
}, {
   // Other model options go here
});

module.exports = () => Label