module.exports = (sequelize, DataTypes) => {

    const sessoes_disponiveis = sequelize.define("sessoes_disponiveis", {

        sala : {
            type: DataTypes.TINYINT,
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

        sesssao_3d : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        },

        sala_mega : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        }
        
    })

    sessoes_disponiveis.associate = (models) => {
        sessoes_disponiveis.belongsTo(models.filmes, {
            foreignKey: 'filme_id',
            as: 'filme_rel'
        })

    sessoes_disponiveis.belongsTo(models.cinemas, {
        foreignKey: 'cinema_id',
        as: 'cinema_rel'
    })

    sessoes_disponiveis.hasMany(models.assentos, {
        foreignKey: 'sessao',
        as: 'assentos'
    })

    
    }

    return sessoes_disponiveis

}

