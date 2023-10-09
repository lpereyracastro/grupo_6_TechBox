/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = function(sequelize,dataTypes){
    let productosDB = sequelize.define("productosModel",{
        product_id: {
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
            type:           dataTypes.STRING(300), //puede ser TEXT, pero no tiene limite
            allowNull:      false
        },
        price: {
            type:           dataTypes.STRING(45),
            allowNull:      false
        }
    }, {
        tableName: 'products',
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
    //!mismo nombre que otra tabla. Afectaria si utilizariamos .mjs, pero usamos .cjs :P
}