const {body} = require('express-validator');

const validateArticulos = [
    body('name')
        .exists().withMessage("Este valor no existe")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 3, max: 45}).withMessage("El minimo de caracteres es 3 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),
    
    body('description')
        .exists().withMessage("Este valor no existe")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 7, max: 999}).withMessage("El minimo de caracteres es 7 y el maximo 999")
        .notEmpty().withMessage('El campo no debe estar vacio'),

    body('price')
        .exists().withMessage("Este valor no existe")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 1, max: 45}).withMessage("El minimo de caracteres es 1 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),

    body('marca')
        .exists().withMessage("Este valor no existe")
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 1, max: 45}).withMessage("El minimo de caracteres es 1 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),
]

const validatePartialArticulos = [
    body('name')
    .optional(true)
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 3, max: 45}).withMessage("El minimo de caracteres es 3 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),
    
    body('description')
    .optional(true)
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 7, max: 999}).withMessage("El minimo de caracteres es 7 y el maximo 999")
        .notEmpty().withMessage('El campo no debe estar vacio'),

    body('price')
    .optional(true)
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 1, max: 45}).withMessage("El minimo de caracteres es 1 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),

    body('marca')
    .optional(true)
        .isString().withMessage("Debe ser un string")
        .isLength({ min: 1, max: 45}).withMessage("El minimo de caracteres es 1 y el maximo 45")
        .notEmpty().withMessage('El campo no debe estar vacio'),
]

module.exports = {validateArticulos, validatePartialArticulos};