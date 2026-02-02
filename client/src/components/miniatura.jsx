import './miniatura.css'

function Miniatura({ capa, nome, duracao, genero, faixaEtaria }) {
  const faixaEtariaTexto =
    faixaEtaria === 0 ? 'Livre' : `${faixaEtaria}+`
  const duracaoTexto = duracao != null ? `${duracao} min` : '—'

  return (
    <article className="miniatura-filme">
      <div className="miniatura-capa">
        <img
          className="miniatura-poster"
          src={`/posters/${capa}`}
        />
        <span className="miniatura-faixa-etaria">{faixaEtariaTexto}</span>
      </div>
      <div className="miniatura-info">
        <h3 className="miniatura-nome">{nome}</h3>
        <p className="miniatura-duracao">{duracaoTexto}</p>
        <p className="miniatura-genero">{genero}</p>
      </div>
    </article>
  )
}

export default Miniatura
