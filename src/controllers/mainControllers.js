const path = require("path");
const fs = require("fs");
const productsJson = path.join(__dirname, '../../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsJson, 'utf-8'));

const mainControllers = {
    index : function(req,res){
        res.render("index", {productos : productos});
    }
}

module.exports = mainControllers;