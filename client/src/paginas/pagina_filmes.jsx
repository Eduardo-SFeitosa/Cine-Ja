import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pagina_filmes.css';
import JanelaAssentos from '../componentes/janela_assentos.jsx';

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

                    {Object.keys(sessoes).length == 0 ? (
                        
                        <p>Não existe sessões para este filme.</p>

                    ) : (

                        <ul className="lista-cinemas">

                            {Object.entries(sessoes).map(([cinema_index, sessao_por_cinema]) => 

                                <li key={cinema_index} className="cinema">

                                    <h3 className="cinema-nome">cinema {sessao_por_cinema[Object.keys(sessao_por_cinema)[0]][0]["cinema_rel.nome"]}</h3>

                                    <h5 className="cinema-nome">rua placeholder {sessao_por_cinema[Object.keys(sessao_por_cinema)[0]][0]["cinema_rel.localizacao"]}</h5>

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

                <JanelaAssentos
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