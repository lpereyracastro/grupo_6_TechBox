const express = require("express");
const router = express.Router();
const db = require('../../databases/models');

//!                 IMPORTANTE:
//* POST:   Crea un nuevo recurso
//* PUT:    Actualiza TOTALMENTE un recurso
//* PATCH:  Actualiza PARCIALMENTE un recurso


const articuloSchema = require('../../schemas/articulosSchema')
const carritoSchema = require('../../schemas/carritoSchema')
const usersSchema = require('../../schemas/usersSchema')


router.get("/user", function(req,res){
    db.userModel.findAll()
    .then(user => {
        res.json(user);
    })
});

router.post("/user", function(req,res){
    const result = usersSchema.validateUsers(req.body);

    if (!result.success) {
        // 422 Unprocessable Entity
        return res.status(422).json({ error: JSON.parse(result.error.message) })
    }
    try {
        db.userModel.create({
            carrito_id: 1,
            ...result.data
        }) //!AUNQUE EL VALOR SEA FALSO, LA ID SE AUTOINCREMENTA IGUAL
        .then(user => {
            user.save();
            res.json(user);
        })
    } catch (error) {
        res.status(422).json(error);
    }
});

router.get("/pivot", function(req,res){
    db.pivotCarrito.findAll()
    .then(user => {
        res.json(user);
    })
});

router.get("/articulos", function(req,res){
    db.articulosModel.findAll()
    .then(user => {
        res.json(user);
    })
});

router.get("/carrito", function(req,res){
    db.carritoModel.findAll()
    .then(user => {
        res.json(user);
    })
});

module.exports = router

//? RUTA DE DEVELOPER, NO HACERLE DEPLOY PERO TAMPOCO QUITARLA