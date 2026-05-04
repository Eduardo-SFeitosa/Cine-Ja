const { sequelize, pedido, ingresso, filmes, cinemas, sessoes } = require("../models");
const assentos_service = require("./assentos_services");

async function criar_pedido(informacoes ,opcoes = {}) {

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
    order: [["id", "ASC"]],
    ...opcoes,
  });

}

async function modificar_situacao(pedido_id ,situacao_atualizada, opcoes ={}){

    const registro = await pedido.findOne({ where : { id : pedido_id }, ...opcoes })

    if (!registro) return null

    registro.situacao = situacao_atualizada

    await registro.save(opcoes)

    return registro

}

async function pagar_pedido(pedido_id) {

  const id = Number(pedido_id);

  return sequelize.transaction(async (transacao) => {

    const registro = await pedido.findOne({
      where: { id: Number.isNaN(id) ? pedido_id : id },
      include: [{ model: ingresso, as: "ingressos" }],
      transaction: transacao,
    });

    if (!registro) {
      const err = new Error("Pedido não encontrado");
      err.status = 404;
      throw err;
    }

    if (registro.situacao !== "aguardando pagamento") {
      const err = new Error("Este pedido não está aguardando pagamento");
      err.status = 409;
      throw err;
    }

    for (const ing of registro.ingressos) {

      const sessao = await sessoes.findOne({
        where: {
          filme_id: ing.filme_id,
          cinema_id: ing.cinema_id,
          dia: ing.dia,
          horario: ing.horario,
          sala: ing.sala,
          sessao_3d: ing.sessao_3d,
          sala_mega: ing.sala_mega,
        },
        transaction: transacao,
      });

      if (!sessao) {
        const err = new Error("Sessão não encontrada para um dos ingressos");
        err.status = 500;
        throw err;
      }

      const assento_registro = await assentos_service.assento_por_local_sessao(
        ing.assento,
        sessao,
        { transaction: transacao }
      );

      if (!assento_registro) {
        const err = new Error(`Assento ${ing.assento} não encontrado`);
        err.status = 500;
        throw err;
      }

      if (assento_registro.situacao !== "reservado") {
        const err = new Error(`Assento ${ing.assento} não está reservado`);
        err.status = 409;
        throw err;
      }

      await assentos_service.modificar_assento(assento_registro.id, "ocupado", {
        transaction: transacao,
      });

      ing.situacao = "paga";
      await ing.save({ transaction: transacao });
    }

    registro.situacao = "pago";
    await registro.save({ transaction: transacao });

    return registro;
  });
}

module.exports = {
    criar_pedido,
    pedidos_por_usuario_id,
    modificar_situacao,
    pagar_pedido,
}
