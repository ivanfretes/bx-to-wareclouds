
const express = require('express');
const app = express();
const router = express.Router();
const { Op } = require("sequelize");

// Create a order
router.post('/', async (req, res) => {
   let {
      id_warecloud,
      id_route,
      first_name,
      last_name,
      email,
      address,
      address_detail,
      address_extra_info,
      id_city,
      id_country,
      phone
   } = req.body;

   // validation

   const order = await Order.create({ 
      name: "" , 
      id_status_order : 6,
      id_warecloud,
      id_route : 6,
      first_name,
      last_name,
      email,
      address,
      address_detail,
      address_extra_info,
      id_city,
      id_country,
      phone
   });

   // Create an order event
   const orderEvent = OrderEvent.create({ 
      id_order : order.id,
      id_status_order : 6
   });

   return res.json({ data : order });
});

// GET ALL ORDERS
// Corrección filtrar por ecommerce_name
router.get('/', async (req, res) => {
   const { ecommerce_name, page, ecommerce_id, rows } = req.params
   
   const orders = await Order.findAll({
      where : {
         id_status_order : 6,
         id_city : {
            [Op.ne] : req.params.id_city
         }
      },
      limits : {
         limits : rows, 
         offset :  (1 + rows) * page 
      }
   });

   return res.json(order);
})


module.exports = router;