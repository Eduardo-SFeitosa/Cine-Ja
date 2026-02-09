const { sessoes_disponiveis } = require("../models");

async function sessoes(filme, opcoes = {}) {

  return sessoes_disponiveis.findAll({
    where: { filme: filme },
    raw: true
  }, opcoes)
}

async function criar_sessao(informacoes, opcoes = {}) {

  return sessoes_disponiveis.create(informacoes, opcoes)

}

module.exports = {
  sessoes_disponiveis,
  criar_sessao
}
