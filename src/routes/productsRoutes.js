const productsControllers = require("../controllers/productsControllers");
const express = require("express");
const router = express.Router();

router.get("/",productsControllers.products)
router.get("/cart", productsControllers.productCart)
router.get("/detail", productsControllers.productDetail)

router.get("/admin", productsControllers.admin);
router.post("/admin", productsControllers.productUpload);

module.exports = router;