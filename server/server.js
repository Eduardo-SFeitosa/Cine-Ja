const express = require("express")
const cors = require("cors")
const cron = require("node-cron")

const app = express()

const {sequelize} = require("./models")

const itinerario_services = require("./services/itinerario_services")
const sessoes_services = require("./services/sessoes_services")
const usuario_services = require("./services/usuarios_services")

const filmes_route = require("./routes/filmes")
const assentos_route = require("./routes/assentos")
const cinemas_route = require("./routes/cinemas")
const sessoes_route = require("./routes/sessoes")
const ingressos_route = require("./routes/ingressos")
const usuarios_route = require("./routes/usuarios")
const pedidos_route = require("./routes/pedidos")
const itinerario_route = require("./routes/itinerario")

app.use(cors())
app.use(express.json())

app.use("/filmes", filmes_route)

app.use("/assentos", assentos_route)

app.use("/cinemas", cinemas_route)

app.use("/sessoes", sessoes_route)

app.use("/ingressos", ingressos_route)

app.use("/pedidos", pedidos_route)

app.use("/usuarios", usuarios_route)

app.use("/itinerario", itinerario_route)

async function iniciarServidorComBanco(tentativa = 1) {

  const maxTentativas = 10;
  const atrasoMs = 5000;

  try {

    await sequelize.sync({ alter: true })

    const porta = process.env.PORT || 3000;
    app.listen(porta, async () => {

      await checar_itinerario()

      console.log("itinerario checado")

      await checar_usuario()

      console.log("usuario checado")

      console.log(`servidor funcionando na porta ${porta}`)


      //Atualizar itinerario

      cron.schedule('*/1 * * * *', async () => {
        console.log('callback fired');
        console.log('Running a task every minute');
      }, {recoverMissedExecutions: true})

    })

  } catch (error) {
    if (tentativa >= maxTentativas) {
      console.error("Não foi possível conectar ao banco após várias tentativas:", error)
      process.exit(1);
    }

    console.warn(
      `Falha ao conectar ao banco (tentativa ${tentativa}/${maxTentativas}). ` +
      `Tentando novamente em ${atrasoMs / 1000} segundos...`
    );

    setTimeout(() => iniciarServidorComBanco(tentativa + 1), atrasoMs);
  }

}

async function checar_itinerario() {

  const sessoes_disponiveis = await sessoes_services.sessoes_existentes()

  if (sessoes_disponiveis.length <= 0) {

      await itinerario_services.criar_itinerario()

      console.log("itinerario criado")

  }

  return true

}

async function checar_usuario() {

  await usuario_services.checar_usaurio_base()

  console.log("usuario base checado")

  return true

}

iniciarServidorComBanco();



