const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");

const { generateOS, generateOrderEvent } = require("../services/OrderSrv");
const { Order, Ecommerce, OrderExtraAttribute } = require("../db/models");
const Joi = require("joi");

// GENERATE OS for order valid
router.post("/valid", async (req, res) => {
   const orders = await Order.findAll({
      where: {
         id_status_order: process.env.WC_STATUS_ORDER_DEFAULT,
      },
      include: [
         { model: Ecommerce },
         {
            model: OrderExtraAttribute,
            require: false,
         },
      ],
   });

   orders.forEach((order, index) => {
      generateOS(order);
   });

   return res.send("Se generaron las ordenes");
});

// GENERATE OS for order selected
router.post("/selected", async (req, res) => {
   const { selected } = res.body;

   const orders = await Order.findAll({
      where: {
         id_status_order: 6,
         id: selected,
      },
      include: { Ecommerce },
      include: { OrderExtraAttribute },
   });

   orders.forEach((order, index) => {
      orderSrv.generateOS(order);
   });

   return res.send("Se generaron las ordenes");
});

router.post("/event-push", async (req, res) => {
   const schema = Joi.object({
      trackingNumber: Joi.string().required(),
      event: Joi.object({
         codigo: Joi.string().required(),
      }).required(),
   });

   try {
      let { value, error } = schema.validate(req.body);
      if (error) throw error;

      const { trackingNumber, event } = value;

      const order = await Order.findOne({
         include: [
            {
               model: OrderExtraAttribute,
               where: { tracking_code: trackingNumber },
            },
         ],
      });

      if (order == null) throw "Order no encontrado";

      orderEvent = generateOrderEvent(order.id_order, event.codigo);
      if (error) throw error;

      return res.json({ message: "Order Event generado correctamente" });
   } catch (error) {
      return res.status(500).json({ error });
   }
});

module.exports = router;
