module.exports = (sequelize, DataTypes) => {

    const cinemas = sequelize.define("cinemas", {

        nome : {
            type: DataTypes.STRING,
            allowNull : false
        },

        localizacao : {
            type: DataTypes.STRING,
            allowNull : false
        },

        salas_total : {
            type: DataTypes.TINYINT,
            allowNull : false
        },

        salas_mega : {
            type: DataTypes.TINYINT,
            allowNull : false
        }
        
    })

    cinemas.associate = (models) => {
        
        cinemas.hasMany(models.sessoes_disponiveis, {
            foreignKey: 'cinema',
            as: 'sessoes_disponiveis'
        })

        cinemas.hasMany(models.ingresso, {
            foreignKey: 'cinema',
            as: 'ingressos'
        })
    }

    return cinemas

}