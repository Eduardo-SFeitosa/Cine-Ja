module.exports = (sequelize, DataTypes) => {

    const ingresso = sequelize.define("ingresso", {

        sala : {
            type: DataTypes.TINYINT,
            allowNull : false
        },

        assento : {
            type: DataTypes.STRING(5),
            allowNull : false
        },

        dia : {
            type: DataTypes.DATEONLY,
            allowNull : false
        },

        horario : {
            type: DataTypes.TIME,
            allowNull : false
        },

        sessao_3d : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        },

        sala_mega : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        },

        filme_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        cinema_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        usuario_id : {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        situacao : {
            type: DataTypes.STRING,
            allowNull : false
        },
        
    },
    {
        freezeTableName : true
    }
)

    //Cria Foreign Key do filme a ser exibido, cinema que ira exibir e usuario que pertence
    ingresso.associate = (models) => {

    ingresso.belongsTo(models.filmes, {
        foreignKey: "filme_id",
        as: "filme_rel",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    ingresso.belongsTo(models.cinemas, {
        foreignKey: "cinema_id",
        as: "cinema_rel",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    
    ingresso.belongsTo(models.usuarios, {
        foreignKey: "usuario_id",
        as: "usuario_rel",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    ingresso.belongsTo(models.pedido, {
        foreignKey: "pedido_id",
        as: "pedido_rel",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    }
 
    return ingresso

}

