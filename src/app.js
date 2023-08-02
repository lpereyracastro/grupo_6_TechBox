const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes")
const path = require("path")

app.set("view engine", "ejs")
app.use(express.static("public"))
app.set('views', path.join(__dirname, 'views'));
app.use("/",mainRoutes);

// up server
app.listen(3000,()=>{
    console.log("funcionanado en el puerto 3000");
})