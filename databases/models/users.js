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
            allowNull:      false,
            unique:         true
        },
        name: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        },
        password: {
            type:           dataTypes.STRING(255),
            allowNull:      false,
        },
        imagen: {
            type:           dataTypes.STRING(255),
            defaultValue:   "default.jpg"
        },
        last_login: {
            type:           dataTypes.DATE
        },
        role: {
            type:           dataTypes.TINYINT(1)
        }
    }, {
        tableName: 'user',
        timestamps: false,
        // createdAt: false,
        // updatedAt: 'updateTimestamp'
    })

    userDB.associate = function (model) {
        userDB.belongsTo(model.carritoModel,{
            as: "CarritoToUser", 
            foreignKey: "user_id" 
        })
    }
    
    return userDB;
}