const express = require("express");
const router = express.Router();
const db = require('../../databases/models');

router.get("/", function(req,res){
    db.userModel.findAll()
    .then(user => {
        res.json(user);
    })
}); //TEST 

module.exports = router

//? RUTA DE DEVELOPER, NO HACERLE DEPLOY PERO TAMPOCO QUITARLA