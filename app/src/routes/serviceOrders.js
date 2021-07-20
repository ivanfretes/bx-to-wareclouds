const app = express();
const router = express.Router();
const { Op } = require("sequelize");
const axios = require('axios');


// GENERATE OS for order valid
router.get('/valid', async (req, res) => {

   const orders = await Order.findAll({
      where : {
         id_status_order : 6
      }
   });

   orders.forEach((order, index) => {
      const body = {
         "printFormatCode": 4,
         "orderNumber": "9999152408692",
         "references": [],
         "serviceType": "EX",
         "productType": "P",
         "productCategory": "PAQU",
         "currency": "CLP",
         "shipmentCost": 0,
         "extendedClaim": false,
         "companyId": 2000,
         "userName": "USRWCLOUD",
         "comments": "Comentario de Prueba",
         "pickup": {
            "location": {
               "stateId": 15,
               "districtId": "AGN",
               "address": "Calle 2,2",
               "name": "CESAR"
            },
            "contact": {
               "fullname": "Jorge Munoz",
               "phone": "54544522"
            }
         },
         "dropoff": {
            "contact": {
               "fullname": "Juan Perez",
               "phone": "+56123456789"
            },
            "location": {
               "stateId": 9,
               "districtId": "VIC",
               "address": "Direccion X",
               "name": "Direccion de Entrega"
            }
         },
         "packages": [
            {
               "weightUnit": "KG",
               "lengthUnit": "CM",
               "weight": 1,
               "length": 1,
               "width": 1,
               "height": 1,
               "quantity": 1,
               "extras": [
                  {
                     "name": "name_of_package",
                     "value": "Paquete X"
                  }
               ]
            }
         ],
         "notificationContacts": [
            {
               "contactType": "R",
               "contactChannel": 2,
               "value": "ifretes@gux.cl",
               "events": [
                  {
                     "code": 5
                  },
                  {
                     "code": 21
                  }
               ]
            }
         ]
         };
         
         const response = await axios.post(`${process.env.BLUE_EXPRESS_API}/bx-emission/v1`, 
            JSON.stringify(body) , {
            headers : {
               'Accept': 'application/json', 
               'Content-Type': 'application/json', 
               'BX-TOKEN': process.env.BX_TOKEN, 
               'BX-USERCODE': process.env.BX_USERCODE, 
               'BX-CLIENT_ACCOUNT': process.env.BX_CLIENT_ACCOUNT
            },

         });
   });

   return res.json(order);
})


module.exports = router