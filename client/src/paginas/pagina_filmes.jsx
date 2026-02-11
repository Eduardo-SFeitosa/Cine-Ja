import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pagina_filmes.css';
import JanelaAssentos from '../componentes/janela_assentos.jsx';


function Pagina_filmes() {

    //pega a id do filme que está na url
    const { filme_id } = useParams();

    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);
    const [sessoes, setSessoes] = useState({})

    //coleta as informações do filme utilizando a id da url
    useEffect(() => {

        setCarregando(true);

        setErro(null);

        fetch(`/api/filmes/${filme_id}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Filme não encontrado.');
                }
                return res.json();
            })
            .then((data) => {
                setFilme(data);
                setCarregando(false);
            })
            .catch((err) => {
                setErro(err.message || 'Erro ao carregar filme.');
                setCarregando(false);
            });
    }, []);


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

                setSessoes(sessoes_por_cinema);
            })
    }, [])


    if (carregando) {
        return (
            <div className="pagina-filme estado">
                <p>Carregando filme...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="pagina-filme estado">
                <p>{erro}</p>
            </div>
        );
    }

    if (!filme) {
        return (
            <div className="pagina-filme estado">
                <p>Filme não encontrado.</p>
            </div>
        );
    }

    const handleCliqueHorario = (horario) => {
        setHorarioSelecionado(horario);
    };

    const fecharJanelaAssentos = () => {
        setHorarioSelecionado(null);
    };

    return (
        <div className="pagina-filme">
            <header className="cabecalho">
                <h1 className="titulo">{filme.titulo}</h1>
                <div className="meta">
                    <span className="faixa-etaria">{filme.classificacao} anos</span>
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
                        <p>
                            <strong>Diretor:</strong> {filme.diretor}
                        </p>
                        <p>
                            <strong>Atores:</strong> {filme.atores}
                        </p>
                        <p>
                            <strong>Lançamento:</strong> {filme.lancamento}
                        </p>
                        <p className="descricao">
                            <strong>Descrição:</strong> {filme.descricao}
                        </p>
                    </div>
                </section>

                <section className="sessoes">

                    <h2>Cinemas e horários</h2>

                    {sessoes.length === 0 ? (
                        <p>Não há sessões cadastradas para este filme.</p>
                    ) : (

                        <ul className="lista-cinemas">

                            {Object.entries(sessoes).map(([cinema_index, sessao_por_cinema]) => 

                                <li key={cinema_index} className="cinema">

                                    {console.log(sessao_por_cinema)}

                                    <h3 className="cinema-nome">{sessao_por_cinema[0]["cinema_rel.nome"]}</h3>

                                    <h5 className="cinema-nome">{sessao_por_cinema[0]["cinema_rel.localizacao"]}</h5>

                                    <div className="horarios">

                                        {sessao_por_cinema.map((horario) => (

                                            <button
                                                key={horario.id}
                                                type="button"
                                                className="horario-botao"
                                                onClick={() => handleCliqueHorario(horario.id)}
                                            >
                                                {horario.horario}
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


            {sessaoSelecionada && horarioSelecionado && (
                <JanelaAssentos
                    sessao={sessaoSelecionada}
                    horario={horarioSelecionado}
                    filme={filme}
                    onClose={fecharJanelaAssentos}
                />)}

        </div>
    );
}

export default Pagina_filmes;