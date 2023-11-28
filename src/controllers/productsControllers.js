const db = require("../../databases/models")
// express validator , validaciones
const {validationResult,matchedData} = require("express-validator")
const {getCookie, createCookie} = require("../middleware/createCookie");
const { v4 } = require("uuid");

let cookies;

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
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render("productCreate",
                {
                    errors : resultValidation.mapped(),
                    oldData : req.body,
                }
        )}

        db.articulosModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            marca: req.body.marca,
            imagen: req.file.filename,
        })
        .then(user => {
            return res.redirect("/products");
        })
    },
    // renderiza el detalle de un producto
    productDetail : function(req,res){
        const {id} = req.params;
        cookies = false;
        let resultCookieUser = getCookie(req.cookies.LOGGED_ON);

        if(resultCookieUser) {
            cookies = true;
        } 

        db.articulosModel.findOne({where: {
            articulos_id: id
        }}).then(articulo=>{
            return res.render("productDetail",{
                product: articulo.dataValues,
                cookies,
                errormsg: false
            });
        })
    },
    productDetailPOST : function(req,res){
        const {id} = req.params;
        cookies = false;
        let resultCookieUser = getCookie(req.cookies.LOGGED_ON);

        if(resultCookieUser) {
            cookies = true;
            Promise.all([
                db.userModel.findOne({where:{mail:resultCookieUser.mail}}),
                db.articulosModel.findAll({where:{articulos_id: id}})
            ]).then(([usuarios,articulos]) => {
                console.log(usuarios);
                console.log("I KNOW WHAT YOU MEAN : ", articulos);
                
                
            }).catch((e)=>{
                console.log(e);
                db.articulosModel.findOne({where: {
                    articulos_id: id
                }}).then(articulo=>{
                    return res.render("productDetail",{
                        product: articulo.dataValues,
                        cookies,
                        errormsg: "Ha ocurrido un error..."
                    });
                })
            });
        
        } 
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
            return res.status(422).render("loadProduct",{ 
                errors: result.array() 
            });
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
            return res.render("productEdit", {product: articulo.dataValues,
                articulos_id: articulo.dataValues.articulos_id
            });
        })
    },
    // metodo encargado de la logica para editar un producto
    storeEdit : function(req,res){
        console.log(req.body);
        const {id} = req.params;
            const result = validationResult(req);
            console.log(result);
            if (!result.isEmpty()) {
                return res.render('productEdit',{
                    product: req.body,
                    errors: result.mapped(),
                    articulos_id: id
                });
            }
            let imagenFile;
            if(!req.file?.filename) imagenFile = "default.jpg"
            if(req.file?.filename) imagenFile = req.file.filename; 

            db.articulosModel.update({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                marca: req.body.marca,
                imagen: imagenFile
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
        console.log(id);
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