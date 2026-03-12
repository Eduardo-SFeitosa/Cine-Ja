const express = require("express")
const route = express.Router()

const sessoes_service = require("../services/ingressos_services")

//cria um ingresso com as informações fornecidas
route.post("/", async (request, response) => {

    const assentos_selecionados = request.body.assentos_selecionados

    const sessao_selecionada = request.body.sessao_selecionada

    const post_http_response = []

    for (let ingresso = 0; ingresso < assentos_selecionados.length; ingresso ++){

        post_http_response.push(await sessoes_service.criar_ingresso({

            sala : sessao_selecionada.sala,

            assento : assentos_selecionados[ingresso],

            dia : sessao_selecionada.dia,

            horario : sessao_selecionada.horario,

            sessao_3d : sessao_selecionada.sessao_3d,

            sala_mega : sessao_selecionada.sala_mega,

            filme_id : sessao_selecionada.filme_id,

            cinema_id : sessao_selecionada.cinema_id,

            usuario_id : null,

        }))

    }



    response.json(post_http_response)
})

module.exports = route;
