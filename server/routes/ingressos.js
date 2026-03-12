const express = require("express")
const route = express.Router()
const { sequelize } = require("../models")


const sessoes_service = require("../services/ingressos_services")
const assentos_service = require("../services/assentos_services")

//cria um ingresso com as informações fornecidas e coloca os assentos como ocupados
route.post("/", async (request, response) => {

    //se uma função da da base de dados não funcionar a transação ira desfazer as outras funcões
    const transacao = await sequelize.transaction()

    try{

        const assentos_selecionados = request.body.assentos_selecionados

        const sessao_selecionada = request.body.sessao_selecionada

        const post_http_response = []
        

        for (let ingresso = 0; ingresso < Object.keys(assentos_selecionados).length; ingresso ++){

            const assento_id = await assentos_service.assento_por_local_sessao(assentos_selecionados[ingresso], sessao_selecionada, { transacao })

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

module.exports = route;
