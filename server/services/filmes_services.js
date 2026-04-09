const { filmes } = require("../models");

async function filmes_disponiveis(opcoes = {}) {

  const filmes_listados = filmes.findAll({ 
    raw: true 
  }, opcoes)

  if (filmes_listados.length <= 0) {

    await popular_filmes(60)

    return filmes.findAll({ 
    raw: true 
    }, opcoes)

  }

  return filmes_listados

}

async function popular_filmes(qtd = 20) {
  const filmesExistentes = await filmes_disponiveis()

  if (filmesExistentes.length > 0) {
    console.log("Filmes já populados")
    return
  }

  const palavras = [
    "doido", "maluco", "sombrio", "perdido",
    "secreto", "proibido", "insano", "aleatorio", "radical", "irado"
  ]

  const adjetivo = ["muito", "pra dedeu", "pra caralho", "demais", "isso dai"]

  const generos = [
    "acao", "drama", "comedia", "suspense", 
    "terror", "aventura", "ficcao", "romance"
  ]

  for (let i = 0; i < qtd; i++) {
    const filme = {
      titulo: `${palavras[Math.floor(Math.random() * palavras.length)]} ${adjetivo[Math.floor(Math.random() * adjetivo.length)]}`,
      poster_url: "poster_test.jpg",
      duracao: numero_aleatorio(80, 180),
      classificacao: numero_aleatorio(0, 18),
      genero: generos[Math.floor(Math.random() * generos.length)],
      atores: "ator generico",
      diretor: "diretor generico",
      descricao: "um filme completamente aleatorio gerado automaticamente",
      lancamento: `${numero_aleatorio(1990, 2024)}-0${numero_aleatorio(1,9)}-${numero_aleatorio(10,28)}`
    }

    await criar_filme(filme)
  }

  console.log(`${qtd} filmes aleatórios criados com sucesso`)
}

function numero_aleatorio(min, max){

  return Math.floor(Math.random() * (max - min + 1)) + min;

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
