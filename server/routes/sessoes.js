const express = require("express")
const route = express.Router()

const sessoes_service = require("../services/sessoes_services")

//retorna todas as sessões de um filme
route.get("/:filme", async (request, response) => {

  const sessoes = await sessoes_service.sessoes_disponiveis({
    where : {filme : request.params.filme}
  })

  response.json(sessoes)
})


//cria um novo filme na base de dados utilizando o request
route.post("/", async (request, response) => {
    
  const cinema = await sessoes_service.criar_cinema(request.body)
  response.json(cinema)
})

module.exports = route;
