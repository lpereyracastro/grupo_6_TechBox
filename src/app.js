// require de express y ejecucion
const express = require("express");
const app = express();
// require de express session
const session = require("express-session");
//require cookie
const cookies = require("cookie-parser");
// use para el metodo session

//? const sequelize = require('../databases/config/config');
// requiere la configuracion de la base de datos :P

app.use(session(
    {
        secret : "secret no se me ocurrio otra cosa",
        resave : false,
        saveUninitialized : false,
    }
))
app.use(cookies());

// async function main() {
//     await sequelize.sync({force: false}); 
//     //se sincroniza con la base, force rehace las tablas.
//     // RECOMENDACION: ponelo en true pero va a hacer drop, alter y create tables.
//     // Ademas con el nodemon se ejecuta cada rato que guardas y es pesado.
// }
// main();

// routes
const mainRoutes = require("./routes/mainRoutes.routes");
const productsRoutes = require("./routes/productsRoutes.routes");
const usersRoutes = require("./routes/usersRoutes.routes");

//! models      OBVIAMENTE REQUERIRLOS EN LOS CONTROLADORES LO QUE SE VAN A USAR
// const carrito = require("../databases/models/carrito.db.js");
// const compras = require("../databases/models/compras.db");
// const productosCompras = require("../databases/models/productos-compra.db.js");
// const productos = require("../databases/models/productos.db.js");
// const users = require("../databases/models/users.db.js");


// require metodo path
const path = require("path");

//require mmethodOverride
const methodOverride = require('method-override');

//! PRIMER PARAMETRO SE PASA DESDE LA TERMINAL, SINO USA EL SEGUNDO PARAMETRO
const PORT = process.env.PORT ?? 3000;

// config templete engina y ruta elementos estaticos
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static("public"));

// config para method override
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// indicamos los routes
app.use("/",mainRoutes);
app.use("/products",productsRoutes);
app.use("/user", usersRoutes);

// indicamos como proceder ante el error 404
app.use((req, res, next) => {
    res.status(404).render('not-found');
})

// levantamos el server
app.listen(PORT,()=>{
    console.log(`Server listening on port http://localhost:${PORT}`);
})