/** 
@param {import('sequelize').Sequelize} sequelize
@param {import('sequelize/types').DataType} dataTypes
@returns 
Etiquetas de documentacion. No afectan en nada si son removidas.
*/

module.exports = function(sequelize,dataTypes){
    let comprasDB = sequelize.define("comprasModel",{
        id_compras_usuario: {
            type:           dataTypes.INTEGER, 
            allowNull:      false, 
            autoIncrement:  true,
            primaryKey:     true
        },
        fecha: {
            type:           dataTypes.DATE,
            defaultValue:   dataTypes.NOW //! OPCIONAL
        }

        //2 PARAMETERS MORE

    }, {
        tableName: 'compras_usuario',
        timestamps: true,
        createdAt: 'fecha',
        updatedAt: false,
        deletedAt: false

    })

    comprasDB.associate = function (model) {
        // comprasDB.hasMany(model.???,{
        //     foreignKey: 'foreign_???',
        //     sourceKey: '???'
        // });
        //todo: WAITING TILL THE DB IS OFICIALLY OVER TO COMPLETE THESE PARAMS
    }
    
    return comprasDB;
}