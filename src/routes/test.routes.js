const express = require("express");
const router = express.Router();
const db = require('../../databases/models');

router.get("/user", function(req,res){
    db.userModel.findAll()
    .then(user => {
        res.json(user);
    })
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