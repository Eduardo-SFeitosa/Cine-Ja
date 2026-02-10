const express = require("express")
const cors = require("cors")

const app = express()

const {sequelize} = require("./models")

const filmes_service = require("./services/filmes_services")
const cinemas_service = require("./services/cinemas_services")
const sessoes_service = require("./services/sessoes_services")

const filmes_route = require("./routes/filmes")
const assentos_route = require("./routes/assentos")
const cinemas_route = require("./routes/cinemas")
const sessoes_route = require("./routes/sessoes")

app.use(cors())
app.use(express.json())

app.use("/filmes", filmes_route)

app.use("/assentos", assentos_route)

app.use("/cinemas", cinemas_route)

app.use("/sessoes", sessoes_route)

//Função para criar o itinerario da semana para cada cinema
async function criar_itinerario() {

  //cria uma transação para ser usada nas promessas
  const transaction = await sequelize.transaction();

  
  try{

    //limpa as tabelas assentos e sessões 
    await sessoes_service.limpar_sessoes_db()

    const filmes = await filmes_service.filmes_disponiveis({ transaction })

    if (filmes.length < 15) {
      throw new Error("filmes insuficientes");
    }

    const cinemas = await cinemas_service.cinemas_disponiveis({ transaction })

    const fechamento_hora = 22
    const intervalo_minutos = 20
    //escolhe de 10 a 20 filmes para serem passados pela semana
    const limite_filmes_semanais = Math.floor(Math.random() * 10) + 10

    //seleciona 15 filmes para serem compartilhados entre todos os cinemas
    const index_selecionado = Math.floor(Math.random() * (filmes.length - limite_filmes_semanais + 1))
    const filmes_semanais = filmes.slice(index_selecionado, index_selecionado + limite_filmes_semanais)
    
    const itinerario_completo = []

    for (let numero_cinema = 0; numero_cinema < cinemas.length; numero_cinema ++){

      const cinema = cinemas[numero_cinema]

      //seleciona 4 a 8 filmes dos filmes semanais que serão os filmes desse cinema
      const quantidade_selecionada = Math.floor(Math.random() * 5) + 4
      const filmes_selecionados = [];

      while (filmes_selecionados.length < quantidade_selecionada){

        const novo_filme = filmes_semanais[Math.floor(Math.random() * filmes_semanais.length)]

        if (!filmes_selecionados.includes(novo_filme)){

          filmes_selecionados.push(novo_filme)
        }

      }

      //seleciona qual horario entre 10:00 e 15:00 o cinema vai abrir
      const horario_inicial = Math.floor(Math.random() * 6) + 10

      for(let sala_cinema = 0; sala_cinema < cinema.salas_total; sala_cinema ++){

        //for cada dia da semana
        for(let dia_semana = 0; dia_semana < 7; dia_semana ++){

          //cria e ajusta o horario inicial e dia
          const horario_sessao = new Date()
          horario_sessao.setHours(horario_inicial, 0, 0, 0)
          horario_sessao.setDate(horario_sessao.getDate() + dia_semana)

          //escolhe um filme aleatorio para começar a rotação de filmes
          let index_filme = Math.floor(Math.random() * filmes_selecionados.length)

          //enquanto horario da sessão for menor que 22:00(hora de fechar) o codigo adiciona sessões
          while (horario_sessao.getHours() >= horario_inicial && horario_sessao.getHours() <= fechamento_hora){

            if (index_filme >= filmes_selecionados.length){
              index_filme = 0
            }

            const filme_atual = filmes_selecionados[index_filme]

            const hora_atual = String(horario_sessao.getHours()).padStart(2, "0")
            const minutos_atual = String(horario_sessao.getMinutes()).padStart(2, "0")

            itinerario_completo.push(

              sessoes_service.criar_sessao({
                sala : sala_cinema,
                //coloca o dia como (ano/mes/dia)
                dia : horario_sessao.toISOString().slice(0, 10),
                horario : `${hora_atual}:${minutos_atual}`,
                //20% de chance da sessão ser em 3D
                sessao_3d : Math.random() < 0.2 ? 1 : 0,
                sala_mega : sala_cinema <= cinema.salas_mega,
                filme_id : filme_atual.id,
                cinema_id : cinema.id
              }, { transaction })
            )

            horario_sessao.setMinutes(horario_sessao.getMinutes() + filme_atual.duracao + intervalo_minutos)

            index_filme += 1

          }
        }
      }
    }

      //cria todas as sessões de uma vez
      await Promise.all(itinerario_completo)

      //encerra a transação caso as sessões tenham sido criadas
      await transaction.commit()

  }catch (error) {
    
    await transaction.rollback();
    throw error;
  }

  
}



//inicializa a base de dados mysql quando o servidor começa o listen
sequelize.sync( { alter: true } ).then(() => {

  //cria o servidor no localhost://5000

  app.listen(process.env.port || 5000, async () => {

    console.log("servidor funcionando")
    
  });
});
