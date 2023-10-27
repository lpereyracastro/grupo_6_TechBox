const {body} = require('express-validator');
const db = require('../databases/models');

const validateUsers = [
    body('mail')
        .exists().withMessage("Tiene que ingresar un email")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 5, max: 45})
        .notEmpty().withMessage('El campo no debe estar vacio')
        .custom(data => {
            return db.userModel.findOne({ where: {mail: data}}).then(result => {
                return result !== null ? Promise.reject("Email ya registrado") : Promise.resolve("")
             })
        }),

    body('name')
        .exists().withMessage("Tiene que ingresar un nombre")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 3, max: 45}).withMessage("El minimo de caracteres es 3 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),
    
    body('password')
        .exists().withMessage("Tiene que ingresar una contraseña")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 7, max: 255}).withMessage("El minimo de caracteres es 7 y el maximo 21")
        .notEmpty().withMessage('El campo no debe estar vacio'),
    
    body('role')
    .optional(true)
        .isString()
        .isLength({ min: 0, max: 10}),

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
]

const validatePartialUsers = [
    body('mail')
        .optional(true)
        .isString().withMessage("Tiene que ingresar un email")
        .isLength({ min: 5, max: 45}).withMessage("El email es incorrecto")
        .notEmpty().withMessage('El campo no debe estar vacio')
        .custom(data => {
            return db.userModel.findOne({ where: {mail: data}}).then(result => {
                return result !== null? Promise.reject("Email ya registrado") : Promise.resolve("")
             })
        }),

    body('name')
    .optional(true)
        .isString().withMessage("Tiene que ingresar un nombre")
        .isLength({ min: 3, max: 45}).withMessage("El minimo de caracteres es 3 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),
    
    body('password')
    .optional(true)
        .isString().withMessage("Tiene que ingresar una password")
        .isLength({ min: 7, max: 21}).withMessage("El minimo de caracteres es 7 y el maximo 21")
        .notEmpty().withMessage('El campo no debe estar vacio'),

    body('role')
    .optional(true)
        .isString()
        .isLength({ min: 0, max: 10}),
]


module.exports = {validateUsers,validatePartialUsers};