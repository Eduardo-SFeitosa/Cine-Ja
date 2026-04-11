const { ingresso } = require("../models");

async function criar_ingresso(informacoes, opcoes = {}) {

  console.log("criando ingresso")

  return ingresso.create(informacoes, opcoes)

}

async function ingresso_por_id(ingresso_id, opcoes = {}){

  return assentos.findOne({
         where: { 
            ingresso_id : ingresso_id 
            }, 
        raw: true  
    },opcoes)
  
}

async function ingressos_por_usuario(usuario_id, opcoes = {}){

  return assentos.findAll({
         where: { 
            usuario_id : usuario_id 
            }, 
        raw: true  
  },opcoes)

}

module.exports = {
  criar_ingresso,
  ingresso_por_id,
  ingressos_por_usuario
}