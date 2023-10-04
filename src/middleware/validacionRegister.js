const {body} = require("express-validator");

const validation = [
    body("firstname").notEmpty().withMessage("tienes que ingresar un nombre de ususario"),
    body("email").notEmpty().withMessage("tienes que ingresar un email valido"),
    body("password").notEmpty().withMessage("tienes que ingresar una contraseña"),
]

module.exports = validation;