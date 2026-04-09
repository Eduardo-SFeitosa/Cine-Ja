const { pedidos } = require("../models");

async function criar_pedido(usuario_informacoes ,opcoes = {}) {

  return pedidos.create(informacoes, opcoes)

}

async function pedidos_por_usuario_id(usaurio_id, opcoes = {}) {

  return pedidos.findAll({

    where: {
      usaurio_id: usaurio_id,
     },

    raw: true,

  }, opcoes)

}

async function modificar_situacao(pedido_id ,situacao_atualizada, opcoes ={}){

    const pedido = await pedidos.findOne({where : {id : pedido_id}}, opcoes)

    pedido.situacao = situacao_atualizada

    await pedido.save()
}

module.exports = {
    criar_pedido,
    pedidos_por_usuario_id,
    modificar_situacao
}
