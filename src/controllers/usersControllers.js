// modelos db
const db = require("../../databases/models");
const { v4, validate } = require("uuid")
const multer  = require('multer');
// validatior Result
const { validationResult, matchedData } = require('express-validator');
const {hashPassword, recoverPassword} = require("../middleware/passwordChecker");
const {createCookie, getCookie} = require("../middleware/createCookie");
const {ACCEPTED_TYPES, upload} = require("../middleware/multer/multerUser");


const usersControllers = {
    // renderiza la vista de logueo
    login : function(req,res){
        return res.render("login");
    },
    // metodo encargado de la logica del logueo
    loginAunt : function(req,res){
        if(req.headers.cookie !== undefined){
            let resultCookie = getCookie(req.cookies.LOGGED_ON)
            if(resultCookie) {
                return db.userModel.findOne({
                    where:{
                        mail: resultCookie.mail
                    }
                }).then( result => {
                    if(result != undefined && validate(resultCookie.data)){
                        return res.render("login", {messageAuth: "Ya estas logeado"})
                    } else res.clearCookie("LOGGED_ON")
                })
            }
        }

        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render("login",
            {
                errors : resultValidation.mapped(),
                oldData : req.body
            }
        )}   

        db.userModel.findOne({where: { mail: matchedData(req).mail}})
        .then(resultEmail=>{
            if (!resultEmail) return res.status(200).render("login",{emailAuth: "Email incorrecto :P"})
            if(recoverPassword(req.body.password, resultEmail.dataValues.password)){
                createCookie(req,res,"LOGGED_ON", JSON.stringify({mail: resultEmail.dataValues.mail, data: v4()}))
                return res.redirect("/"); //! convertir en la base de datos 
            }
            return res.status(200).render("login",{passwordAuth: "Contraseña incorrecta :P"})

        })

    },
    // renderizamos la vista del perfil del ususario
    profile : function(req,res){
        if(req.headers.cookie !== undefined){
            let resultCookie = getCookie(req.cookies.LOGGED_ON)
            if(resultCookie) {
                return db.userModel.findOne({
                    where:{
                        mail: resultCookie.mail
                    }
                }).then( result => {
                    if(result != undefined && validate(resultCookie.data)){
                        return res.render("profile", {user: result.dataValues})
                    } else return res.redirect("/user/userLogin");
                })
            }
        } else return res.redirect("/user/userLogin"); 
       
    },
    // renderiza la vista del formulario para registrarse
    register : function(req,res){
        return res.render("register");
    },
    // metodo encargado de la logica para guardar un registro

    registerStore : function (req,res){
           
        const { password } = req.body;
        const resultValidation = validationResult(req);
        if(resultValidation.errors.length > 0){
            return res.render("register",
                {
                    errors : resultValidation.mapped(),
                    oldData : req.body,
                }
        )}
                    
        if(!hashPassword(password)){ return res.render("register", {passwordAuth: "La contraseña no puede tener muchos caracteres"});}
        
        db.userModel.create({
            mail : req.body.mail,
            name : req.body.name,
            password : hashPassword(password),
            imagen : req.file.filename,
            role: 1
        }).then(() => res.redirect("/user/userLogin"))    
        
    },

    // metodo encargado del deslogueo
    logout : function(req,res){
        res.clearCookie("LOGGED_ON");
        return res.redirect("/user/userLogin")
    }
}
module.exports = usersControllers;