const { cinema_favorito } = require("../models");

async function criar_cinema_favorito(informacoes, opcoes = {}) {

  return cinema_favorito.create(informacoes, opcoes)

}

async function modificar_cinema_favorito(cinema_favorito_id, novas_informacoes, opcoes = {}) {

  const registro = await cinema_favorito.findOne({
    where: { id: cinema_favorito_id },
    ...opcoes
  })

  if (!registro) return null

  if (novas_informacoes.usuario_id !== undefined) {
    registro.usuario_id = novas_informacoes.usuario_id
  }

  if (novas_informacoes.cinema_id !== undefined) {
    registro.cinema_id = novas_informacoes.cinema_id
  }

  await registro.save(opcoes)

  return registro

}

async function deletar_cinema_favorito(cinema_favorito_id, opcoes = {}) {

  return cinema_favorito.destroy({
    where: { id: cinema_favorito_id },
    ...opcoes
  })

}

module.exports = {
  criar_cinema_favorito,
  modificar_cinema_favorito,
  deletar_cinema_favorito,
}
