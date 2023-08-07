const mainControllers = require("../controllers/mainControllers");
const express = require("express");
const router = express.Router();

router.get("/", mainControllers.index)
router.get("/login", mainControllers.login)

router.get("/register", mainControllers.register)
router.post("/register", mainControllers.create)

router.get("/productCart", mainControllers.productCart)
router.get("/productDetail", mainControllers.productDetail)



module.exports = router