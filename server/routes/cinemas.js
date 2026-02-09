const express = require("express")
const route = express.Router()

const cinemas_service = require("../services/cinemas_services")

//retorna todos os cinemas disponiveis da base de dados
route.get("/", async (request, response) => {

  const cinemas = await cinemas_service.cinemas_disponiveis()
  response.json(cinemas)
})

//retorna um filme pelo título
route.get("/:nome", async (request, response) => {

  const filme = await cinemas_service.filme_nome(request.params.nome)
  response.json(filme)
})


//cria um novo filme na base de dados utilizando o request
route.post("/", async (request, response) => {
    
  const cinema = await cinemas_service.criar_cinema(request.body)
  response.json(cinema)
})

module.exports = route
