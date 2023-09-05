const path = require("path");
const fs = require("fs");
const productsJson = path.join(__dirname, '../../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsJson, 'utf-8'));
const {v4: uuidv4} = require("uuid")

const productsControllers = {
    products : function(req,res){
        res.render("products", {productos});
    },
    productDetail : function(req,res){
        const idProduct = req.params.id;
        const product = productos.find(product => product.id == idProduct)
        res.render("productDetail", {product});
    },
    productCart : function(req,res){
        res.render("productCart");
    },
    loadProduct : function(req,res){
        res.render("loadProduct");
    },  
    storeLoadProduct : function(req, res){
        const newProducts = {
            id: uuidv4(),
            name: req.body.productname,
			price: req.body.price,
			category: req.body.category,
			description: req.body.description,
			image : req.file.filename
        };
        productos.push(newProducts);
        const productosJson = JSON.stringify(productos,null, 2);
        fs.writeFileSync(productsJson, productosJson);
        console.log(productosJson);
        res.redirect("/products");
    },
    edit : function (req,res){
        const idProduct = req.params.id;
        const product = productos.find(product => product.id == idProduct);
        res.render("productEdit", {product});
    },
    storeEdit : function (req,res){
        const idProduct = req.params.id;
        const productIndex = productos.findIndex(product => product.id == idProduct);

        const editedProduct = {
            id: idProduct,
            name: req.body.productname,
            price: req.body.price,
            category: req.body.category,
            description: req.body.description,
            image: req.file.filename
        };

        productos[productIndex] = editedProduct;

        const productsJsonData = JSON.stringify(productos, null, 2);
        fs.writeFileSync(productsJson, productsJsonData);
        res.redirect("/products")   
    },
    deleteForm : function (req,res){
        const idProduct = req.params.id;
        const product = productos.find(product => product.id == idProduct);
        res.render("productDelete", {product});
    },
    delete : function (req,res){
    const productIdDelete = req.params.id;
    const productToDelete = productos.find(product => product.id === productIdDelete);
    const indiceProduct = productos.findIndex(product => product.id == productToDelete.id);
    productos.splice(indiceProduct, 1);

    const productsJsonData = JSON.stringify(productos, null, 2);
    fs.writeFileSync(productsJson, productsJsonData);
    res.redirect("/products")
    }
}

module.exports = productsControllers;