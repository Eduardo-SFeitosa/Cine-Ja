module.exports = (sequelize, DataTypes) => {

    const Filmes = sequelize.define("Filmes", {

        titulo : {
            type: DataTypes.STRING,
            allowNull : false
        },
        poster_url : {
            type: DataTypes.STRING,
            allowNull : false
        },
        duracao : {
            type: DataTypes.SMALLINT,
            allowNull : false
        },
        classificacao : {
            type: DataTypes.TINYINT,
            allowNull : false
        },
        genero : {
            type: DataTypes.STRING,
            allowNull : false
        },
        atores : {
            type: DataTypes.STRING,
            allowNull : false
        },
        diretor : {
            type: DataTypes.STRING,
            allowNull : false
        },
        descricao : {
            type: DataTypes.TEXT,
            allowNull : false
        },
        lancamento : {
            type: DataTypes.DATEONLY,
            allowNull : false
        },
        ativo : {
            type: DataTypes.BOOLEAN,
            allowNull : false
        }
        

    })

    Filmes.associate = (models) => {
        Filmes.hasMany(models.sessoes_disponiveis, {
            foreignKey: 'filme_id',
            as: 'sessoes_disponiveis'
        })
    }

    

    return Filmes

}