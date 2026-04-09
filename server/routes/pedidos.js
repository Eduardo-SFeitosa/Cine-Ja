const express = require("express")
const route = express.Router()

const pedidos_services = require("../services/pedidos_services")

//retorna todos os pedidos por id de usuario
route.get("/:usuario_id", async (request, response) => {

  const pedidos = await pedidos_services.pedidos_por_usuario_id(request.params.usuario_id)

  response.json(pedidos)
  
})

route.put("/:pedido_id/:situacao_nova", async (request, response) => {

  const pedido = await pedidos_services.modificar_situacao(request.params.pedido_id, request.params.situacao_nova)

  response.json(pedido)

})

route.post("/", async (request, response) => {
    
  const pedido = await pedidos_services.criar_pedido(request.body)
  response.json(pedido)

})

module.exports = route;
