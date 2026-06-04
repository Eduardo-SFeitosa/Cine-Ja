const express = require("express")
const route = express.Router()

const cinema_favorito_services = require("../services/cinema_favorito_services")

route.get("/usuario/:usuario_id", async (request, response) => {

  const favoritos = await cinema_favorito_services.listar_por_usuario_id(
    request.params.usuario_id
  )

  response.json(favoritos)

})

route.post("/", async (request, response) => {

  try {

    const favorito = await cinema_favorito_services.criar_cinema_favorito(request.body)
    response.json(favorito)

  } catch (erro) {

    const status = erro.name === "SequelizeUniqueConstraintError" ? 409 : 500

    response.status(status).json({
      message: status === 409
        ? "Este cinema já está nos favoritos deste usuário"
        : erro.message || "Erro ao criar cinema favorito",
    })

  }

})

route.put("/:cinema_favorito_id", async (request, response) => {

  try {

    const favorito = await cinema_favorito_services.modificar_cinema_favorito(
      request.params.cinema_favorito_id,
      request.body
    )

    if (!favorito) {
      response.status(404).json({ message: "Cinema favorito não encontrado" })
      return
    }

    response.json(favorito)

  } catch (erro) {

    const status = erro.name === "SequelizeUniqueConstraintError" ? 409 : 500

    response.status(status).json({
      message: status === 409
        ? "Este cinema já está nos favoritos deste usuário"
        : erro.message || "Erro ao modificar cinema favorito",
    })

  }

})

route.delete("/:cinema_favorito_id", async (request, response) => {

  const removidos = await cinema_favorito_services.deletar_cinema_favorito(
    request.params.cinema_favorito_id
  )

  if (removidos === 0) {
    response.status(404).json({ message: "Cinema favorito não encontrado" })
    return
  }

  response.json({ removidos })

})

module.exports = route
