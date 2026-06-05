const express = require("express")
const route = express.Router()

const usuario_services = require("../services/usuarios_services")

//cria novo usuario
route.post("/", async (request, response) => {

  const usuario = await usuario_services.criar_usuario(request.body)

  console.log("usuraio criado com as informacoes", usuario)

  response.json(usuario)
  
})

//autentica usuario pelo email e senha
route.post("/login", async (request, response) => {
  const { email, senha } = request.body

  if (!email || !senha) {
    return response.status(400).json({ message: "Email e senha são obrigatórios" })
  }

  const usuario = await usuario_services.autenticar_usuario(email, senha)

  if (!usuario) {
    return response.status(401).json({ message: "Email ou senha inválidos" })
  }

  response.json(usuario)
})

//modifica senha e ou nome de usuario
route.put("/:usuario_id", async (request, response) => {

  const sessoes = await usuario_services.modificar_usuario(request.params.usuario_id, request.body)

  response.json(sessoes)

})

//deleta usuario
route.delete("/:usuario_id", async (request, response) => {
    
  const cinema = await usuario_services.deletar_usuario(request.params.usuario_id, request.body)

  response.json(cinema)

})

module.exports = route;
