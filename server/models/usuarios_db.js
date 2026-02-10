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

    },
    {
        freezeTableName : true
    }
)

    usuarios.associate = (models) => {

        usuarios.hasMany(models.ingresso, {
            foreignKey: "usuario_id",
            as: "ingressos"
    })
    }

    return usuarios

}