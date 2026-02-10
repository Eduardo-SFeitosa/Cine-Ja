const { filmes } = require("../models");

async function filmes_disponiveis(opcoes = {}) {

  return filmes.findAll({ 
    raw: true 
  }, opcoes)
}

async function filme_id(filme_id, opcoes = {}) {

  return filmes.findOne({ where: 
    
    { 
      id : filme_id 
    } 
  }, opcoes)
}

async function criar_filme(informacoes, opcoes = {}) {

  return filmes.create(informacoes, opcoes)
}

module.exports = {
  filmes_disponiveis,
  filme_id,
  criar_filme
}
