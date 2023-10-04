// libreria fs para leer y escribir json
const fs = require("fs");
// libreria path para realizar direcciones de archivos
const path = require("path");
// datos en formuta json y parseados
const usersJson = path.join(__dirname, "../../data/users.json");
const users = JSON.parse(fs.readFileSync(usersJson, "utf-8"));
// libreria para crear uuid 
const {v4: uuidv4} = require("uuid");
// libreria para encriptar contraseña
const bcrypt = require("bcryptjs");
// validatior Result
const {validationResult} = require("express-validator");
const { error } = require("console");
// metodos de User
const User = require("../../models/User");
const usersControllers = {
    // renderiza la vista de logueo
    login : function(req,res){
        res.render("login");
    },
    // metodo encargado de la logica del logueo
    loginAunt : function(req,res){
    
        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render("login",
            {
                errors : resultValidation.mapped(),
                oldData : req.body,
            }
        )}

        let userToLogin = User.findByField("email", req.body.email);

        if(userToLogin){
            let isOkThePassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if(isOkThePassword){
                delete userToLogin.password;
                req.session.UserLogged = userToLogin;
                console.log(req.session);
                return res.redirect("/user/profile");
            }
            return res.render("login",{
                errors : {
                    email : {
                        msg : "Las credenciales son invalidas"
                    }
                }
            })
        }

        return res.render("login",{
            errors : {
                email : {
                    msg : "No se encuentra este email"
                }
            }
        })

    },
    // renderizamos la vista del perfil del ususario
    profile : function(req,res){
        res.render("profile", 
        {
            user : req.session.UserLogged
        })
    },
    // renderiza la vista del formulario para registrarse
    register : function(req,res){
        res.render("register");
    },
    // metodo encargado del deslogueo
    logout : function(req,res){
        req.session.destroy();
        return res.redirect("/user/userLogin")
    },
    // metodo encargado de la logica para guardar un registro
    registerStore : function (req,res){

        const resultValidation = validationResult(req);

        if(resultValidation.errors.length > 0){
            return res.render("register",
                {
                    errors : resultValidation.mapped(),
                    oldData : req.body,
                }
            )}

        let image = "default.jpg";
        if (req.file && req.file.filename) {
            image = req.file.filename;
        };

        const newUser = {
            id : uuidv4(),
            firstName : req.body.firstname,
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, 10),
            image : image,
        };
        console.log(newUser);
        users.push(newUser);

        const usersJsonNew = JSON.stringify(users, null, 2);
        fs.writeFileSync(usersJson,usersJsonNew );
        res.redirect("/user/userLogin");
    }
}
module.exports = usersControllers;