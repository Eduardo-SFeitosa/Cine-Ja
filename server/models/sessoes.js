module.exports = (sequelize, DataTypes) => {

    const sessoes = sequelize.define("sessoes", {

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

        sessao_3d : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        },

        sala_mega : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        },

        filme_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          },
      
          cinema_id: {
            type: DataTypes.INTEGER,
            allowNull: false
          }
        
    },
    {
    freezeTableName : true
    }
)

    sessoes.associate = (models) => {
    
    sessoes.belongsTo(models.filmes, {
        foreignKey: "filme_id",
        target : "id",
        as: "filme_rel",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    sessoes.belongsTo(models.cinemas, {
        foreignKey: "cinema_id",
        target : "id",
        as: "cinema_rel",
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })

    sessoes.hasMany(models.assentos, {
        foreignKey: "sessao_id",
        as: "assentos"
    })

    
    }

    return sessoes

}

