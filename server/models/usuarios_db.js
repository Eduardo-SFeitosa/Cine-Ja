const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

    const usuarios = sequelize.define("usuarios", {

        usuario : {
            type: DataTypes.STRING(100),
            allowNull : false
        },
        email : {
            type : DataTypes.STRING(255),
            allowNull : false
        },
        senha : {
            type: DataTypes.STRING(255),
            allowNull : false
        },
        pergunta_seguranca : {
            type: DataTypes.STRING(255),
            allowNull : false
        },
        resposta_seguranca : {
            type: DataTypes.STRING(255),
            allowNull : false
        },

    },
    {
        //esconde campos 
        defaultScope: {
        attributes: {
            exclude: ["senha", "resposta_seguranca"]
        }
        },


        //AUTOMATICAMENTE CRIPTOGRAFA SENHA E RESPOSTA DE SEGURANCA QUANDO SALVA OU MODIFICADA
        hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.senha) {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
            if (usuario.resposta_seguranca) {
            const salt = await bcrypt.genSalt(10);
            usuario.resposta_seguranca = await bcrypt.hash(usuario.resposta_seguranca, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('senha')) {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
            if (usuario.changed('resposta_seguranca')) {
            const salt = await bcrypt.genSalt(10);
            usuario.resposta_seguranca = await bcrypt.hash(usuario.resposta_seguranca, salt);
            }
        }
        },

        freezeTableName : true
    });

    usuarios.associate = (models) => {

        usuarios.hasMany(models.ingresso, {
            foreignKey: "usuario_id",
            as: "ingressos"
        })

        usuarios.hasMany(models.pedido, {
            foreignKey: "usuario_id",
            as: "pedidos"
        })

        usuarios.hasMany(models.cinema_favorito, {
            foreignKey: "usuario_id",
            as: "cinemas_favoritos"
        })
    }

    return usuarios

}