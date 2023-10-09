/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = function(sequelize,dataTypes){
    let carritoDB = sequelize.define("carritoModel",{
        id_carrito: {
            type:           dataTypes.INTEGER, 
            allowNull:      false, 
            autoIncrement:  true,
            primaryKey:     true
        },
        id_usuario: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        }, //! De nuevo lo mismo, cambiar formato de los id_usuario y id_producto
        id_producto: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        },
        cantidad: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        }
    }, {
        tableName: 'carrito',
        timestamps: false

    })

    carritoDB.associate = function (model) {
        // userDB.hasMany(model.???,{
        //     foreignKey: 'foreign_???',
        //     sourceKey: '???'
        // });
        
    }
    
    return carritoDB; 
}