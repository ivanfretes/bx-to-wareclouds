const axios = require("axios");
const { Headers, StatusEventList } = require("../constants");
const { OrderExtraAttribute, OrderEvent } = require("../db/models");

module.exports = {
   generateOS: async (order) => {
      try {
         const rut = order.Ecommerce.tax_registry_number;
         const rutWihoutDv = rut.split("-");
         let orderNumber = order.order_code + rutWihoutDv[0];
         if (orderNumber.lenght > 20)
            orderNumber = orderNumber.substring(orderNumber.lenght - 20);

         const body = {
            printFormatCode: 4,
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
            comments: "Comentario de Prueba",
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
            packages: [
               {
                  weightUnit: "KG",
                  lengthUnit: "CM",
                  weight: 1,
                  length: 1,
                  width: 1,
                  height: 1,
                  quantity: 1,
                  extras: [
                     {
                        name: "name_of_package",
                        value: "Paquete X",
                     },
                  ],
               },
            ],
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

         // OrderExtraAttribute.create()
         const { data, status } = await axios.post(
            `${process.env.BX_API}/bx-emission/v1`,
            JSON.stringify(body),
            { headers: Headers }
         );

         if (status !== 200) throw "OS Response Error (BX)";

         const serviceOrder = data.data;

         OrderExtraAttribute.create({
            id_order: order.id_order,
            tracking_code: serviceOrder.trackingNumber,
         });

         console.log(data);
      } catch (error) {
         console.log(error);
      }
   },

   generateOrderEvent: async (id_order, status_value) => {
      try {
         const numberStatus = StatusEventList[`${status_value}`];
         if (numberStatus === undefined) throw "Order Event No definido";

         const value = await OrderEvent.create({
            id_status_order: numberStatus,
            id_order,
         });
         return { OrderEvent };
      } catch (error) {
         return { error };
      }
   },
};
