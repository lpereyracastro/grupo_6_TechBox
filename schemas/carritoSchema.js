const z = require("zod");

const carritoSchema = z.object({
   cantidad: z.number().max(11).int().positive({
    invalid_type_error: 'La cantidad debe ser un numero',
    required_error: 'La cantidad no puede ser 0 '
   })
});

function validateCarrito (input) {
    return carritoSchema.safeParse(input)
}
  
// function validatePartialCarrito (input) {
//     return carritoSchema.partial().safeParse(input)
// }
//! Comentado en caso de colocar mas tablas
  
module.exports = {
    validateCarrito
}