const { assentos } = require("../models");

async function assentos_por_sessao_id(sessao_id, opcoes = {}) {

  return assentos.findAll({
         where: { 
            sessao_id : sessao_id 
            }, 
        raw: true  
    },opcoes)
}

async function modificar_assento(assento_id ,situacao_atualizada, opcoes ={}){

    const assento_escolhido = assentos.findOne({where : {id : assento_id}}, opcoes)

    assento_escolhido.situacao = situacao_atualizada

    await assento_escolhido.save()
}

async function popular_sessao(sessao_id, opcoes = {}) {

    const assentos_array = [];
    const colunas = 7;
    const linhas = 9;

    for (let linha = 0; linha < linhas; linha++) {

        for (let coluna = 0; coluna < colunas; coluna++){

            assentos_array.push({
                //transforma a linha em letra utilizando CharCode onde 97 = A e o alfabeto segue em diante
                local: `${String.fromCharCode(65 + linha)}${coluna + 1}`,
                situacao: "livre",
                sessao_id: sessao_id
            });
        }
        
    }

    //cria todas os assentos de uma vez
    return assentos.bulkCreate(assentos_array, opcoes)
}

async function limpar_assentos_db(opcoes = {}) {
    
    await assentos.destroy({
        where: {},
        truncate: false,
        cascade: true
      }, opcoes);
}



module.exports = {
    assentos_por_sessao_id,
    modificar_assento,
    popular_sessao,
    limpar_assentos_db
}
