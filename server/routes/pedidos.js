const express = require("express")
const route = express.Router()

const pedidos_services = require("../services/pedidos_services")

//retorna todos os pedidos por id de usuario
route.get("/:usuario_id", async (request, response) => {

  const pedidos = await pedidos_services.pedidos_por_usuario_id(request.params.usuario_id)

  response.json(pedidos)
  
})

route.get("/:pedido_id", async (request, response) => {

  const pedido = await pedidos_services.pedidos_por_pedido_id(request.params.pedido_id)

  response.json(pedido)
  
})

route.put("/:pedido_id", async (request, response) => {

  try {

    const atualizado = await pedidos_services.pagar_pedido(request.params.pedido_id)

    response.json(atualizado)

  } catch (erro) {

    const status = erro.status || 500

    response.status(status).json({
      success: false,
      message: erro.message || "Erro ao pagar pedido",
    })

  }

})

route.post("/", async (request, response) => {
    
  const pedido = await pedidos_services.criar_pedido(request.body)
  response.json(pedido)

})

module.exports = route;
