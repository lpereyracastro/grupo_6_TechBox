/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = function(sequelize,dataTypes){
    let productosDB = sequelize.define("productosComprasModel",{
        id_productos_compra: {
            type:           dataTypes.INTEGER, 
            allowNull:      false, 
            autoIncrement:  true,
            primaryKey:     true
        },
        id_producto: {
            type:           dataTypes.INTEGER,
            allowNull:      false
        },  //!Ambos parametros marcan como VARCHAR en la db pero deben ser INT
            //! id_producto y id_compra
        id_compra: {
            type:           dataTypes.INTEGER,
            allowNull:      false
        },
        cantidad: {
            type:           dataTypes.INTEGER,
            allowNull:      false
        },
        precio: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        }
    }, {
        tableName: 'productos_compra',
        timestamps: false

    })

    productosDB.associate = function (model) {
        // userDB.hasMany(model.???,{
        //     foreignKey: 'foreign_???',
        //     sourceKey: '???'
        // });
        //todo: WAITING TILL THE DB IS OFICIALLY OVER TO COMPLETE THESE PARAMS
    }
    
    return productosDB;
}