const express = require("express");
const app = express();
const path = require("path");

//ruta a elementos estaticos
let public = path.join(__dirname, "./public");
let static = express.static(public);
app.use(static);

// rutas

app.get("/", (req,res)=>{
    let vista = path.join(__dirname,"./views/index.html");
    res.sendFile(vista);
})

app.get("/login", (req,res)=>{
    let vista = path.join(__dirname,"./views/login.html");
    res.sendFile(vista);
})

app.get("/register", (req,res)=>{
    let vista = path.join(__dirname,"./views/register.html");
    res.sendFile(vista);
})

app.get("/productCart", (req,res)=>{
    let vista = path.join(__dirname,"./views/productCart.html");
    res.sendFile(vista);
})

app.get("/productDetail", (req,res)=>{
    let vista = path.join(__dirname,"./views/productDetail.html");
    res.sendFile(vista);
})

// up server
app.listen(3000,()=>{
    console.log("funcionanado en el puerto 3000");
})