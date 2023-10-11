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
        cantidad: {
            type:           dataTypes.TINYINT(11),
            allowNull:      false
        }
    }, {
        tableName: 'carrito',
        timestamps: false

    })

    carritoDB.associate = function(models) {
        carritoDB.hasMany(models.pivotCarrito, {
            as: "carrito",
            foreingkey: "id_carrito",
            sourceKey: "id_carrito"
        });
        
    }
    
    return carritoDB; 
}