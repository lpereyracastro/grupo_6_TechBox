const path = require("path");
const productos = require(path.join(__dirname, "../../data/products.json"));

const mainControllers = {
    index : function(req,res){
        res.render("index", {productos : productos});
    }
}

module.exports = mainControllers;