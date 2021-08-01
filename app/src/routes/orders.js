const express = require("express");

const router = express.Router();
const Sequelize = require("sequelize");
const { Order, Ecommerce, Warecloud, OrderEvent } = require("../db/models");

const { Op } = Sequelize;
const Joi = require("joi");
const { Cities } = require("../constants");

// Create a order
router.post("/", async (req, res) => {
   const schema = Joi.object({
      id_warecloud: Joi.string().required(),
      id_ecommerce: Joi.string().required(),
      order_code: Joi.string().required(),
      id_route: Joi.number().default(6),
      first_name: Joi.string().default(null),
      last_name: Joi.string().default(null),
      email: Joi.string(),
      address_extra_info: Joi.string().default(null),
      id_country: Joi.number().default(process.env.WC_COUNTRY_DEFAULT),
   });

   try {
      const value = await schema.validateAsync(req.body);
      const { id_warecloud, id_ecommerce } = value;

      // Search if exists the wareclouds
      const warecloud = await Warecloud.findOne({
         where: { id_warecloud },
      });
      if (warecloud == null) throw "Warecloud no encontrado";

      // Search if exist the ecommerce
      const ecommerce = await Ecommerce.findOne({
         where: { id_ecommerce },
      });
      if (ecommerce == null) throw "Ecommerce no encontrado";

      const order = await Order.create({
         ...value,
         address: warecloud.address,
         address_detail: warecloud.address_detail,
         id_ecommerce,
         id_warecloud,
         id_city: warecloud.id_city,
         phone: warecloud.phone,
         id_status_order: process.env.WC_ORDER_STATE_DEFAULT,
      });

      OrderEvent.create({
         id_order: order.id,
         id_status_order: process.env.WC_ORDER_STATE_DEFAULT,
      });
      return res.json({ data: order });
   } catch (error) {
      return res.status(500).json({ error });
   }
});

// Get all the orders
router.get("/", async (req, res) => {
   const schema = Joi.object({
      ecommerce_name: Joi.string().default(null),
      page: Joi.number().default(1),
      id_ecommerce: Joi.string().default(null),
      rows: Joi.number().default(15),
      id_city: Joi.number().default(null),
   });

   const { value } = schema.validate(req.query);
   const { ecommerce_name, page, rows } = value;

   const where = {
      id_status_order: process.env.WC_ORDER_STATE_DEFAULT,
   };
   if (ecommerce_name != null) where.id_ecommerce = ecommerce_name;

   const orders = await Order.findAll({
      attributes: [
         "id_order",
         "order_code",
         "Ecommerce.ecommerce_name",
         "address",
         "address_detail",
         "address_extra_info",
         "id_city",
      ],
      include: [{ model: Ecommerce }, { model: Warecloud }],
      limits: {
         limits: rows,
         offset: (1 + rows) * page,
      },
   });

   return res.json(orders);
});

module.exports = router;
