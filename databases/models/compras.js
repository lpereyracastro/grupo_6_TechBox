/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = function(sequelize,dataTypes){
    let pivotCarrito = sequelize.define("pivotCarrito",{
        PK_pivotCarrito: {
            type:           dataTypes.INTEGER, 
            allowNull:      false, 
            autoIncrement:  true,
            primaryKey:     true
        },
        id_carrito: {
            type:           dataTypes.INTEGER,
            allowNull:      false, 
        },
        id_articulos: {
            type:           dataTypes.DATE,
            allowNull:      false, 
        }
    }, {
        tableName: 'pivot_carrito',
        timestamps: false

    })


    return pivotCarrito;
}