const express = require("express");
const cors = require("cors");

const app = express();

require("dotenv").config();

// -- DB --
const db = require("./db/models");

db.sequelize.sync();

// -- Middlewares --
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -- Routes --
app.get("/", (req, res) => {
   res.send("api v1");
});
/*app.get("/pull", (req, res) => {
   res.send("api v1");
});*/
app.use("/orders", require("./routes/orders"));
app.use("/service-orders", require("./routes/serviceOrders"));
app.use("/test", require("./routes/test"));
// app.use('/labels', require('./routes/labels'));

const PORT = process.env.PORT || 3334;
app.listen(PORT, () => {
   console.log(`App listening at http://localhost:${PORT}`);
});
