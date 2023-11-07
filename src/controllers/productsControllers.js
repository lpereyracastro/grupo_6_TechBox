//metodo path para direcciones
const path = require("path");
//metodo fs para leer JSON y escribirlos
const fs = require("fs");
// datos del json
const productsJson = path.join(__dirname, '../../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productsJson, 'utf-8'));
// libreria uuid para crear identificadores unicos
const {v4: uuidv4} = require("uuid")
// express validator , validaciones
const {validationResult} = require("express-validator")




const productsControllers = {
    // renderiza los productos
    products : function(req,res){
        res.render("products", {productos});
    },
    // renderiza el detalle de un producto
    productDetail : function(req,res){
        const idProduct = req.params.id;
        const product = productos.find(product => product.id == idProduct)
        res.render("productDetail", {product});
    },
    // renderiza el carrito
    productCart : function(req,res){
        res.render("productCart");
    },
    // renderiza el formulario para cargar un producto
    loadProduct : function(req,res){
        res.render("loadProduct");
    },
    // metodo encargado de la logica para almacenar el producto  
    storeLoadProduct : function(req, res){

        const resultValidation = validationResult(req);

        
        if(resultValidation.errors.length > 0){
            return res.render("loadProduct",
            {
                errors : resultValidation.mapped(),
                oldData : req.body,
            }
        )}
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
        res.redirect("/products");
        
    },
    // renderiza el formulario de edicion
    edit : function (req,res){
        const idProduct = req.params.id;
        const product = productos.find(product => product.id == idProduct);
        res.render("productEdit", {product});
    },
    // metodo encargado de la logica para editar un producto
    storeEdit : function (req,res){

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render("loadProduct",
            {
                errors : resultValidation.mapped(),
                oldData : req.body
            }
        )}

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
        res.redirect("/productsAdmin")   
    },
    // renderiza el formulario de eliminacion
    deleteForm : function (req,res){
        const idProduct = req.params.id;
        const product = productos.find(product => product.id == idProduct);
        res.render("productDelete", {product});
    },
    // metodo encargado de la logica de eliminacion
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