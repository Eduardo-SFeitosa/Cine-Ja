const express = require("express")
const route = express.Router()

const filmes_service = require("../services/filmes_services")

//retorna todos os filmes disponiveis
route.get("/", async (request, response) => {

  const filmes = await filmes_service.filmes_disponiveis()
  response.json(filmes)

})

//retorna filme de acordo com id
route.get("/:id", async (request, response) => {

  const filme = await filmes_service.filme_id(request.params.id)
  response.json(filme)
  
})

//cria novo filme
route.post("/", async (request, response) => {
    
  const filme = await filmes_service.criar_filme(request.body)
  response.json(filme)
  
})

module.exports = route;
