const { pedido, ingresso, filmes, cinemas } = require("../models");

async function criar_pedido(informacoes ,opcoes = {}) {

  console.log(informacoes)

  return pedido.create(informacoes, opcoes)

}

async function pedidos_por_usuario_id(usaurio_id, opcoes = {}) {

  return pedido.findAll({

    where: {
      usuario_id: usaurio_id,
    },
    include: [{
      model: ingresso,
      as: "ingressos",
      include: [
        { model: filmes, as: "filme_rel", attributes: ["titulo", "poster_url"] },
        { model: cinemas, as: "cinema_rel", attributes: ["nome", "localizacao"] },
      ],
    }],
    ...opcoes,
  });

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
