const { cinemas } = require("../models");

async function cinemas_disponiveis(opcoes = {}) {

  const cinemas_listados = await cinemas.findAll({raw: true}, opcoes)

  if (cinemas_listados.length <= 0) {

    await popular_cinemas(30)

    console.log("cinemas populados com sucesso")

    return await cinemas.findAll({ 
      raw: true 
    }, opcoes)

  }

  return cinemas_listados
}

async function popular_cinemas(qtd = 20) {

  const nomesBase = [
    "dragonlandia", "alagoinha", "mocoto", 
    "imperio", "galaxia", "cinemax", "ultra", "prime"
  ]

  const complementos = [
    "santos", "souza", "domingues", 
    "do maranhao", "silva", "oliveira", "tech", "center"
  ]

  const tiposEndereco = [
    "numero", "rua", "avenida", "travessa"
  ]

  for (let i = 0; i < qtd; i++) {
    const cinema = {
      nome: `${nomesBase[Math.floor(Math.random() * nomesBase.length)]} ${complementos[Math.floor(Math.random() * complementos.length)]}`,
      
      localizacao: `${tiposEndereco[Math.floor(Math.random() * tiposEndereco.length)]} ${numero_aleatorio(1, 999)}`,
      
      salas_total: numero_aleatorio(3, 15),
      
      salas_mega: numero_aleatorio(0, 3)
    }

    await criar_cinema(cinema)
  }

  return true
}

function numero_aleatorio(min, max){

  return Math.floor(Math.random() * (max - min + 1)) + min;

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
