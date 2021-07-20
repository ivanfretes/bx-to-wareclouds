const OrderSrv = {};
OrderSrv.generateOS = (order) => {
   let orderNumber = order.order_code + order.Ecommerce.tax_registry_number; 
   if (orderNumber.lenght > 20)
      orderNumber = orderNumber.substring(orderNumber.lenght - 20)
  

   const body = {
      "printFormatCode": 4,
      "orderNumber": orderNumber,
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

      if (response.status == 200){
         return orderNumber.data.data;
      } else {
         console.log('Error')
      }
}

module.exports = OrderSrv;