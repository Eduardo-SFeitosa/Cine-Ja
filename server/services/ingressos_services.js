const { ingresso } = require("../models");

async function criar_ingresso(informacoes, opcoes = {}) {

  console.log(informacoes)

  return ingresso.create(informacoes, opcoes)

}

module.exports = {
  criar_ingresso,
}