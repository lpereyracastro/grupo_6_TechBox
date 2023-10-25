const {body} = require('express-validator');

const validateCarrito = [
    body('cantidad')
        .exists().withMessage("Este valor no existe")
        .isInt({min:1}).withMessage("Debe ser un numero")
        .isLength({ min: 1, max: 11}).withMessage("El minimo de caracteres es 1 y el maximo 11")
        .notEmpty().withMessage('El campo no debe estar vacio')
]


module.exports = {validateCarrito};