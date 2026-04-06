const express = require("express")
const route = express.Router()
const { sequelize } = require("../models")


const ingressos_services = require("../services/ingressos_services")
const assentos_service = require("../services/assentos_services")

route.post("/", async (request, response) => {

    const transacao = await sequelize.transaction()

    try{

        const assentos_selecionados = request.body.assentos_selecionados

        const sessao_selecionada = request.body.sessao_selecionada

        const post_http_response = []
        

        for (let ingresso = 0; ingresso < Object.keys(assentos_selecionados).length; ingresso ++){

            const assento_id = await assentos_service.assento_por_local_sessao(assentos_selecionados[ingresso], sessao_selecionada, { transacao })

            post_http_response.push(await ingressos_services.criar_ingresso({

                sala : sessao_selecionada.sala,

                assento : assentos_selecionados[ingresso],

                dia : sessao_selecionada.dia,

                horario : sessao_selecionada.horario,

                sessao_3d : sessao_selecionada.sessao_3d,

                sala_mega : sessao_selecionada.sala_mega,

                filme_id : sessao_selecionada.filme_id,

                cinema_id : sessao_selecionada.cinema_id,

                usuario_id : 1,

            }, { transacao }))

            assentos_service.modificar_assento(assento_id.id, "ocupado", { transacao })

        }

        await transacao.commit()

        response.status(200).json({
        success: true,
        message: "ingresso comprado"
        })

    }

    catch(error){

        await transacao.rollback()

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
