const path = require("path");
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
    admin : function(req,res){
        res.render("admin");
    },  
    productUpload : function(req, res){
        res.redirect('/');
    }
}

module.exports = productsControllers;