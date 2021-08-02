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
};
