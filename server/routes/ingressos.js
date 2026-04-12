const express = require("express")
const route = express.Router()
const { sequelize } = require("../models")


const ingressos_services = require("../services/ingressos_services")
const assentos_service = require("../services/assentos_services")
const pedido_service = require("../services/pedidos_services")

route.post("/", async (request, response) => {

    const transacao = await sequelize.transaction()

    console.log("ingresso sendo criado")

    try{

        const assentos_selecionados = request.body.assentos_selecionados

        const sessao_selecionada = request.body.sessao_selecionada

        const post_http_response = []

        console.log("pedido sendo criado")

        const pedido = await pedido_service.criar_pedido({
            situacao : "aguardando pagamento",
            usuario_id : 1,
        }, { transacao })

        console.log(pedido)
        
        for (let ingresso = 0; ingresso < Object.keys(assentos_selecionados).length; ingresso ++){

            const assento_id = await assentos_service.assento_por_local_sessao(assentos_selecionados[ingresso], sessao_selecionada, { transaction: transacao })

            post_http_response.push(await ingressos_services.criar_ingresso({

                sala : sessao_selecionada.sala,

                assento : assentos_selecionados[ingresso],

                dia : sessao_selecionada.dia,

                horario : sessao_selecionada.horario,

                sessao_3d : sessao_selecionada.sessao_3d,

                situacao : "aguardando pagamento",

                sala_mega : sessao_selecionada.sala_mega,

                pedido_id : pedido.id,

                filme_id : sessao_selecionada.filme_id,

                cinema_id : sessao_selecionada.cinema_id,

                usuario_id : 1,

            }, { transacao }))

            console.log("ingresso adicionado a fila")

            await assentos_service.modificar_assento(assento_id.id, "reservado", { transaction: transacao })

            console.log("assento adicionado a fila")

        }

        await transacao.commit()

        console.log("ingressos e pedido criados com sucesso")

        response.status(200).json({
        success: true,
        message: "ingresso reservado"
        })

    }

    catch(error){

        await transacao.rollback()

        console.log(error)

        response.status(500).json({
        success: false,
        message: "erro ao comprar ingresso",
        error: error.message
        })

    }

})

route.get("/:ingresso_id", async (request, response) => {

    const ingresso = await ingressos_services.ingresso_por_id(request.params.ingresso_id)
    
    response.json(ingresso)

})

route.get("/usuario/:usuario_id", async (request, response) => {

    const ingressos = await ingressos_services.ingressos_por_usuario(request.params.usuario_id)
    
    response.json(ingressos)

})

module.exports = route;
