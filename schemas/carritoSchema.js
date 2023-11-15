const {ACCEPTED_TYPES, MAX_FILESIZE} = require('../src/middleware/multer');
const {body, checkSchema} = require('express-validator');

const validateCarrito = [
    body('cantidad')
        .exists().withMessage("La cantidad no puede estar vacia")
        .isInt({min:1}).withMessage("La cantidad debe ser un numero")
        .isLength({ min: 1, max: 11}).withMessage("La cantidad debe ser entre 1 y 11 unidades")
        .notEmpty().withMessage('La cantidad no puede estar vacia'),

    checkSchema({
        'imagen': {
            custom: {
                options: (value, { req, path }) => ACCEPTED_TYPES.includes(req.file.mimetype) && req.file.size <= MAX_FILESIZE,
                errorMessage: `Solo se aceptan los siguientes tipos: ${ACCEPTED_TYPES} y debe pesar menos de ${MAX_FILESIZE} Byte`,
            }
        }
    })
]


module.exports = {validateCarrito};