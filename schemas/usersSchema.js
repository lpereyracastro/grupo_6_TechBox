const z = require("zod");

const usersSchema = z.object({
    mail: z.string().max(45).email({
        invalid_type_error: 'El email debe ser correcto.',
        required_error: 'El email debe ser requerido.'
    }), //! checkear si el dato es unico

    name: z.string({
        invalid_type_error: 'El nombre debe ser un string.'
    }).min(3).max(45),

    password: z.string().max(45)
    // .uuid({
    //     error_message: "Debe ser una uuid"
    //     //! ver si esto funciona, y parsear los int a str
    // })
    , 

    // carrito_id: z.number().int().positive(),
    
    imagen: z.string().max(255).url({ message: "Invalid url" }).default("/images/example")
    // terminar
});

function validateUsers (input) {
    return usersSchema.safeParse(input)
     // safeParse => { success: false; error: ZodError }
};
  
function validatePartialUsers (input) {
    return usersSchema.partial().safeParse(input)
};
  
module.exports = {
    validateUsers,
    validatePartialUsers
};