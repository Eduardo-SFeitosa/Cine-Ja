import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './pagina_filmes.css';
import Cabecalho from '../componentes/cabecalho.jsx';
import Janela_assentos from '../componentes/janela_assentos.jsx';
import { obterUsuarioLogado } from '../utils/auth.js';

const organizar_sessoes_por_sala = (sessoes) => {

    const cinemas_ids = [...new Set(sessoes.map((sessao) => { return sessao.cinema_id }))]

    const sessoes_por_cinema_sala = {}

    for (let cinema =  0; cinema < cinemas_ids.length; cinema ++){

        sessoes_por_cinema_sala[cinemas_ids[cinema]] = {}

        for (let sessao = 0; sessao < sessoes.length; sessao ++){

            if (sessoes[sessao].cinema_id == cinemas_ids[cinema]){

                if (!(sessoes[sessao].sala in sessoes_por_cinema_sala[cinemas_ids[cinema]])){

                    sessoes_por_cinema_sala[cinemas_ids[cinema]][sessoes[sessao].sala] = []

                }

                sessoes_por_cinema_sala[cinemas_ids[cinema]][sessoes[sessao].sala].push(sessoes[sessao])

            }

        }

    }

    return sessoes_por_cinema_sala

}


function Pagina_filmes() {

    //pega a id do filme que está na url
    const { filme_id } = useParams();

    const [filme, set_filme] = useState(null);
    const [sessao_selecionada, set_sessao_selecionada] = useState(null);
    const [sessoes, set_sessoes] = useState({})
    const [favoritos_por_cinema, set_favoritos_por_cinema] = useState({})
    const [favorito_carregando, set_favorito_carregando] = useState(null)
    const [usuario, setUsuario] = useState(null)
    const navigate = useNavigate()

    //coleta as informações do filme utilizando a id da url
    useEffect(() => {

        fetch(`/api/filmes/${filme_id}`)
            .then((resposta) => {

                if (!resposta.ok) {
                    throw new Error('Filme não encontrado.');
                }
                return resposta.json();
            })
            .then((data) => {

                set_filme(data);
            })
    }, []);


    //coleta as sessões disponiveis do filme
    useEffect(() => {

        // Fetch as sessões disponiveis do filme escolhido na data de hoje
        fetch(`/api/sessoes/${filme_id}/${new Date().toISOString().slice(0, 10)}`)
            .then((response) => {

                return response.json();
                
            })

            .then((response) => {

                set_sessoes(organizar_sessoes_por_sala(response));
            })
    }, [])

    useEffect(() => {
      const usuarioLogado = obterUsuarioLogado()
      setUsuario(usuarioLogado)

      if (!usuarioLogado) {
        set_favoritos_por_cinema({})
        return
      }

      fetch(`/api/cinema-favorito/usuario/${usuarioLogado.id}`)
        .then((response) => response.json())
        .then((favoritos) => {
          const mapa = {}

          for (const favorito of favoritos) {
            mapa[favorito.cinema_id] = favorito.id
          }

          set_favoritos_por_cinema(mapa)
        })
        .catch(() => set_favoritos_por_cinema({}))
    }, [])

    const alternar_favorito = async (cinema_id) => {
        if (!usuario) {
            navigate('/login')
            return
        }

        if (favorito_carregando === cinema_id) return

        set_favorito_carregando(cinema_id)

        const cinema_id_numero = Number(cinema_id)
        const favorito_id = favoritos_por_cinema[cinema_id_numero]

        try {

            if (favorito_id) {

                const response = await fetch(`/api/cinema-favorito/${favorito_id}`, {
                    method: "DELETE",
                })

                if (!response.ok) {
                    throw new Error("Erro ao remover favorito")
                }

                set_favoritos_por_cinema((anterior) => {

                    const atualizado = { ...anterior }
                    delete atualizado[cinema_id_numero]
                    return atualizado
                })

            } else {

                const response = await fetch("/api/cinema-favorito", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        usuario_id: usuario.id,
                        cinema_id: cinema_id_numero,
                    }),
                })

                if (!response.ok) {
                    throw new Error("Erro ao favoritar cinema")
                }

                const favorito = await response.json()

                set_favoritos_por_cinema((anterior) => ({
                    ...anterior,
                    [cinema_id_numero]: favorito.id,
                }))
            }

        } catch (erro) {
            console.error(erro)
        } finally {
            set_favorito_carregando(null)
        }
    }

    const criar_janela_assentos = (sessao) => {

        set_sessao_selecionada(sessao);
    };

    const deletar_janela_assentos = () => {

        set_sessao_selecionada(null);
    };

    return (

        <>

        <Cabecalho />

        {   filme == null ? (<>

            <h1>Filme não existe</h1>

            </>) :

        (<div className="pagina-filmes">

            <header className="cabecalho">

                <h1 className="titulo">{filme.titulo}</h1>

                <div className="detalhes">

                    <span className="classificacao">{filme.classificacao} anos</span>
                    <span className="duracao">{filme.duracao} minutos</span>
                    <span className="genero">{filme.genero}</span>
                    
                </div>
            </header>

            <main className="conteudo">

                <section className="principal">

                    <div className="poster-wrapper">

                        <img
                            className="poster"
                            src={`/posters/${filme.poster_url}`}
                            alt={`Poster de ${filme.titulo}`}
                        />
                    </div>

                    <div className="info">

                        <p>Diretor: {filme.diretor}</p>

                        <p>Atores: {filme.atores}</p>

                        <p>Lançamento: {filme.lancamento}</p>

                        <p>Descrição: {filme.descricao}</p>

                    </div>
                </section>

                <section className="sessoes">

                    <h2>Sessões</h2>

                    {Object.keys(sessoes).length == 0 ? (
                        
                        <p>Não existe sessões para este filme.</p>

                    ) : (

                        <ul className="lista-cinemas">

                            {Object.entries(sessoes)
                                .sort(([cinemaIdA], [cinemaIdB]) => {
                                    const aIsFavorite = Number(cinemaIdA) in favoritos_por_cinema;
                                    const bIsFavorite = Number(cinemaIdB) in favoritos_por_cinema;
                                    
                                    if (aIsFavorite && !bIsFavorite) return -1;
                                    if (!aIsFavorite && bIsFavorite) return 1;
                                    return 0;
                                })
                                .map(([cinema_index, sessao_por_cinema]) => 

                                <li key={cinema_index} className="cinema">

                                    <div className="cinema-cabecalho">

                                        <div className="cinema-titulos">

                                            <h3 className="cinema-nome">cinema {sessao_por_cinema[Object.keys(sessao_por_cinema)[0]][0]["cinema_rel.nome"]}</h3>

                                            <h5 className="cinema-local">rua placeholder {sessao_por_cinema[Object.keys(sessao_por_cinema)[0]][0]["cinema_rel.localizacao"]}</h5>

                                        </div>

                                        { usuario ? 
                                        <button
                                            type="button"
                                            className={`favorito-caixa ${favoritos_por_cinema[Number(cinema_index)] ? "favorito-caixa--ativo" : ""}`}
                                            onClick={() => alternar_favorito(cinema_index)}
                                            disabled={favorito_carregando === cinema_index}
                                            aria-label={favoritos_por_cinema[Number(cinema_index)] ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                                            title={usuario ? (favoritos_por_cinema[Number(cinema_index)] ? "Remover dos favoritos" : "Adicionar aos favoritos") : "Faça login para favoritar"}
                                        />: null}

                                        

                                    </div>

                                    <div className="salas">

                                        {Object.entries(sessao_por_cinema).map(([sala_index, sessao_por_sala]) => (

                                            <>

                                            <h2>sala {sessao_por_sala[0].sala + 1}</h2>

                                            <div className="horarios">

                                            {sessao_por_sala.map(sala => {

                                                return (<button
                                                key={sala.sala_id}
                                                type="button"
                                                className="horario-botao"
                                                onClick={() => criar_janela_assentos(sala)}
                                                >
                                                    {sala.horario}
                                                </button>)

                                            })}   

                                            </div>
                                            
                                            <br />                                     

                                            </>
                                        ))}
                                    </div>
                                </li>

                            )
                            }
                        </ul>
                    )}
                </section>
            </main>


            { sessao_selecionada && (

                <Janela_assentos
                    sessao={sessao_selecionada}
                    horario={sessao_selecionada.horario}
                    sala_numero={sessao_selecionada.sala}
                    filme={filme}
                    fechar_janela={deletar_janela_assentos}
                />)}

        </div>)

        }

        </>
    );
}

export default Pagina_filmes;