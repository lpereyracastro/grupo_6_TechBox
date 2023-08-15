const mainControllers = require("../controllers/mainControllers");
const express = require("express");
const router = express.Router();

router.get("/", mainControllers.index)
router.get("/login", mainControllers.login)

router.get("/register", mainControllers.register)
router.post("/register", mainControllers.create)

router.get("/productCart", mainControllers.productCart)
router.get("/productDetail", mainControllers.productDetail)

router.get("/admin", mainControllers.admin);
router.post("/admin", mainControllers.productUpload);

/* router.get("/products", );
router.post("/products", );
router.get("/products/create", );
router.get("/products/:id", );
router.get("/products/:id/edit", );
router.put("/products/", );
router.delete("/products/", ); */

module.exports = router