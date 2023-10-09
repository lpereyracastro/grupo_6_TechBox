/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = function(sequelize,dataTypes){
    let userDB = sequelize.define("userModel",{
        user_id: {
            type:           dataTypes.INTEGER, 
            allowNull:      false, 
            autoIncrement:  true,
            primaryKey:     true
            },
        mail: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        },
        name: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        },
        password: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        }
    }, {
        tableName: 'user',
        timestamps: false
    })

    userDB.associate = function (model) {
        // userDB.hasMany(model.???,{
        //     foreignKey: 'foreign_???',
        //     sourceKey: '???'
        // });
        //todo: WAITING TILL THE DB IS OFICIALLY OVER TO COMPLETE THESE PARAMS
    }
    
    return userDB;
}