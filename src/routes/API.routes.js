const ApiControllers = require("../controllers/ApiControllers");
const express = require("express");
const router = express.Router();


router.get("/", ApiControllers.getAllUsers);
router.get("/users", ApiControllers.getAllUsers);

router.get("/products", ApiControllers.getAllProducts);

module.exports = router