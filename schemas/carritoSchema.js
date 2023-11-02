const {body} = require('express-validator');

const validateCarrito = [
    body('cantidad')
        .exists().withMessage("La cantidad no puede estar vacia")
        .isInt({min:1}).withMessage("La cantidad debe ser un numero")
        .isLength({ min: 1, max: 11}).withMessage("La cantidad debe ser entre 1 y 11 unidades")
        .notEmpty().withMessage('La cantidad no puede estar vacia')
]


module.exports = {validateCarrito};