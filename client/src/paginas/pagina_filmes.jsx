import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './pagina_filmes.css';
import JanelaAssentos from '../componentes/janela_assentos.jsx';

// Fetch as sessões disponiveis 
function obterSessoesPorFilme(titulo) {

    const base = [
        {
            id: 1,
            cinema: 'Cinema teste',
            horarios: ['14:00', '17:30', '21:00'],
        },
    ];

    // Por enquanto, todos os filmes usam a mesma lista
    return base.map((sessao) => ({
        ...sessao,
        filmeTitulo: titulo,
    }));
}

function Pagina_filmes() {

    //pega o titulo do filme que está na url
    const { titulo } = useParams();

    const [filme, setFilme] = useState(null);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);
    const [sessaoSelecionada, setSessaoSelecionada] = useState(null);
    const [horarioSelecionado, setHorarioSelecionado] = useState(null);

    useEffect(() => {

        setCarregando(true);

        setErro(null);

        fetch(`/api/filmes/${encodeURIComponent(titulo)}`)
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
    }, [titulo]);

    const sessoes = obterSessoesPorFilme(titulo);

    if (carregando) {
        return (
            <div className="pagina-filme pagina-filme-estado">
                <p>Carregando filme...</p>
            </div>
        );
    }

    if (erro) {
        return (
            <div className="pagina-filme pagina-filme-estado">
                <p>{erro}</p>
            </div>
        );
    }

    if (!filme) {
        return (
            <div className="pagina-filme pagina-filme-estado">
                <p>Filme não encontrado.</p>
            </div>
        );
    }

    const faixaEtariaTexto = filme.classificacao == 0 ? "L" : filme.classificacao;

    const duracaoTexto = (filme.duracao);

    const dataLancamento = (filme.lancamento);

    const handleCliqueHorario = (sessao, horario) => {
        setSessaoSelecionada(sessao);
        setHorarioSelecionado(horario);
    };

    const fecharJanelaAssentos = () => {
        setSessaoSelecionada(null);
        setHorarioSelecionado(null);
    };

    return (
        <div className="pagina-filme">
            <header className="pagina-filme-cabecalho">
                <h1 className="pagina-filme-titulo">{filme.titulo}</h1>
                <div className="pagina-filme-meta">
                    <span className="pagina-filme-faixa-etaria">{faixaEtariaTexto}</span>
                    <span className="pagina-filme-duracao">{duracaoTexto}</span>
                    <span className="pagina-filme-genero">{filme.genero}</span>
                </div>
            </header>

            <main className="pagina-filme-conteudo">
                <section className="pagina-filme-principal">
                    <div className="pagina-filme-poster-wrapper">
                        <img
                            className="pagina-filme-poster"
                            src={`/posters/${filme.poster_url}`}
                            alt={`Poster de ${filme.titulo}`}
                        />
                    </div>

                    <div className="pagina-filme-info">
                        <p>
                            <strong>Diretor:</strong> {filme.diretor}
                        </p>
                        <p>
                            <strong>Atores:</strong> {filme.atores}
                        </p>
                        <p>
                            <strong>Lançamento:</strong> {dataLancamento}
                        </p>
                        <p className="pagina-filme-descricao">
                            <strong>Descrição:</strong> {filme.descricao}
                        </p>
                    </div>
                </section>

                <section className="pagina-filme-sessoes">

                    <h2>Cinemas e horários</h2>

                    {sessoes.length === 0 ? (
                        <p>Não há sessões cadastradas para este filme.</p>
                    ) : (

                        <ul className="pagina-filme-lista-cinemas">

                            {sessoes.map((sessao) => (

                                <li key={sessao.id} className="pagina-filme-cinema">

                                    <h3 className="pagina-filme-cinema-nome">{sessao.cinema}</h3>

                                    <div className="pagina-filme-horarios">

                                        {sessao.horarios.map((horario) => (

                                            <button
                                                key={horario}
                                                type="button"
                                                className="pagina-filme-horario-botao"
                                                onClick={() => handleCliqueHorario(sessao, horario)}
                                            >
                                                {horario}
                                            </button>
                                        ))}
                                    </div>
                                </li>
                            ))}
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