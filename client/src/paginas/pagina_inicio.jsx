import { useState, useEffect } from 'react'
import './pagina_inicio.css'
import Miniatura from '../componentes/miniatura.jsx'

function Pagina_inicio() {

  const [filmes, setFilmes] = useState([])

  const [carregando, setCarregando] = useState(true)


  useEffect(() => {

    {/* tenta receber os filmes disponiveis */ }

    fetch("/api/sessoes")

      .then(res => res.json())

      .then(data => {
        setFilmes(Array.isArray(data) ? data : [])
        setCarregando(false)
      })

      .catch(() => setCarregando(false))
  }, [])


  return (

    <div className="tela-inicial">

      <header className="cabecalho">
        <h1>Cine Já</h1>
      </header>

      <main className="conteudo">
        {carregando ? (
          <p className="mensagem">Carregando filmes...</p>
        ) : filmes.length === 0 ? (
          <p className="mensagem">Nenhum filme encontrado.</p>
        ) : (

          <section className="lista-filmes">

            {/* Cria uma miniatura para cada filme que a api responder */}

            {filmes.map((filme) => (
              <Miniatura
                key={filme["filme_rel.id"]}
                id={filme["filme_rel.id"]}
                capa={filme["filme_rel.poster_url"]}
                nome={filme["filme_rel.titulo"]}
                duracao={filme["filme_rel.duracao"]}
                genero={filme["filme_rel.genero"]}
                faixaEtaria={filme["filme_rel.classificacao"]}
              />
            ))}

          </section>
        )}

      </main>

    </div>
  )
}

export default Pagina_inicio
