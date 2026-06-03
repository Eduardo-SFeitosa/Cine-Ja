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

    },
    {
        //esconde o campo senha
        defaultScope: {
        attributes: {
            exclude: ["senha"]
        }
        },


        //AUTOMATICAMENTE CRIPTOGRAFA SENHAS DE USUARIO QUANDO SALVA OU MODIFICADA
        hooks: {
        beforeCreate: async (usuario) => {
            if (usuario.senha) {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
            }
        },
        beforeUpdate: async (usuario) => {
            if (usuario.changed('senha')) {
            const salt = await bcrypt.genSalt(10);
            usuario.senha = await bcrypt.hash(usuario.senha, salt);
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
    }

    return usuarios

}