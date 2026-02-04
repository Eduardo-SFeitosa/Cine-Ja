import { useState, useEffect } from 'react'
import './inicio.css'
import Miniatura from './components/miniatura.jsx'

function Pagina_inicio() {

  const [filmes, setFilmes] = useState([])

  const [carregando, setCarregando] = useState(true)


  useEffect(() => {

    {/* Se comunica com a api e tenta receber os filmes disponiveis */ }

    fetch("/api/filmes")

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
                key={filme.id}
                capa={filme.poster_url}
                nome={filme.titulo}
                duracao={filme.duracao}
                genero={filme.genero}
                faixaEtaria={filme.classificacao}
              />
            ))}

          </section>
        )}

      </main>

    </div>
  )
}

export default Pagina_inicio
