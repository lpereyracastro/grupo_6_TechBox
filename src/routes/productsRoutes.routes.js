// controladores de los productos
const productsControllers = require("../controllers/productsControllers");
// Router
const express = require("express");
const router = express.Router();

// validations loadProdcuts
const {validateArticulos, validatePartialArticulos} = require("../../schemas/articulosSchema")
const { upload } = require("../middleware/multer/multerProducts");


// home
router.get("/",productsControllers.products);
// carrito
router.get("/cart", productsControllers.productCart);
router.delete("/cart/:id", productsControllers.productCartDELETE);
// detalle del producto
router.get("/detail/:id", productsControllers.productDetail);
router.post("/detail/:id", productsControllers.productDetailPOST);

router.get("/productCreate", productsControllers.productCreate)
router.post("/productCreate", 
    upload.single("imagen"),
    validateArticulos, 
    productsControllers.productCreatePost
)

// vista del formulario para cargar un producto
router.get("/loadProduct", productsControllers.loadProduct);
// ruta post para manejar los campos del formulario y la imagen que procesamos con multer
router.post("/loadProduct",
    upload.single("imagen"),
    validateArticulos,
    productsControllers.storeLoadProduct
 );

// vista del formulario de edicion del producto
router.get("/:id/edit", productsControllers.edit);
router.put("/:id/edit", 
    upload.single("imagen"),
    validatePartialArticulos,
    productsControllers.storeEdit
);

// eliminar un producto
router.get("/:id/delete", productsControllers.deleteForm);
router.delete("/:id/delete", productsControllers.delete);

// exportamos router para trabajarlo en app
module.exports = router;