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
        },
        FK_user_id: {
            type:           dataTypes.TINYINT(11),
            allowNull:      false
        },
        FK_articulo_id: {
            type:           dataTypes.TINYINT(11),
            allowNull:      false
        }
    }, {
        tableName: 'carrito',
        timestamps: false

    })

    carritoDB.associate = function(models) {
        carritoDB.hasMany(models.userModel, {
            as:"CarritoToUser",
            foreignKey: 'user_id'
          });

        carritoDB.hasMany(models.articulosModel, {
            as:"CarritoToArticulo",
            foreignKey: 'articulos_id'
        });

        carritoDB.belongsToMany(models.articulosModel,{
            through: "pivotCarrito",
            as: "carritoPivotArticulos",
            foreignKey: "id_carrito"
        })
        
    }
    
    return carritoDB; 
}