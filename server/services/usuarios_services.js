const { usuarios, sessoes } = require("../models");

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

  return sessoes.create(informacoes, opcoes)

}

module.exports = {
  criar_usuario,
  deletar_usuario,
  modificar_usuario,
}
