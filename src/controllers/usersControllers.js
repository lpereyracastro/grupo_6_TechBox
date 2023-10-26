// libreria para crear uuid 
const {v4: uuidv4} = require("uuid");
// libreria para encriptar contraseña
const bcrypt = require("bcryptjs");
// modelos db
const db = require("../../databases/models")
// validatior Result
const {validationResult} = require("express-validator");
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

        db.carritoModel.create({
            cantidad: 0, 
        }).then(result => {
            db.userModel.create({
                mail : req.body.mail,
                name : req.body.name,
                password : req.body.password,
                carrito_id : result.dataValues.id_carrito,
                imagen : image,
            }).then(res.redirect("/user/userLogin"))    
        })
        //!hacer funcionar correctamente luego


        // const newUser = {
        //     id : uuidv4(),
        //     firstName : req.body.firstname,
        //     email : req.body.email,
        //     password : bcrypt.hashSync(req.body.password, 10),
        //     image : image,
        // };
        // console.log(newUser);
        // users.push(newUser);

        // const usersJsonNew = JSON.stringify(users, null, 2);
        // fs.writeFileSync(usersJson,usersJsonNew );
        // res.redirect("/user/userLogin");
    },
    // metodo encargado del deslogueo
    logout : function(req,res){
        req.session.destroy();
        return res.redirect("/user/userLogin")
    }
}
module.exports = usersControllers;