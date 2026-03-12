const express = require("express")
const route = express.Router()

const sessoes_service = require("../services/ingressos_services")
const assentos_service = require("../services/assentos_services")

//cria um ingresso com as informações fornecidas
route.post("/", async (request, response) => {

    const assentos_selecionados = request.body.assentos_selecionados

    const sessao_selecionada = request.body.sessao_selecionada

    const post_http_response = []

    for (let ingresso = 0; ingresso < Object.keys(assentos_selecionados).length; ingresso ++){

        const assento_id = await assentos_service.assento_por_local_sessao(assentos_selecionados[ingresso], sessao_selecionada)

        post_http_response.push(await sessoes_service.criar_ingresso({

            sala : sessao_selecionada.sala,

            assento : assentos_selecionados[ingresso],

            dia : sessao_selecionada.dia,

            horario : sessao_selecionada.horario,

            sessao_3d : sessao_selecionada.sessao_3d,

            sala_mega : sessao_selecionada.sala_mega,

            filme_id : sessao_selecionada.filme_id,

            cinema_id : sessao_selecionada.cinema_id,

            usuario_id : 1,

        }))

        assentos_service.modificar_assento(assento_id.id, "ocupado")

    }

    

    response.json(post_http_response)

})

module.exports = route;
