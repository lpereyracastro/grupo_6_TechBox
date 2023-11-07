const db = require("../../databases/models")

const {v4: uuidv4} = require("uuid")
// express validator , validaciones
const {validationResult,matchedData} = require("express-validator")



const productsControllers = {
    // renderiza los productos
    products : function(req,res){
        db.articulosModel.findAll().then(articulo=>{
            return res.render("products",{productos: articulo});
        })
    },

    productCreate: function(req,res) {
        return res.render('productCreate');
    },

    productCreatePost: function(req,res){
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(422).json({ errors: result.array() });
        }
        const validData = matchedData(req);
    
        db.articulosModel.create({
            imagen: req.file.filename,
            ...validData
        })
        .then(user => {
            return res.redirect("/products");
        })
    },
    // renderiza el detalle de un producto
    productDetail : function(req,res){
        const {id} = req.params;
        db.articulosModel.findOne({where: {
            articulos_id: id
        }}).then(articulo=>{
            return res.render("productDetail",{product: articulo.dataValues});
        })
    },
    // renderiza el carrito
    productCart : function(req,res){
        return res.render("productCart");
    },
    // renderiza el formulario para cargar un producto
    loadProduct : function(req,res){
        return res.render("loadProduct");
    },
    // metodo encargado de la logica para almacenar el producto  
    storeLoadProduct : function(req, res){
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(422).render("loadProduct",{ errors: result.array() });
        }
        const validData = matchedData(req);
    
        db.articulosModel.create({
            ...validData
        }).then(() => {
            return res.redirect("/products");
        })
    },
    // renderiza el formulario de edicion
    edit : function (req,res){
        const {id} = req.params;
        db.articulosModel.findOne({where: {
            articulos_id: id
        }}).then(articulo=>{
            return res.render("productEdit", {product: articulo.dataValues});;
        })
    },
    // metodo encargado de la logica para editar un producto
    storeEdit : function(req,res){
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.status(422).render('loadProduct',{ errors: result.array() });
            }
            const validData = matchedData(req);
            const {id} = req.params;
            db.articulosModel.update({
                imagen: req.file.filename,
                ...validData 
            },{
                where: {
                    articulos_id: id
                }
            }).then(() => {
                return res.redirect("/products");
            })
    },
    // renderiza el formulario de eliminacion
    deleteForm : function (req,res){
        const {id} = req.params;
        return res.render("productDelete", {product: id})
    },
    // metodo encargado de la logica de eliminacion
    delete : function (req,res){
        const {id} = req.params;
        db.articulosModel.destroy({
            where: {
                articulos_id: id
            }
        }).then(articulo => {
            return res.redirect("/products")
        })

    }
}

module.exports = productsControllers;