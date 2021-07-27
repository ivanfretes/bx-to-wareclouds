const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");
const { Order, Ecommerce, Warecloud } = require('../db/models');
const { Op } = Sequelize;
const Joi = require('joi');

// Create a order
router.post('/', async (req, res) => {
   const schema = Joi.object({
      id_warecloud : Joi.number().default(null),
      id_route : Joi.number().default(null),
      first_name : Joi.number().default(null) ,
      last_name : Joi.number().default(null),
      email : Joi.number().default(null),
      address : Joi.number().default(null),
      address_detail : Joi.number().default(null),
      address_extra_info : Joi.number().default(null),
      id_city : Joi.number().default(null),
      id_country : Joi.number().default(null),
      phone : Joi.number().default(null)
   });

   const { value } = schema.validate(req.body);
   //const order = await Order.create(value);
   console.log(value);

   /*const {
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

   const schema = Joi.object({
      name: "" , 
      id_warecloud : ,
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
   })

   schema.validate(req.body);
   // validation
   Joi.object
   

   // Create an order event
   const orderEvent = OrderEvent.create({ 
      id_order : order.id,
      id_status_order : 6
   });*/

   return res.json({ data : order });
})

// Get all the orders
router.get('/', async (req, res) => {
   const schema = Joi.object({
      ecommerce_name : Joi.string().default(null), 
      page : Joi.number().default(1) , 
      id_ecommerce : Joi.string().default(null), 
      rows : Joi.number().default(15),
      id_city : Joi.number().default(null)
   })

   const { value } = schema.validate(req.query);
   const { ecommerce_name, page, id_ecommerce, rows } = value;

   let where = { 
      id_status_order : 6
   };
   if (id_ecommerce != null) 
      where.id_ecommerce = id_ecommerce;
   
   const orders = await Order.findAll({
      where : where,
      attributes: {exclude: ['id']},
      include : [
         { model : Ecommerce },
         { model :  Warecloud }
      ],
      limits : {
         limits : rows, 
         offset :  (1 + rows) * page 
      }
   });

   return res.json(orders);
})


module.exports = router