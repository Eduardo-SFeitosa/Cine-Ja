module.exports = (sequelize, DataTypes) => {

    const assentos = sequelize.define("assentos", {

        local : {
            type: DataTypes.STRING(5),
            allowNull : false
        },

        situacao : {
            type: DataTypes.STRING,
            allowNull : false
        },

    },
    {
        freezeTableName : true
    })

    assentos.associate = (models) => {
        
        assentos.belongsTo(models.sessoes, {
            foreignKey: "sessao_id",
            as: "sessao",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }

    return assentos

}

