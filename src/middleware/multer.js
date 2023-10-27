// multer para procesar imagen
const multer = require("multer");
// libreria path para rutas y nombre de imagen
const path = require("path");

// variable storage encargada de 
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, path.join(__dirname, "../../public/img/users"));
    },
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        const newFileName = `${Date.now()}_img_user_${ext}`;
        cb(null, newFileName);
    }
})

// variable upload almacenando multer con storage como propiedad
const upload = multer({storage});

module.exports = upload