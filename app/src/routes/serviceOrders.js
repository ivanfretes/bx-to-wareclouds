const app = express();
const router = express.Router();
const { Op } = require("sequelize");
const axios = require('axios');

router.get('/valid', async (req, res) => {
   const {  } = req.params
   
   const orders = await Order.findAll({
      where : {
         id_status_order : 6
      }
   });

   orders.forEach(element => {
      
   });

   return res.json(order);
})


module.exports = router