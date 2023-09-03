const path = require("path");
const productJson = path.join(__dirname, "../../data/productos.json");
const productos = require(path.join(__dirname, "../../data/productos.json"));
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
        console.log(req)
        res.send(req)
        //res.redirect('/');
    }
}

module.exports = productsControllers;