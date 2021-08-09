const express = require("express");
const {
   generateDocument,
   generateBarcode,
} = require("../services/BXDocumentSrv");
const router = express.Router();
const { toCanvas, toBuffer } = require("bwip-js");
const {
   Order,
   OrderLabel,
   Warecloud,
   Label,
   OrderExtraAttribute,
} = require("../db/models");
const Joi = require("joi");
const { col } = require("sequelize");

router.post("/generate", async (req, res) => {
   const schema = Joi.object({
      id_warecloud: Joi.string().required(),
   });

   try {
      const value = await schema.validateAsync(req.body);
      const { id_warecloud } = value;

      // Search if exists the wareclouds
      const warecloud = await Warecloud.findOne({
         where: { id_warecloud },
      });

      if (warecloud == null) throw "Warecloud no encontrado";

      const orderLabels = await OrderLabel.findAll({
         attributes: [
            "id_label",
            "id_order",
            [col("Label.label_raw"), "label_raw"],
            [col("Order.order_code"), "order_code"],
            [col("Order.order_code"), "order_code"],
            [col("Order.id_ecommerce"), "id_ecommerce"],
            [col("Order.id_warecloud"), "id_warecloud"],
            [col("Order.id_route"), "id_route"],
            [col("Order.id_status_order"), "id_status_order"],
            [col("Order.first_name"), "first_name"],
            [col("Order.last_name"), "last_name"],
            [col("Order.email"), "email"],
            [col("Order.address"), "address"],
            [col("Order.address_detail"), "address_detail"],
            [col("Order.address_extra_info"), "address_extra_info"],
            [col("Order.id_city"), "id_city"],
            [col("Order.id_country"), "id_country"],
            [col("Order.phone"), "phone"],
            [col("Order.OrderExtraAttribute.tracking_code"), "tracking_code"],
         ],
         include: [
            { model: Label, attributes: [] },
            {
               model: Order,
               attributes: [],
               include: [{ model: OrderExtraAttribute }],
               where: {
                  id_warecloud,
               },
            },
         ],
      });

      const oLabels = await orderLabels.map((element) => element.dataValues);
      generateDocument(res, oLabels);
   } catch (error) {
      return res.status(500).json({ error });
   }
});

router.get("/upload-pdf", async (req, res) => {});

module.exports = router;
