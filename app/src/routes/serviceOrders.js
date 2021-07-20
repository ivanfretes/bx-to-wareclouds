const app = express();
const router = express.Router();
const { Op } = require("sequelize");



// GET THE ALL ORDER VALID
router.get('/valid', async (req, res) => {
   const {  } = req.params
   
   const orders = await Order.findAll({
      where : {
         id_status_order : 6,
         id_city : {
            [Op.ne] : req.params.id_city
         }
      },
      limits : {
         limits : rows, 
         offset :  (1 + rows) * page 
      }
   });

   return res.json(order);
})


module.exports = router