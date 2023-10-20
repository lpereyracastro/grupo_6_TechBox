const express = require("express");
const router = express.Router();
const db = require('../../databases/models');
const { validationResult, matchedData } = require('express-validator');

//!                 IMPORTANTE:
//* POST:   Crea un nuevo recurso
//* PUT:    Actualiza TOTALMENTE un recurso
//* PATCH:  Actualiza PARCIALMENTE un recurso


// const articuloSchema = require('../../schemas/articulosSchema')
// const carritoSchema = require('../../schemas/carritoSchema')
const usersSchema = require('../../schemas/usersSchema');



router.get("/user", function (req, res) {
    db.userModel.findAll()
        .then(user => {
            res.json(user);
        })
});

router.post("/user", usersSchema, function (req, res) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }
    const validData = matchedData(req);

    db.userModel.create({
        ...validData
    })
        //!AUNQUE EL VALOR SEA FALSO, LA ID SE AUTOINCREMENTA IGUAL
        .then(user => {
            // user.save();
            res.json(user);
        })




});

router.get("/pivot", function (req, res) {
    db.pivotCarrito.findAll()
        .then(user => {
            res.json(user);
        })
});

router.get("/articulos", function (req, res) {
    db.articulosModel.findAll()
        .then(user => {
            res.json(user);
        })
});

router.get("/carrito", function (req, res) {
    db.carritoModel.findAll()
        .then(user => {
            res.json(user);
        })
});

module.exports = router

//? RUTA DE DEVELOPER, NO HACERLE DEPLOY PERO TAMPOCO QUITARLA