const db = require("../../databases/models")
const {validate} = require("uuid")
const SALTROUNDS = 12;

function createCookie(req,res,cookieName,description){
    res.cookie(cookieName, description,{
        maxAge: (((10 * 1000) * 60) * 60) * 24, //pasas ms a dias, primer valor son los dias que queres que dure
        httpOnly: true,
        sameSite: 'strict'
    })
}

function getCookie(parameter){
    try {
        return JSON.parse(parameter);
    } catch (e){
        return false;
    }
}

module.exports = {createCookie, getCookie, SALTROUNDS};

//! ejemplo:
//  createCookie(req,res,"LOGGED_ON", JSON.stringify({mail: "alo", data: bcrypt.hashSync("papu",12)}))