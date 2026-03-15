const express = require("express")
const route = express.Router()

const cinemas_service = require("../services/cinemas_services")

route.get("/", async (request, response) => {

  const cinemas = await cinemas_service.cinemas_disponiveis()
  response.json(cinemas)
})

route.get("/:nome", async (request, response) => {

  const filme = await cinemas_service.filme_nome(request.params.nome)
  response.json(filme)
})


route.post("/", async (request, response) => {
    
  const cinema = await cinemas_service.criar_cinema(request.body)
  response.json(cinema)
})

module.exports = route
