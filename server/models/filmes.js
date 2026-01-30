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
            type: DataTypes.DATE,
            allowNull : false
        }
    })

    return Filmes

}