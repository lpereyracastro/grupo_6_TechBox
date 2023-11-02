const {body} = require('express-validator');
const db = require('../databases/models');

const validateUsers = [
    body('mail')
        .exists().withMessage("Tiene que ingresar un email")
        .isString().withMessage("El email debe ser un texto")
        .isLength({ min: 5, max: 45}).withMessage("El email debe tener entre 5 y 45 caracteres")
        .notEmpty().withMessage('Tiene que ingresar un email')
        .custom(data => {
            return db.userModel.findOne({ where: {mail: data}}).then(result => {
                return result !== null ? Promise.reject("Email ya registrado") : Promise.resolve("")
             })
        }),

    body('name')
        .exists().withMessage("Tiene que ingresar un nombre")
        .isString().withMessage("El nombre debe ser un texto")
        .isLength({ min: 3, max: 45}).withMessage("El nombre debe tener entre 3 y 45 caracteres")
        .notEmpty().withMessage('Tiene que ingresar un nombre'),
    
    body('password')
        .exists().withMessage("Tiene que ingresar una contraseña")
        .isString().withMessage("La contraseña debe ser un texto")
        .isLength({ min: 7, max: 255}).withMessage("La contraseña debe tener entre 7 y 45 caracteres")
        .notEmpty().withMessage('Tiene que ingresar una contraseña'),
    
    body('role')
    .optional(true)
        .isString()
        .isLength({ min: 0, max: 10})


        
    ]
    
    // body('carrito_id')
    //     .exists().withMessage("Este valor no existe")
    //     .isInt({min:1}).withMessage("Debe ser un numero entero.")
    //     .isLength({min: 1}).withMessage("Debe existir al menos un numero")
    //     .custom(data => {
    //         return db.userModel.findOne({ where: {carrito_id: data}}).then(result => {
    //             return db.userModel.max("carrito_id").then(maxID =>{
    //                 if(data <= maxID){
    //                     return result !== null ? Promise.reject("carrito_ID ya registrado") : Promise.resolve("")
    //                 } else return Promise.reject("carrito_ID es invalido")
    //             })
    //         })
    //     }),

    const validatePartialUsers = [
    body('mail')
        .optional(true)
        .isString().withMessage("Ingresa un email valido")
        .isLength({ min: 5, max: 45}).withMessage("Email incorrecto")
        .notEmpty().withMessage("Email incorrecto"),

    body('name')
    .optional(true)
    .isString().withMessage("El nombre debe ser un texto")
    .isLength({ min: 3, max: 45}).withMessage("El nombre debe tener entre 3 y 45 caracteres")
    .notEmpty().withMessage('Tiene que ingresar un nombre'),
    
    body('password')
    .optional(true)
    .isString().withMessage("Ingresa una contraseña valida")
    .isLength({ min: 7, max: 21}).withMessage("Contraseña incorrecta")
    .notEmpty().withMessage("Contraseña incorrecta"),

    body('role')
    .optional(true)
        .isString()
        .isLength({ min: 0, max: 10}),
]


module.exports = {validateUsers,validatePartialUsers};