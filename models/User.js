// 1. guardar al usuario en la DB
// 2. buscar al usuario que se quiere loguear
// 3. buscar a un usuario por un ID
// 4. Editar la informacion de un usuario
// 5. eliminar un usuario de la DB

// CRUD

const fs = require("fs");
const path = require("path");

const User = {
    fillname : path.join(__dirname, "../data/users.json"), 

    getDate : function(){
        return JSON.parse(fs.readFileSync(this.fillname, "utf-8"));
    },

    findAll : function(){
        return this.getDate()
    },

    findByPk : function(id){
        let allUser = this.findAll();
        let userFound = allUser.find(oneUser => oneUser.id == id);
        return userFound;
    },

    findByField : function(field, text){
        let allUser = this.findAll();
        let userFound = allUser.find(oneUser => oneUser[field] == text);
        return userFound;
    },

    create : function(userData){
        let allUser = this.findAll();
        allUser.push(userData);
        fs.writeFileSync(this.fillname, JSON.stringify(allUser, null, " "))
        return true
    }
};


module.exports = User;