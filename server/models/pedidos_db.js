module.exports = (sequelize, DataTypes) => {

    const pedido = sequelize.define("pedido", {

        situacao : {
            type: DataTypes.STRING,
            allowNull : false
        },

        validade : {
            type : DataTypes.DATETIME,
            allowNull : false
        },
        
    },
)

    pedido.associate = (models) => {
    
    pedido.hasMany(models.ingresso, {
        foreignKey: "ingresso_id",
        as: "ingresso"
    })

    pedido.belongsTo(models.usuarios, {
        foreignKey: "usuario_id",
        as: "usuario_rel",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    
    }

    return pedido

}

