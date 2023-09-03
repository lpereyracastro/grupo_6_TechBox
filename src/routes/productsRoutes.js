const productsControllers = require("../controllers/productsControllers");
const express = require("express");
const router = express.Router();

router.get("/",productsControllers.products)
router.get("/cart", productsControllers.productCart)
router.get("/detail", productsControllers.productDetail)

router.get("/loadProduct", productsControllers.loadProduct);
router.post("/loadProduct", productsControllers.storeLoadProduct);

module.exports = router;