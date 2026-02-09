const { cinemas } = require("../models");

async function cinemas_disponiveis(opcoes = {}) {
  return cinemas.findAll({raw: true}, opcoes)
}

async function cinema_nome(nome, opcoes = {}) {

  return cinemas.findOne({ where: { nome }, 
    raw: true  
},opcoes)
}

async function criar_cinema(informacoes, opcoes = {}) {

  return cinemas.create(informacoes, opcoes)
}

module.exports = {
  cinemas_disponiveis,
  cinema_nome,
  criar_cinema
}
