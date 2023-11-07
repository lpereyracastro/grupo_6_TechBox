// multer para procesar imagen
const multer = require("multer");
// libreria path para rutas y nombre de imagen
const path = require("path");

const ACCEPTED_TYPES = ['image/jpeg','image/png','image/jpg']; //!agregar mas si es necesario.
const MAX_FILESIZE = 3; //estos son MB, si le pasas 3 son maximo 3mb

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

const imageFilter = (req,file,cb) => {
    if(file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg"){
        cb(null,true)
    } else {
        return cb(new Error(`Solo se aceptan los siguientes tipos: ${ACCEPTED_TYPES}`))
    }
}

// variable upload almacenando multer con storage como propiedad
const upload = multer({
    storage: storage,
    fileFilter: imageFilter,
    limits: {
        fileSize: 1 * 1024 * 1024
    },
});

module.exports = {upload, ACCEPTED_TYPES, MAX_FILESIZE};