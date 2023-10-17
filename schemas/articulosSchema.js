const z = require("zod");
const MAXCHARACTERS = 999;

const articuloSchema = z.object({
    name: z.string({
        invalid_type_error: 'El nombre debe ser un string.'
    }).min(8).max(45),
    
    description: z.string({
        invalid_type_error: 'La descripcion debe ser un string.'
    }).max(MAXCHARACTERS,{ message: `Haz excedido el limite caracteres: ${MAXCHARACTERS}` }),

    price: z.string({
        invalid_type_error: 'El precio debe ser un string.'
        //! cambiar database y propiedades para que sea un INT
    }).max(45),

    marca: z.string({
        invalid_type_error: 'La marca debe ser un string'
    }).max(45)
});

function validateArticle (input) {
    return articuloSchema.safeParse(input)
}
  
function validatePartialArticle (input) {
    return articuloSchema.partial().safeParse(input)
}
  
module.exports = {
    validateArticle,
    validatePartialArticle
}