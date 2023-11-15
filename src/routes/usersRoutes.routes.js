// destructurin para solamente traer la funcionalidad de router
const {Router} = require("express");
// ejecucion de router
const router = Router();
// controladores de usuarios
const usersControllers = require("../controllers/usersControllers");
// validaciones userSchema
const {validateUsers, validatePartialUsers} = require("../../schemas/usersSchema");
const { upload } = require("../middleware/multer");

// ruta encargada de mostrar la vista de login
router.get("/userLogin", usersControllers.login );
// ruta encargada de procesar la logica de autenticacion
router.post("/userLogin",validatePartialUsers,usersControllers.loginAunt)

// ruta encargada de mostrar la vista register
router.get("/userRegister", usersControllers.register);
// ruta encargada de procesar la logica de guardar un registro
router.post("/userRegister",
    upload.single("imagen"),
    validateUsers,
    usersControllers.registerStore
);


//ruta encargada para mostrar la vista del perfil
router.get("/profile", usersControllers.profile);

// ruta parta desloguearse
router.get("/logout", usersControllers.logout);

module.exports = router;