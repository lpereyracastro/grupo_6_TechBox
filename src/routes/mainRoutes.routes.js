const ApiControllers = require("../controllers/ApiControllers");
const express = require("express");
const router = express.Router();


router.get("/", ApiControllers);

module.exports = router