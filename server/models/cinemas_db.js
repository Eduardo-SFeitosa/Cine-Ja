module.exports = (sequelize, DataTypes) => {

    const Cinemas = sequelize.define("Cinemas", {

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

    return Cinemas

}