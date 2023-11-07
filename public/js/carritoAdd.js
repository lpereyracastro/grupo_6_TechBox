const db = require("../../databases/models")

let carritoButton = document.querySelector(".producto-card");

carritoButton.addEventListener("click",()=>{
    db.carritoButton
})