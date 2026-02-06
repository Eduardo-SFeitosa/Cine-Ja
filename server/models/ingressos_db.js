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
        }
        
    })

    //Cria Foreign Key do filme a ser exibido, cinema que ira exibir e usuario que pertence
    ingresso.associate = (models) => {

    ingresso.belongsTo(models.filmes, {
        foreignKey: 'filme_id',
        as: 'filme_rel'
    })

    ingresso.belongsTo(models.cinemas, {
        foreignKey: 'cinema_id',
        as: 'cinema_rel'
    })
    
    ingresso.belongsTo(models.usuarios, {
        foreignKey: 'usuario_id',
        as: 'usuario_rel'
    })
    }
 
    return ingresso

}

