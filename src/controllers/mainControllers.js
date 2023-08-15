const path = require("path");
const productos = require(path.join(__dirname, "../../data/products.json"));

const mainControllers = {
    index : function(req,res){
        res.render("index", {productos : productos});
    },
    login : function(req,res){
        res.render("login")
    },
    register : function(req,res){
        res.render("register")
    },
    create : function(req,res){
        res.send("funciona")
    },
    productDetail : function(req,res){
        res.render("productDetail")
    },
    productCart : function(req,res){
        res.render("productCart")
    },
    admin : function(req,res){
        res.render("admin")
    },  
    productUpload : function(req, res){
        
        res.redirect('/')
        
    }
}

module.exports = mainControllers;