const express = require("express");
const app = express();
const mainRoutes = require("./routes/mainRoutes");
const path = require("path");
const methodOverride = require('method-override');

app.set("view engine", "ejs")
app.use(express.static("public"))
app.set('views', path.join(__dirname, 'views'));
app.use("/",mainRoutes);
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended : false}));
app.use(express.json());

// up server
app.listen(3000,()=>{
    console.log("funcionanado en el puerto 3000");
})