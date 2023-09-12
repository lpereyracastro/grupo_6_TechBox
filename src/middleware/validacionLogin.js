const {body} = require("express-validator");

const validaciones = [
    body("email").notEmpty().isEmail().withMessage("tienes que ingresar un email valido"),
    body("password").notEmpty().withMessage("tienes que ingresar la contraseña"),
];

module.exports = validaciones;