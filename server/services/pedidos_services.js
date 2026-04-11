const { pedido } = require("../models");

async function criar_pedido(informacoes ,opcoes = {}) {

  console.log(informacoes)

  return pedido.create(informacoes, opcoes)

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

    const pedido = await pedido.findOne({where : {id : pedido_id}}, opcoes)

    pedido.situacao = situacao_atualizada

    await pedido.save()
}

module.exports = {
    criar_pedido,
    pedidos_por_usuario_id,
    modificar_situacao
}
