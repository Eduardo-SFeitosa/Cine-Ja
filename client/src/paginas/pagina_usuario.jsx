import { useEffect, useState } from 'react';
import './pagina_usuario.css';
import { useParams } from 'react-router-dom';
import Cabecalho from '../componentes/cabecalho';

function Pagina_usuario() {

    const { usuario_id } = useParams();

    const [pedidos, set_pedidos] = useState(null);
    const [carregando, set_carregando] = useState(true);

    useEffect(() => {

        let cancelado = false;

        set_carregando(true);

        fetch(`/api/pedidos/${usuario_id}`)

            .then((resposta) => {

                if (!resposta.ok) {

                    throw new Error("pedidos do usuario nao foram recebidos");

                }

                return resposta.json();

            })

            .then((lista) => {

                if (!cancelado) {

                    set_pedidos(Array.isArray(lista) ? lista : []);

                }

            })

            .catch(() => {

                if (!cancelado) {

                    set_pedidos([]);

                }

            })

            .finally(() => {

                if (!cancelado) {

                    set_carregando(false);

                }

            });

        return () => { cancelado = true; };

    }, [usuario_id]);


    return (

        <div className="pagina-usuario">

            < Cabecalho />

            <div className="informacoes">

                <span className="nome-de-usuario"> Usuário #{usuario_id} </span>

            </div>



            <div className="ingressos">

                {carregando ? (

                    <h2>Carregando pedidos…</h2>

                ) : !pedidos || pedidos.length === 0 ? (

                    <h2>Usuário não tem nenhum pedido</h2>

                ) : (

                    pedidos.map((pedido) => (

                        <section key={pedido.id} className="pedido-grupo">

                            <header className="pedido-grupo-cabecalho">

                                <h2>Pedido #{pedido.id}</h2>

                                <p className="pedido-meta">

                                    <span>{pedido.situacao}</span>

                                    {pedido.validade ? (

                                        <span> · válido até {new Date(pedido.validade).toLocaleString()}</span>

                                    ) : null}

                                </p>

                            </header>

                            <ul className="lista-ingressos-pedido">

                                {(pedido.ingressos || []).map((ing) => (

                                    <li key={ing.id} className="ingresso-item">

                                        <p className="ingresso-titulo">

                                            {ing.filme_rel?.titulo ?? "Filme"}

                                        </p>

                                        <p className="ingresso-detalhes">

                                            {ing.cinema_rel?.nome ?? "Cinema"}

                                            {ing.dia} às {ing.horario}

                                            Sala {ing.sala} · Assento {ing.assento}

                                            {ing.sessao_3d ? " 3D" : ""}

                                            {ing.sala_mega ? " Mega" : ""}

                                            {ing.situacao}

                                        </p>

                                    </li>

                                ))}

                            </ul>

                        </section>

                    ))

                )}

            </div>


        </div>

    );

}

export default Pagina_usuario;
