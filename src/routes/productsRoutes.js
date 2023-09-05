const productsControllers = require("../controllers/productsControllers");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination : function (req,file,cb){
        cb(null, path.join(__dirname, "../../public/img/product"));
    },
    filename : function (req,file,cb){
        const ext = path.extname(file.originalname);
        const newFilename = `${Date.now()}_img_product${ext}`;
        cb(null, newFilename);
    }
})

const upload = multer({storage});

router.get("/",productsControllers.products);
router.get("/cart", productsControllers.productCart);
router.get("/detail", productsControllers.productDetail);

router.get("/loadProduct", productsControllers.loadProduct);
router.post("/loadProduct", upload.single("image"),productsControllers.storeLoadProduct);

module.exports = router;