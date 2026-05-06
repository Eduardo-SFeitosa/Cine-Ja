import { useEffect, useState } from 'react';
import './pagina_usuario.css';
import { useParams } from 'react-router-dom';
import Cabecalho from '../componentes/cabecalho';

import Pagina_de_pagamento from '../componentes/janela_pagamento';

function Pagina_usuario() {

    const { usuario_id } = useParams();

    const [pedidos, set_pedidos] = useState(null);
    const [carregando, set_carregando] = useState(true);
    const [pedido_pagando_id, set_pedido_pagando_id] = useState(null);
    const [erro_pagamento, set_erro_pagamento] = useState(null);

    const carregar_pedidos = (mostrar_carregamento = true) => {

        if (mostrar_carregamento) {

            set_carregando(true);

        }

        return fetch(`/api/pedidos/${usuario_id}`)

            .then((resposta) => {

                if (!resposta.ok) {

                    throw new Error("pedidos do usuario nao foram recebidos");

                }

                return resposta.json();

            })

            .then((lista) => {

                set_pedidos(Array.isArray(lista) ? lista : []);

            })

            .catch(() => {

                set_pedidos([]);

            })

            .finally(() => {

                if (mostrar_carregamento) {

                    set_carregando(false);

                }

            });

    };

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

    const pagar_pedido = (pedido_id) => {

        set_erro_pagamento(null);

        set_pedido_pagando_id(pedido_id);

        fetch(`/api/pedidos/${pedido_id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
            },

        })

            .then(async (resposta) => {

                const corpo = await resposta.json().catch(() => ({}));

                if (!resposta.ok) {

                    throw new Error(corpo.message || "Não foi possível pagar o pedido");

                }

                return corpo;

            })

            .then(() => carregar_pedidos(false))

            .catch((e) => {

                set_erro_pagamento(e.message || "Erro ao pagar");

            })

            .finally(() => {

                set_pedido_pagando_id(null);

            });

    };

    return (

        <div className="pagina-usuario">

            < Cabecalho />

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

                                    {pedido.situacao == "aguardando pagamento" ?
                                    <span> · válido até {new Date(pedido.validade).toLocaleString()}</span>
                                    :<></>}

                                </p>

                            </header>

                            <ul className="lista-ingressos-pedido">

                                {(pedido.ingressos || []).map((ingresso) => (

                                    <li key={ingresso.id} className="ingresso-item">

                                        <p className="ingresso-titulo">

                                            {ingresso.filme_rel?.titulo ?? "Filme"}

                                        </p>

                                        <p className="ingresso-detalhes">

                                            Cinema: {ingresso.cinema_rel?.nome ?? "Cinema"}

                                            <br />

                                            {new Date(ingresso.dia).toLocaleString()} às {ingresso.horario.replace(":00", "")}

                                            <br />

                                            Sala {ingresso.sala} · Assento {ingresso.assento}

                                            {ingresso.sessao_3d ? " 3D" : ""}

                                            {ingresso.sala_mega ? " Mega" : ""}

                                        </p>

                                    </li>

                                ))}

                            </ul>



                            {pedido.situacao == "aguardando pagamento" ? 
                            
                            <button className="pagar" onClick={() => set_pedido_pagando_id(pedido.id)}>pagar pedido</button>
                            
                            :<></>}

                            

                        </section>

                    ))

                )}

            </div>

            {pedido_pagando_id != null ? 
            
            <Pagina_de_pagamento
            
            >

            </Pagina_de_pagamento>:
            
            <></>}


        </div>

    );

}

export default Pagina_usuario;
