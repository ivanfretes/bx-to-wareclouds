const express = require("express");

const router = express.Router();
const Sequelize = require("sequelize");
const {
   Order,
   Ecommerce,
   Warecloud,
   OrderEvent,
   City,
   OrderExtraAttribute,
} = require("../db/models");

const { Op, col, literal } = Sequelize;
const Joi = require("joi");

// Create a order
router.post("/", async (req, res) => {
   const schema = Joi.object({
      id_warecloud: Joi.string().required(),
      id_ecommerce: Joi.string().required(),
      order_code: Joi.string().required(),
      id_route: Joi.number().default(process.env.WC_ROLE_DEFAULT),
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
         id_status_order: process.env.WC_STATUS_ORDER_DEFAULT,
      });

      OrderEvent.create({
         id_order: order.id_order,
         id_status_order: process.env.WC_STATUS_ORDER_DEFAULT,
         id_role: process.env.WC_ROLE_DEFAULT,
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
      page: Joi.number().default(1).min(1),
      rows: Joi.number().default(15).min(1),
   });

   try {
      const { value, error } = schema.validate(req.query);
      if (error) throw error;

      const { ecommerce_name, page, rows } = value;

      const where = {
         id_status_order: process.env.WC_STATUS_ORDER_DEFAULT,
         id_city: {
            [Op.not]: process.env.WC_SANTIAGO_DEFAULT,
         },
      };

      if (ecommerce_name != null) where.id_ecommerce = ecommerce_name;

      const orders = await Order.findAll({
         where: {
            ...where,
            [Op.all]: literal(
               "0 = (SELECT COUNT(*) FROM order_extra_attribute WHERE id_order = `Order`.`id_order`)"
            ),
         },
         attributes: [
            "id_order",
            "order_code",
            [col("Ecommerce.ecommerce_name"), "ecommerce_name"],
            "address",
            "address_detail",
            "address_extra_info",
            "id_city",
            [col("City.city_name"), "city_name"],
         ],
         include: [
            { model: Ecommerce, attributes: [] },
            { model: City, attributes: [] },
            { model: OrderExtraAttribute },
         ],
         limits: 5,
         offset: rows * (page - 1),
      });

      return res.json({
         data: orders,
         current_page: page,
         rows,
      });
   } catch (error) {
      return res.status(500).json({ error });
   }
});

module.exports = router;
