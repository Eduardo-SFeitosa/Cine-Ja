const { cinemas, filmes, sessoes } = require("../models");


//retorna todas as sessões de um filme especifico e dia especifico
async function sessoes_por_filme_id(filme_id, dia, opcoes = {}) {

  const sessoes_disponiveis = await sessoes.findAll({

      //JOIN tabela filmes com a tabela de sessoes
      include: {
        model: cinemas,
        as : "cinema_rel",
        attributes: ["nome", "localizacao"]
      },

    where: {
      filme_id: filme_id,
      dia : dia
     },

    //retorna lista limpa com valores
    raw: true,

  }, opcoes)

  return sessoes_disponiveis

}

async function sessoes_existentes(opcoes = {}){

  return await sessoes.findAll({
    raw: true
  }, opcoes)

}

async function filmes_em_cartaz(opcoes = {}){
  
  return await sessoes.findAll({

    //JOIN tabela filmes com a tabela de sessoes
    include: {
      model: filmes,
      as : "filme_rel"
    },

    //não pega nenhuma coluna da tabela sessões
    attributes: [],

    //não repete filmes pegando apenas valores unicos
    group: ["filme_rel.id"],

    //retorna lista limpa com valores
    raw: true

  },opcoes)

}

async function criar_sessao(informacoes, opcoes = {}) {

  return await sessoes.create(informacoes, opcoes)

}

async function limpar_sessoes_db(){
  await sessoes.destroy({
    where: {},
    truncate: false,
    cascade: true
  });

  return true
}

module.exports = {
  sessoes_por_filme_id,
  sessoes_existentes,
  criar_sessao,
  filmes_em_cartaz,
  limpar_sessoes_db,
}
