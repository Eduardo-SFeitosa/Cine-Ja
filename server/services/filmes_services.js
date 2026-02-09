const { filmes } = require("../models");

async function filmes_disponiveis(opcoes = {}) {

  return filmes.findAll({
    where: { ativo: true}, 
    raw: true 
  }, opcoes)
}

async function filme_titulo(titulo, opcoes = {}) {

  return filmes.findOne({ where: { titulo } }, opcoes)
}

async function criar_filme(informacoes, opcoes = {}) {

  return filmes.create(informacoes, opcoes)
}

module.exports = {
  filmes_disponiveis,
  filme_titulo,
  criar_filme
}
