const express = require("express")
const route = express.Router()

const itinerario_services = require("../services/itinerario_services")

route.get("/", async (request, response) => {

    const initerario_criado = await itinerario_services.criar_itinerario()

    response.json(initerario_criado)

})

module.exports = route;