const express = require("express");
const CloudStorageSrv = require("../services/CloudStorageSrv");
const router = express.Router();

router.get("/", (req, res) => {
   CloudStorageSrv.uploadFile();
   res.send("Contenido de Prueba");
});

module.exports = router;
