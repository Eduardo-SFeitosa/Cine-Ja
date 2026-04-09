const express = require("express")
const route = express.Router()

const sessoes_service = require("../services/sessoes_services")

route.get("/", async (request, response) => {

  const sessoes = await sessoes_service.filmes_em_cartaz()

  response.json(sessoes)
  
})

route.get("/:filme_id/:dia", async (request, response) => {

  const sessoes = await sessoes_service.sessoes_por_filme_id(request.params.filme_id, request.params.dia)

  response.json(sessoes)

})

route.post("/", async (request, response) => {
    
  const cinema = await sessoes_service.criar_sessao(request.body)
  response.json(cinema)

})

module.exports = route;
