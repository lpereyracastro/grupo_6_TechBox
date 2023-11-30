const db = require("../../databases/models");
// express validator , validaciones
const {validationResult,matchedData} = require("express-validator");
const {getCookie, createCookie} = require("../middleware/createCookie");
const { v4 } = require("uuid");
const { Op } = require("sequelize");
const { marcas } = require("../../schemas/articulosSchema");

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
                errormsg: false,
                isAdded: false
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
                db.carritoModel.findOrCreate({
                    where:  {FK_articulo_id: articulos[0].dataValues.articulos_id },
                    defaults:{cantidad: 1, FK_user_id: usuarios.dataValues.user_id}})
                .then( ([carrito,created]) => {
                    if(!created){
                        db.carritoModel.update({cantidad: carrito.dataValues.cantidad + 1}, {where: {id_carrito: carrito.dataValues.id_carrito}});
                    }
                    return res.render(`productDetail`, {
                        cookies,
                        product: articulos[0].dataValues,
                        isAdded: true,
                        errormsg: false,
                    })
                    
                })
            }).catch((e)=>{
                db.articulosModel.findOne({where: {
                    articulos_id: id
                }}).then(articulo=>{
                    return res.render("productDetail",{
                        product: articulo.dataValues,
                        cookies,
                        errormsg: "Ha ocurrido un error...",
                        isAdded: false
                    });
                })
            });
        
        } 
    },

    // renderiza el carrito
    productCart : function(req,res){
        let resultCookieUser = getCookie(req.cookies.LOGGED_ON);
        if(!resultCookieUser) return res.redirect('/user/userLogin');

            db.userModel.findOne({where:{mail:resultCookieUser.mail}})
            .then( resultUser => {
                db.carritoModel.findAll({where:{FK_user_id: resultUser.dataValues.user_id}})
                .then( resultCarrito => {
                    if(!resultCarrito === undefined) return res.render("productCart", {articulos: false, articulosLength: 0});
                    const arrayRaw = resultCarrito.map( element => element.dataValues.FK_articulo_id);
                    
                    let cantidad;
                    let cantidadRaw;

                    try {
                        if(resultCarrito.length > 1){
                            cantidadRaw = resultCarrito.map( element => element.dataValues.cantidad);
                            cantidad = cantidadRaw.reduce((a, b) => a + b, 0);
                        } else {
                            cantidad = resultCarrito[0].dataValues.cantidad;
                            cantidadRaw = [resultCarrito[0].dataValues.cantidad];
                        }
                    } catch (error) {
                        return res.render("productCart", {
                            articulos: false,
                            articulosCantidad: 0,
                            articulosLength: 0 })
                    }
                   

                    db.articulosModel.findAll({where:{articulos_id: { [Op.in]: arrayRaw }}}).then( result => {
                        return res.render("productCart", {
                        articulos: result,
                        articulosCantidad: cantidadRaw,
                        articulosLength: cantidad })
                    })
                })
            })
    },
    productCartDELETE : function(req,res){
        const {id} = req.params
        db.carritoModel.destroy({
            where: {
                FK_articulo_id: id
            }
        }).then( result => {
            res.redirect("/products/cart")
        })

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
            return res.render("productEdit", {
                product: articulo.dataValues,
                articulos_id: articulo.dataValues.articulos_id,
                marcas
            });
        })
    },
    // metodo encargado de la logica para editar un producto
    storeEdit : function(req,res){
        const {id} = req.params;
            const result = validationResult(req);
            if (!result.isEmpty()) {
                return res.render('productEdit',{
                    product: req.body,
                    errors: result.mapped(),
                    articulos_id: id,
                    marcas
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
        return res.render("productDelete", {product: id})
    },
    // metodo encargado de la logica de eliminacion
    delete : function (req,res){
        const {id} = req.params;
        db.articulosModel.findOne({
            where: {
                articulos_id: id
            }
        }).then(articulo => {
            console.log(articulo);
            db.carritoModel.destroy({
                where: {
                    FK_articulo_id: articulo.dataValues.articulos_id}
                }).then( result => {
                    db.articulosModel.destroy({where: {articulos_id: id}}).then( result => {
                        return res.redirect("/products");
                    })
                })
        })
    }
}

module.exports = productsControllers;