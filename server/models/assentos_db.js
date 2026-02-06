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

    })

    assentos.associate = (models) => {
        assentos.belongsTo(models.sessoes_disponiveis, {
            foreignKey: 'sessao_id',
            as: 'sessao'
        })
    }

    return assentos

}

