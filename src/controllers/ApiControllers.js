const db = require("../../databases/models");
const articulos = require("../../databases/models/articulos");

const ApiControllers = {
    getAllUsers : function(req,res){
        let limit = Number(req.query?.limit);
        let offset = Number(req.query?.offset);

        if(!offset) offset = 0;
        if(!limit) limit = 10; 

        db.userModel.findAll({limit, offset})
        .then( user => {
            let usersFormatted = user.map(element => {
                let obj = {
                    userID: element.dataValues.user_id,
                    userName: element.dataValues.name,
                    userEmail: element.dataValues.mail,
                    userImagen: element.dataValues.imagen,
                    userRole: element.dataValues.role
                }
                return obj;
            });

            res.json({data:{
                time: new Date().toDateString(),
                length: user.length,
            }, users:usersFormatted})
        }) 
    },
    getAllProducts: function(req,res){
        let limit = Number(req.query?.limit);
        let offset = Number(req.query?.offset);

        if(!offset) offset = 0;
        if(!limit) limit = 10;

        db.articulosModel.findAll({limit, offset})
        .then( articulos => {
            let articulosFormatted = articulos.map(element => {
                let obj = {
                    articulosID: element.dataValues.articulos_id,
                    articulosName: element.dataValues.name,
                    articulosDescription: element.dataValues.description,
                    articulosPrice: element.dataValues.price,
                    articulosMarca: element.dataValues.marca,
                    articulosImagen: element.dataValues.imagen
                }
                return obj;
            });

            res.json({data:{
                time: new Date().toDateString(),
                length: articulos.length,
            }, products:articulosFormatted})
        }) 
    }
}

module.exports = ApiControllers;