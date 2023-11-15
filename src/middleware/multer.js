// multer para procesar imagen
const multer = require("multer");
// libreria path para rutas y nombre de imagen
const path = require("path");

const ACCEPTED_TYPES = ['image/jpeg','image/png','image/jpg']; //!agregar mas si es necesario.
const MAX_FILESIZE = 1 * 1024 * 1024; //estos son MB, si le pasas 3 son maximo 3mb

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
    if(ACCEPTED_TYPES.includes(file.mimetype && req.headers['content-length'] <= MAX_FILESIZE)){
        cb(null,true)
    } else cb(null, false)

}

// variable upload almacenando multer con storage como propiedad
const upload = multer({
    storage: storage,
    fileFilter: imageFilter
});

module.exports = {upload, ACCEPTED_TYPES, MAX_FILESIZE};