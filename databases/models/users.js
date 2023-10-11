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
            unique: true
        },
        name: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        },
        password: {
            type:           dataTypes.STRING(255),
            allowNull:      false
        },
        carrito_id: {
            type:           dataTypes.INTEGER,
            allowNull:      false
        },
        imagen: {
            type:           dataTypes.STRING(255),
            defaultValue:   '/img/publicidad-banner/amd-ryzen-radeon-banner.jpg' //! EXAMPLE!!
        },
        last_login: {
            type:           dataTypes.DATE
        }
    }, {
        tableName: 'user',
        timestamps: false,
        // createdAt: false,
        // updatedAt: 'updateTimestamp'
    })

    userDB.associate = function (model) {
        userDB.hasOne(model.carritoModel,{
            as: "carrito", 
            foreignKey: "id_carrito" 
        })
    }
    
    return userDB;
}