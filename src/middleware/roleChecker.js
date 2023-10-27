const { v4: uuidv4, validate } = require('uuid');

function createCookie(req,res,cookieName,description){
    res.cookie(cookieName, uuidv4(description),{
        maxAge: (((10 * 1000) * 60) * 60) * 24, //pasas ms a dias, primer valor son los dias que queres que dure
        httpOnly: true,
        sameSite: 'strict'
    })
}

module.exports = {createCookie};

// createCookie(req,res,'ADMINISTRATIVE-KEY-VALUE2','lmao');




// obtener una cookie por parametros de funciones es complejo
// es mejor hacer req.cookies.nombredelacookie