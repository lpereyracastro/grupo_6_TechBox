const bcrypt = require('bcryptjs')

const SALTROUNDS = 12;
const MAX_CHARACTERS = 21;

function hashPassword(input){
    if(input.length <= MAX_CHARACTERS){
        return bcrypt.hashSync(input, SALTROUNDS);
    } else return false;
}

function recoverPassword(input,dbPass){
    return bcrypt.compareSync(input, dbPass);
}


module.exports = {hashPassword,recoverPassword}