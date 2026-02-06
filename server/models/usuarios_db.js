module.exports = (sequelize, DataTypes) => {

    const usuarios = sequelize.define("usuarios", {

        usuario : {
            type: DataTypes.STRING(100),
            allowNull : false
        },
        senha : {
            type: DataTypes.STRING(100),
            allowNull : false
        },

    })

    usuarios.associate = (models) => {
        usuarios.hasMany(models.ingresso, {
            foreignKey: 'usuario',
            as: 'ingressos'
    })
    }

    return usuarios

}