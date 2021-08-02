module.exports = {
   Headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "BX-TOKEN": process.env.BX_TOKEN,
      "BX-USERCODE": process.env.BX_USERCODE,
      "BX-CLIENT_ACCOUNT": process.env.BX_CLIENT_ACCOUNT,
   },
   StatusEventList: {
      DR: process.env.WC_STATUS_ORDER_DR,
      DM: process.env.WC_STATUS_ORDER_DM,
      DL: process.env.WC_STATUS_ORDER_DL,
   },
   getPackages: (n_packages) => {
      const packages = [];
      for (let index = 0; index < n_packages; index++) {
         packages.push({
            weightUnit: "KG",
            lengthUnit: "CM",
            weight: process.env.WC_WEIGHT,
            length: process.env.WC_LENGTH,
            width: process.env.WC_WIDTH,
            height: process.env.WC_HEIGHT,
            quantity: process.env.WC_QUANTITY,
            extras: [
               {
                  name: "name_of_package",
                  value: `Paquete ${index + 1}`,
               },
            ],
         });
      }
   },
};
