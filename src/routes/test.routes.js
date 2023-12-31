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
const {validateUsers, validatePartialUsers} = require('../../schemas/usersSchema');


router.get("/user", function (req, res) {
    db.userModel.findAll().then(user=>{
        res.json(user);
    })
});

router.post("/user", validateUsers, function(req, res){
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }
    const validData = matchedData(req);

    db.userModel.create({
        ...validData
    })
        .then(user => {
            res.json(user);
        })
});

router.delete("/user/:id", function(req,res){
    const {id} = req.params;
    db.userModel.destroy({
        where: {
            user_id: id //!implementar un sistema de seguridad?
        }
    }).then(user => {
        res.json({message: "Deleted with success", user});
    })
})

router.patch("/user/:id",validatePartialUsers, function(req,res){
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).json({ errors: result.array() });
    }
    const validData = matchedData(req);
    const {id} = req.params;
    db.userModel.update({ ...validData },{
        where: {
            user_id: id
        }
    }).then(user => {
        res.json(user);
    })
})

module.exports = router

//? RUTA DE DEVELOPER, NO HACERLE DEPLOY PERO TAMPOCO QUITARLA