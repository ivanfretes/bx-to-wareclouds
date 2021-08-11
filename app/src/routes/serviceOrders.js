const express = require("express");
const router = express.Router();
const { Op, literal } = require("sequelize");

const { generateOS, generateOrderEvent } = require("../services/OrderSrv");
const { Order, Ecommerce, OrderExtraAttribute } = require("../db/models");
const Joi = require("joi");
const { parseString } = require("xml2js");

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
      carrier_tracking_number: Joi.string().required(),
      tracking_data: Joi.string().required(),
   });

   try {
      const { value, error } = schema.validate(req.body);
      if (error) throw error;

      const { carrier_tracking_number, tracking_data } = value;

      // Verify if exists the tracking code
      const orderExtra = await OrderExtraAttribute.findOne({
         where: { tracking_code: carrier_tracking_number },
      });
      if (orderExtra == null) throw "Order no existe";

      let jsonDoc;
      parseString(tracking_data, { mergeAttrs: true }, (err, result) => {
         jsonDoc = JSON.stringify(result);
      });
      const jsonData = JSON.parse(jsonDoc);
      const document =
         jsonData["soap:Envelope"]["soap:Body"][0][
            "ns3:responseObtenerDocumento"
         ][0].listaDocumento[0].documento[0];

      // Concepto que le asigna BX a eventos (pinchazo) es un arreglo de eventos,
      // Siempre el ultimo es el primer elemento
      const { pinchazo } = document.listaPinchazosNacionales[0];
      const lastEvent = pinchazo[0];

      const orderEvent = await generateOrderEvent(
         orderExtra.id_order,
         lastEvent.codigoTipo[0]
      );

      if (orderEvent == null) throw "Codigo no permitido";
      return res.json({ message: "Order Event generado correctamente" });
   } catch (error) {
      return res.status(500).json({ error });
   }
});

module.exports = router;
