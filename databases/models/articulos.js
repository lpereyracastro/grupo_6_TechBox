/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = function(sequelize,dataTypes){
    let articulosDB = sequelize.define("articulosModel",{
        articulos_id: {
            type:           dataTypes.INTEGER, 
            allowNull:      false, 
            autoIncrement:  true,
            primaryKey:     true
        },
        name: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        },
        description: {
            type:           dataTypes.TEXT, // MAXIMO DE CARACTERES: 65535
            allowNull:      false
        },
        price: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        },
        marca: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        }
    }, {
        tableName: 'articulos',
        timestamps: false

    })

    articulosDB.associate = function (models) {
          articulosDB.belongsToMany(models.carritoModel,{
            through: "pivotCarrito",
            as: "carritoPivotArticulos",
            foreignKey: "articulos_id"
        })
    };

    return articulosDB; 
}