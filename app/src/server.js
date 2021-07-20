const express = require('express')
const cors = require("cors");

const app = express()

// Middlewares
app.use(cors({origin : '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB
const db = require("./db.js");
db.sequelize.sync();

// For develop
/*db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});*/


app.get('/', (req, res) => {
   res.send('api v1');
})

app.use('/orders', require('./routes/orders')); 
app.use('/service-orders', require('./routes/serviceOrders')); 
app.use('/labels', require('./routes/labels')); 
//app.use('/', require('./routes/suscribest')); 


const PORT = process.env.PORT || 3334;
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})
