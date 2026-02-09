const express = require("express")
const route = express.Router()

const filmes_service = require("../services/filmes_services")

//retorna todos os filmes disponiveis da base de dados
route.get("/", async (request, response) => {

  const filmes = await filmes_service.filmes_disponiveis()
  response.json(filmes)
})

//retorna um filme pelo título
route.get("/:titulo", async (request, response) => {

  const filme = await filmes_service.filme_titulo(request.params.titulo)
  response.json(filme)
})


//cria um novo filme na base de dados utilizando o request
route.post("/", async (request, response) => {
    
  const filme = await filmes_service.criar_filme(request.body)
  response.json(filme)
})

module.exports = route;
