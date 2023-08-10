const mainControllers = {
    index : function(req,res){
        res.render("index");
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
    }    
}

module.exports = mainControllers;