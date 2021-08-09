const express = require("express");
const router = express.Router();
const { Op, literal } = require("sequelize");

const { generateOS, generateOrderEvent } = require("../services/OrderSrv");
const { Order, Ecommerce, OrderExtraAttribute } = require("../db/models");
const Joi = require("joi");

// GENERATE OS for order valid and haven't a tracking code
router.post("/valid", async (req, res) => {
   try {
      const orders = await Order.findAll({
         where: {
            id_status_order: process.env.WC_STATUS_ORDER_DEFAULT,
            [Op.all]: literal(
               "0 = (SELECT COUNT(*) FROM order_extra_attribute WHERE id_order = `Order`.`id_order`)"
            ),
         },
         include: [
            {
               model: Ecommerce,
            },
            {
               model: OrderExtraAttribute,
            },
         ],
      });

      if (orders.length === 0)
         return res.status(418).json({
            status: "error",
            message: "No se encontraron ordenes para generar",
         });

      orders.forEach((order) => {
         generateOS(order);
      });

      return res.send({
         status: "success",
         message: "Se generaron las ordenes",
      });
   } catch (error) {
      return res.status(500).json({ error });
   }
});

// GENERATE OS for order selected, valid and and haven't a tracking code
router.post("/selected", async (req, res) => {
   const schema = Joi.object({
      selected: Joi.array().items(Joi.number()).required(),
   });
   try {
      const { value, error } = schema.validate(req.body);
      if (error) throw error;

      const { selected } = value;
      const orders = await Order.findAll({
         where: {
            id_status_order: process.env.WC_STATUS_ORDER_DEFAULT,
            id_order: [...selected],
            [Op.all]: literal(
               "0 = (SELECT COUNT(*) FROM order_extra_attribute WHERE id_order = `Order`.`id_order`)"
            ),
         },
         include: [
            {
               model: Ecommerce,
            },
            {
               model: OrderExtraAttribute,
            },
         ],
      });

      if (orders.length === 0) {
         return res.status(418).json({
            status: "error",
            message: "No se encontraron ordenes para generar",
         });
      }

      orders.forEach((order) => {
         generateOS(order);
      });

      return res.json({
         status: "success",
         message: "Se generaron las ordenes",
      });
   } catch (error) {
      return res.status(500).json({ error });
   }
});

router.post("/event-push", async (req, res) => {
   const schema = Joi.object({
      trackingNumber: Joi.string().required(),
      event: Joi.object({
         codigo: Joi.string().valid("DR", "DM", "DL").required(),
      }).required(),
   });

   try {
      const { value, error } = schema.validate(req.body);
      if (error) throw error;

      const { trackingNumber, event } = value;

      const orderExtra = await OrderExtraAttribute.findOne({
         where: { tracking_code: trackingNumber },
      });
      if (orderExtra == null) throw "Order no existe";

      const orderEvent = generateOrderEvent(orderExtra.id_order, event.codigo);
      if (orderEvent == null) throw "Codigo de Evento no definido";
      /*console.log("test");
      const order = await Order.update(
         {
            id_status_order: 9,
         },
         {}
      );
      console.log("PRUEBA");
      console.log(order);
      //if (order == null) throw "Order no encontrado";
      */

      return res.json({ message: "Order Event generado correctamente" });
   } catch (error) {
      return res.status(500).json({ error });
   }
});

module.exports = router;
