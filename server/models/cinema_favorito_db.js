module.exports = (sequelize, DataTypes) => {

    const cinema_favorito = sequelize.define("cinema_favorito", {

        usuario_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },

        cinema_id : {
            type: DataTypes.INTEGER,
            allowNull : false
        },

    },
    {
        freezeTableName : true,
        indexes: [
            {
                unique: true,
                fields: ["usuario_id", "cinema_id"]
            }
        ]
    })

    cinema_favorito.associate = (models) => {

        cinema_favorito.belongsTo(models.usuarios, {
            foreignKey: "usuario_id",
            as: "usuario_rel",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })

        cinema_favorito.belongsTo(models.cinemas, {
            foreignKey: "cinema_id",
            as: "cinema_rel",
            onDelete: "CASCADE",
            onUpdate: "CASCADE"
        })
    }

    return cinema_favorito

}
