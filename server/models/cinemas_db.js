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
        
    },
    {
        freezeTableName : true
    })

    cinemas.associate = (models) => {
        
        cinemas.hasMany(models.sessoes, {
            foreignKey: "cinema_id",
            as: "sessoes"
        })

        cinemas.hasMany(models.ingresso, {
            foreignKey: "cinema_id",
            as: "ingressos"
        })
    }

    return cinemas

}