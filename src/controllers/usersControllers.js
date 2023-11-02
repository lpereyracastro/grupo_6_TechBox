// modelos db
const db = require("../../databases/models");
const { v4, validate } = require("uuid")
const multer  = require('multer');
// validatior Result
const { validationResult, matchedData } = require('express-validator');
const {hashPassword, recoverPassword} = require("../middleware/passwordChecker");
const bcrypt = require('bcryptjs')
const {createCookie, getCookie, checkPassword, SALTROUNDS} = require("../middleware/createCookie");


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
        return res.render("profile", 
        {
            user : req.session.UserLogged
        })
    },
    // renderiza la vista del formulario para registrarse
    register : function(req,res){
        return res.render("register");
    },
    // metodo encargado de la logica para guardar un registro
    registerStore : function (req,res){
        // console.log(req.file, req.body)

     // uploadSingleImage(req, res, (err) => {
        //     if (err instanceof multer.MulterError) {
        //         return res.render('register', {multerErr: `La imagen debe respetar estos formatos: ${ACCEPTED_TYPES}`})
        //     }
        //     })

        const { password } = req.body;
        const resultValidation = validationResult(req);
        console.log("result: ",resultValidation)

        if(resultValidation.errors.length > 0){
            return res.render("register",
                {
                    errors : resultValidation.mapped(),
                    oldData : req.body,
                }
        )}

        if(!hashPassword(password)){ return res.render("register", {passwordAuth: "La contraseña no puede tener muchos caracteres"});}
        
        db.carritoModel.create({
            cantidad: 0, 
        }).then(result => {
            db.userModel.create({
                mail : req.body.mail,
                name : req.body.name,
                password : hashPassword(password),
                carrito_id : result.dataValues.id_carrito,
                imagen : req.body.imagen,
                role: 1
            }).then(() => res.redirect("/user/userLogin"))    
        })
    },
    // metodo encargado del deslogueo
    logout : function(req,res){
        req.session.destroy();
        return res.redirect("/user/userLogin")
    }
}
module.exports = usersControllers;