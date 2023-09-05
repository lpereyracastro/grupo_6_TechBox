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
        res.render("productDetail");
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
    }
}

module.exports = productsControllers;