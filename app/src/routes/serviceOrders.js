const app = express();
const router = express.Router();
const { Op } = require("sequelize");
const axios = require('axios');
const orderSrv = require('../services/OrderSrv');

// GENERATE OS for order valid
router.get('/valid', async (req, res) => {
   const orders = await Order.findAll({
      where : {
         id_status_order : 6
      },
      include : { Ecommerce }
   });

   orders.forEach((order, index) => {
      orderSrv.generateOS(order);
   });

   return res.render('Se generaron las ordenes');
})

// GENERATE OS for order selected
router.get('/selected', async (req, res) => {
   const { selected } = res.body

   // validacion

   const orders = await Order.findAll({
      where : {
         id_status_order : 6,
         id : selected
      },
      include : { Ecommerce }
   });

   orders.forEach((order, index) => {
      orderSrv.generateOS(order);
   });

   return res.render('Se generaron las ordenes');
})


module.exports = router