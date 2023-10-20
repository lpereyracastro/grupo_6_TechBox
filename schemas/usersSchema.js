const {body} = require('express-validator');
const db = require('../databases/models');
const sequelize = require('sequelize')

const validateUsers = [
    body('mail')
        .exists().withMessage("Este valor no existe")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 5, max: 45})
        .notEmpty().withMessage('El campo no debe estar vacio')
        .custom(data => {
            return db.userModel.findOne({ where: {mail: data}}).then(result => {
                return result !== null ? Promise.reject("Email ya registrado") : Promise.resolve("")
             })
        }),

    body('name')
        .exists().withMessage("Este valor no existe")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 3, max: 45}).withMessage("El minimo de caracteres es 3 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),
    
    body('password')
        .exists().withMessage("Este valor no existe")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 7, max: 21}).withMessage("El minimo de caracteres es 7 y el maximo 21")
        .notEmpty().withMessage('El campo no debe estar vacio'),

    body('carrito_id')
        .exists().withMessage("Este valor no existe")
        .isInt().withMessage("Debe ser un numero entero.")
        .isLength({min: 1}).withMessage("Debe existir al menos un numero")
        ,
    
    body('imagen')
        .isString().withMessage("Debe ser un string")
        .isLength({ max: 255}).withMessage("Maximo de caracteres es de 255")
        .default('userDefault.png'),
]

module.exports = validateUsers;