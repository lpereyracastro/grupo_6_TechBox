const express = require("express");
const router = express.Router();
const db = require('../../databases/models');
const { validationResult, matchedData} = require('express-validator');

const articulosController = {
    //* obtener los articulos
    getAllArticles: function (req, res) {
        db.articulosModel.findAll().then(articulo=>{
            res.render("",{articulo});
    })},

    //* crear articulos
    createArticle: function(req, res){
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(422).render("",{ errors: result.array() });
    }
    const validData = matchedData(req);

    db.articulosModel.create({
        ...validData
    })
        .then(articulo => {
            res.json(articulo);
        })
    },

    //* eliminar articulos
    deleteArticle: function(req,res){
        const {id} = req.params;
        db.articulosModel.destroy({
            where: {
                articulos_id: id
            }
        }).then(articulo => {
            res.json({message: "Deleted with success", articulo});
        })
    },

    //* cambiar articulo
    changeArticle:  function(req,res){
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(422).json({ errors: result.array() });
        }
        const validData = matchedData(req);
        const {id} = req.params;
        db.articulosModel.update({ ...validData },{
            where: {
                articulos_id: id
            }
        }).then(article => {
            res.json(article);
        })
    }
}

module.exports = articulosController;