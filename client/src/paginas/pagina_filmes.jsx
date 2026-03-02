import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pagina_filmes.css';
import JanelaAssentos from '../componentes/janela_assentos.jsx';


function Pagina_filmes() {

    //pega a id do filme que está na url
    const { filme_id } = useParams();

    const [filme, set_filme] = useState(null);
    const [sessao_selecionada, set_sessao_selecionada] = useState(null);
    const [sessoes, set_sessoes] = useState({})

    //coleta as informações do filme utilizando a id da url
    useEffect(() => {

        fetch(`/api/filmes/${filme_id}`)
            .then((res) => {

                if (!res.ok) {
                    throw new Error('Filme não encontrado.');
                }
                return res.json();
            })
            .then((data) => {

                set_filme(data);
            })
            .catch((err) => {

                set_erro(err.message || 'Erro ao carregar filme.');
            });
    }, []);


    //coleta as sessões disponiveis do filme
    useEffect(() => {

        // Fetch as sessões disponiveis do filme escolhido na data de hoje
        fetch(`/api/sessoes/${filme_id}/${new Date().toISOString().slice(0, 10)}`)
            .then((res) => {

                return res.json();
            })
            .then((data) => {

                const sessoes_por_cinema = {}

                const cinemas_ids = [...new Set(data.map((sessao) => { return sessao.cinema_id }))]

                for (let cinema_id = 0; cinema_id < cinemas_ids.length; cinema_id++) {
                    sessoes_por_cinema[cinemas_ids[cinema_id]] = data.filter((sessao) => sessao.cinema_id == cinemas_ids[cinema_id])
                }

                console.log(sessoes_por_cinema)

                set_sessoes(sessoes_por_cinema);
            })
    }, [])

    const criar_janela_assentos = (sessao) => {

        set_sessao_selecionada(sessao);
    };

    const deletar_janela_assentos = () => {

        set_sessao_selecionada(null);
    };

    return (

        <>

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

                    {sessoes.length == 0 ? (
                        <p>Não existe sessões para este filme.</p>
                    ) : (

                        <ul className="lista-cinemas">

                            {Object.entries(sessoes).map(([cinema_index, sessao_por_cinema]) => 

                                <li key={cinema_index} className="cinema">

                                    <h3 className="cinema-nome">{sessao_por_cinema[0]["cinema_rel.nome"]}</h3>

                                    <h5 className="cinema-nome">{sessao_por_cinema[0]["cinema_rel.localizacao"]}</h5>

                                    <div className="horarios">

                                        {sessao_por_cinema.map((sessao_por_sala) => (

                                            <button
                                                key={sessao_por_sala.id}
                                                type="button"
                                                className="horario-botao"
                                                onClick={() => criar_janela_assentos(sessao_por_sala)}
                                            >
                                                {sessao_por_sala.horario}
                                            </button>
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

                <JanelaAssentos
                    sessao={sessao_selecionada}
                    horario={sessao_selecionada.horario}
                    filme={filme}
                    fechar_janela={deletar_janela_assentos}
                />)}

        </div>)

        }

        </>
    );
}

export default Pagina_filmes;