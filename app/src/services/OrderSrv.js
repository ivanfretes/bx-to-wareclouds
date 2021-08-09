const axios = require("axios");
const { Headers, StatusEventList, getPackages } = require("../constants");
const {
   OrderExtraAttribute,
   OrderEvent,
   Label,
   OrderLabel,
} = require("../db/models");
const { xmlToLabels } = require("./BXDocumentSrv");

module.exports = {
   /**
    * Generate an Order Service
    * @param {Order} order
    */
   generateOS: async (order) => {
      try {
         const rut = order.Ecommerce.tax_registry_number;
         const rutWihoutDv = rut.split("-");
         let orderNumber = order.order_code + rutWihoutDv[0];
         if (orderNumber.lenght > 20)
            orderNumber = orderNumber.substring(orderNumber.lenght - 20);

         const body = {
            printFormatCode: process.env.WC_ORDER_DOCUMENT_TYPE,
            orderNumber,
            references: [],
            serviceType: "EX",
            productType: "P",
            productCategory: "PAQU",
            currency: "CLP",
            shipmentCost: 0,
            extendedClaim: false,
            companyId: process.env.BX_COMPANY_ID,
            userName: process.env.BX_USERNAME,
            comments: "--",
            pickup: {
               location: {
                  stateId: 15,
                  districtId: "AGN",
                  address: "Calle 2,2",
                  name: "CESAR",
               },
               contact: {
                  fullname: "Jorge Munoz",
                  phone: "54544522",
               },
            },
            dropoff: {
               contact: {
                  fullname: "Juan Perez",
                  phone: "+56123456789",
               },
               location: {
                  stateId: 9,
                  districtId: "VIC",
                  address: "Direccion X",
                  name: "Direccion de Entrega",
               },
            },
            packages: [...getPackages(process.env.WC_PACKAGE_CANT)],
            notificationContacts: [
               {
                  contactType: "R",
                  contactChannel: 2,
                  value: "ifretes@gux.cl",
                  events: [
                     {
                        code: 5,
                     },
                     {
                        code: 21,
                     },
                  ],
               },
            ],
         };

         // Create de OS
         const { data, status } = await axios.post(
            `${process.env.BX_API}/bx-emission/v1`,
            JSON.stringify(body),
            { headers: Headers }
         );

         if (status !== 200) throw new Error("OS Response Error (BX)");

         // Get the labels info from BX
         const serviceOrder = data.data;
         OrderExtraAttribute.create({
            id_order: order.id_order,
            tracking_code: serviceOrder.trackingNumber,
         });

         const { contenido } = serviceOrder.labels[0];
         const labelsBx = xmlToLabels(contenido);

         labelsBx.forEach(async (element) => {
            const label = await Label.create({
               label_raw: JSON.stringify(element),
            }).dataValues;

            OrderLabel.create({
               id_label: label.id_label,
               id_order: order.id_order,
            });
         });
      } catch (error) {
         console.log(error);
      }
   },

   /**
    * Generate a Event to Orders
    * @param {number} id_order
    * @param {string} status_value
    * @returns : OrderEvent
    */
   generateOrderEvent: async (id_order, status_value) => {
      const numberStatus = StatusEventList[`${status_value}`];
      if (numberStatus == undefined) return null;

      const orderEvent = await OrderEvent.create({
         id_status_order: numberStatus,
         id_order,
         id_role: process.env.WC_ROLE_DEFAULT,
      });

      return orderEvent;
   },
};
