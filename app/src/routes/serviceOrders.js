const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");

const { generateOS } = require('../services/OrderSrv');
const { Order, Ecommerce, OrderExtraAttribute } = require('../db/models');

// GENERATE OS for order valid
router.post('/valid', async (req, res) => {
   const orders = await Order.findAll({
      where : {
         id_status_order : 6
      },
      include : [
         { model : Ecommerce }, 
         { 
            model : OrderExtraAttribute,
            require : false
         }
      ]
   });

   orders.forEach((order, index) => {
      generateOS(order);
   });

   return res.send('Se generaron las ordenes');
})

// GENERATE OS for order selected
router.post('/selected', async (req, res) => {
   const { selected } = res.body

   const orders = await Order.findAll({
      where : {
         id_status_order : 6,
         id : selected
      },
      include : { Ecommerce },
      include : { OrderExtraAttribute }
   });

   orders.forEach((order, index) => {
      orderSrv.generateOS(order);
   });

   return res.send('Se generaron las ordenes');
})


router.post('/event-push', async (req, res) => {
   const { trackingNumber, event } = res.body

   const orderExtra = OrderExtraAttribute.findOne({ 
      where: {tracking_code : trackingNumber } 
   });

   //const { codigo }
   /*const orderEvent = OrderEvent.create({
      id_status_order : 
   })*/

   const orders = await OrderEvent.findAll({
      where : {
         id_status_order : 6,
         id : selected,
         id_order : orderExtra.id_order
      },
      include : { Ecommerce },
      include : { OrderExtraAttribute }
   });
   

   return res.send('Se generaron las ordenes');
})


module.exports = router