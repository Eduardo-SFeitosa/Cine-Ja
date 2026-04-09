const express = require("express")
const route = express.Router()

const assentos_service = require("../services/assentos_services")

//retorna todos os assentos de uma sessão especifica
route.get("/:sessao_id", async (request, response) => {

  const assentos = await assentos_service.assentos_por_sessao_id(request.params.sessao_id)
  response.json(assentos)
})

route.put("/:ingreso_id/:situacao_nova", async (request, response) => {

  const assentos = await assentos_service.assentos_por_sessao_id(request.params.ingresso_id, request.params.situacao_nova)
  response.json(assentos)
  
})


module.exports = route;
