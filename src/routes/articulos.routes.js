const {Router} = require("express");
const router = Router();
const articuloControllers = require("../controllers/articulosController");

const {validateArticulos, validatePartialArticulos} = require('../../schemas/articulosSchema')



module.exports = router;