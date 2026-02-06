module.exports = (sequelize, DataTypes) => {

    const filmes = sequelize.define("filmes", {

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

    filmes.associate = (models) => {
        filmes.hasMany(models.sessoes_disponiveis, {
            foreignKey: 'filme',
            as: 'sessoes_disponiveis'
        })

        filmes.hasMany(models.ingresso, {
            foreignKey: 'filme',
            as: 'ingressos'
        })
    }

    return filmes

}