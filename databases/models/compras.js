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

    pivotCarrito.associate = function (model) {
        pivotCarrito.belongsTo(model.articulosModel, { 
            foreignKey: "id_articulos", //HACE REFERENCIA A ESTA TABLA
            targetId: "id_articulos"  //HACE REFERENCIA A LA TABLA ARTICULOS.DB.JS
        });

        pivotCarrito.belongsTo(model.carritoModel, { 
            foreignKey: "id_carrito", //HACE REFERENCIA A ESTA TABLA
            targetId: "id_carrito"  //HACE REFERENCIA A LA TABLA CARRITO.DB.JS
        });
    }
    return pivotCarrito;
}