const { usuarios } = require("../models");
const bcrypt = require('bcrypt');

async function modificar_usuario(usuario_id, novas_informacoes , opcoes = {}) {

  const usuario = await usuarios.findOne({where : {id : usuario_id}}, opcoes)

  usuario.usuario = novas_informacoes.usuario

  usuario.senha = novas_informacoes.senha

  await usuario.save()

}

async function deletar_usuario(usuario_id, opcoes = {}){
  
  return usuarios.destroy({
    where: { id: usuario_id },
    ...opcoes
  })

}

async function criar_usuario(usuario_informacoes ,opcoes = {}) {

  return usuarios.create(usuario_informacoes, opcoes)

}

async function checar_usaurio_base(opcoes = {}) {

  const usuario_base = await usuarios.findOne({where : {
    id : 1
  }},opcoes)

  if (!usuario_base) {

    await criar_usuario({
      usuario: "usuario_base",
      email: "usuario_base@cineja.local",
      senha: "123",
      pergunta_seguranca: "Qual o nome da sua mãe?",
      resposta_seguranca: "base",
    })

    console.log("usuario base criado")

  }

  return true

}

async function autenticar_usuario(email, senha) {

  const usuario = await usuarios.findOne({
    where: { email },
    attributes: { include: ["senha"] },
  })

  if (!usuario) return null
  
  const senha_valida = await bcrypt.compare(senha, usuario.senha)

  if (!senha_valida) return null

  const usuarioSeguro = usuario.toJSON()
  delete usuarioSeguro.senha

  return usuarioSeguro

}

module.exports = {
  criar_usuario,
  deletar_usuario,
  modificar_usuario,
  checar_usaurio_base,
  autenticar_usuario,
}
