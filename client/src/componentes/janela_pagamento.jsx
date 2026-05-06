import { useState } from "react";

import "./janela_pagamento.css";

const metodos = {
    cartao: "cartao",
    qr: "qr",
};

function so_digitos(texto) {

    return (texto || "").replace(/\D/g, "");

}

/** Validação simples do algoritmo de Luhn para número do cartão */
function cartao_valido_por_luhn(numero) {

    const d = so_digitos(numero);

    if (d.length < 13 || d.length > 19) {

        return false;

    }

    let soma = 0;

    let alternar = false;

    for (let i = d.length - 1; i >= 0; i--) {

        let n = parseInt(d[i], 10);

        if (alternar) {

            n *= 2;

            if (n > 9) {

                n -= 9;

            }

        }

        soma += n;

        alternar = !alternar;

    }

    return soma % 10 === 0;

}

function formatar_numero_cartao(valor) {

    const d = so_digitos(valor).slice(0, 19);

    const partes = [];

    for (let i = 0; i < d.length; i += 4) {

        partes.push(d.slice(i, i + 4));

    }

    return partes.join(" ");

}

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

function Pagina_de_pagamento({ informacoes_do_ingresso }) {

    const [metodo_pagamento, set_metodo_pagamento] = useState(null);

    const [modal_cartao_aberto, set_modal_cartao_aberto] = useState(false);

    const [numero_cartao, set_numero_cartao] = useState("");

    const [nome_titular, set_nome_titular] = useState("");

    const [validade, set_validade] = useState("");

    const [cvv, set_cvv] = useState("");

    const [mensagem_validacao, set_mensagem_validacao] = useState(null);

    const [validacao_ok, set_validacao_ok] = useState(false);

    const ingresso = informacoes_do_ingresso ?? {};

    const escolher_cartao = () => {

        set_metodo_pagamento(metodos.cartao);
        set_modal_cartao_aberto(true);
        set_mensagem_validacao(null);
        set_validacao_ok(false);

    };

    const escolher_qr = () => {

        set_metodo_pagamento(metodos.qr);
        set_modal_cartao_aberto(false);
        set_mensagem_validacao(null);
        set_validacao_ok(false);

    };

    const fechar_modal_cartao = () => {

        set_modal_cartao_aberto(false);

    };

    const ao_mudar_validade = (e) => {

        const v = so_digitos(e.target.value).slice(0, 4);

        if (v.length <= 2) {

            set_validade(v);

        } else {

            set_validade(`${v.slice(0, 2)}/${v.slice(2)}`);

        }

    };

    const validar_cartao = (e) => {

        e.preventDefault();

        set_mensagem_validacao(null);

        const num = so_digitos(numero_cartao);

        const titular = nome_titular.trim();

        const val = validade.replace(/\D/g, "");

        const codigo = so_digitos(cvv);

        if (num.length < 13) {

            set_mensagem_validacao("Informe o número completo do cartão.");

            return;

        }

        if (!cartao_valido_por_luhn(num)) {

            set_mensagem_validacao("Número do cartão inválido.");

            return;

        }

        if (titular.length < 3) {

            set_mensagem_validacao("Informe o nome como está no cartão.");

            return;

        }

        if (val.length !== 4) {

            set_mensagem_validacao("Validade no formato MM/AA.");

            return;

        }

        const mes = parseInt(val.slice(0, 2), 10);

        if (mes < 1 || mes > 12) {

            set_mensagem_validacao("Mês da validade inválido.");

            return;

        }

        if (codigo.length < 3 || codigo.length > 4) {

            set_mensagem_validacao("CVV deve ter 3 ou 4 dígitos.");

            return;

        }

        set_validacao_ok(true);
        set_mensagem_validacao("Cartão validado com sucesso.");

    };

    const titulo_filme = ingresso.filme_rel?.titulo ?? ingresso.titulo_filme ?? "Filme";

    const nome_cinema = ingresso.cinema_rel?.nome ?? ingresso.cinema ?? "Cinema";

    const dia_sessao = ingresso.dia ? new Date(ingresso.dia).toLocaleString() : "—";

    const horario_sessao = ingresso.horario
        ? String(ingresso.horario).replace(":00", "")
        : "—";

    return (

        <div className="pagina-pagamento">

            <section className="pagina-pagamento-resumo" aria-labelledby="titulo-resumo-ingresso">

                <h2 id="titulo-resumo-ingresso">Ingresso</h2>

                <p className="pagina-pagamento-resumo-titulo">{titulo_filme}</p>

                <p className="pagina-pagamento-resumo-detalhes">

                    <span>{nome_cinema}</span>

                    <br />

                    {dia_sessao !== "—" ? (
                        <>
                            {dia_sessao} às {horario_sessao}
                        </>
                    ) : (
                        "Data e horário —"
                    )}

                    <br />

                    Sala {ingresso.sala ?? "—"} · Assento {ingresso.assento ?? "—"}

                    {ingresso.sessao_3d ? " · 3D" : ""}

                    {ingresso.sala_mega ? " · Mega" : ""}

                </p>

            </section>

            <section className="pagina-pagamento-metodos" aria-labelledby="titulo-metodos">

                <h2 id="titulo-metodos">Forma de pagamento</h2>

                <div className="pagina-pagamento-botoes-metodo">

                    <button

                        type="button"

                        className={`pagina-pagamento-chip ${metodo_pagamento === metodos.cartao ? "ativo" : ""}`}

                        onClick={escolher_cartao}

                    >

                        Cartão de crédito

                    </button>

                    <button

                        type="button"

                        className={`pagina-pagamento-chip ${metodo_pagamento === metodos.qr ? "ativo" : ""}`}

                        onClick={escolher_qr}

                    >

                        QR Code

                    </button>

                </div>

            </section>

            {metodo_pagamento === metodos.qr && (
                <section className="pagina-pagamento-qr" aria-label="Pagamento por QR Code">

                    <p className="pagina-pagamento-qr-ajuda">

                        Escaneie o código abaixo com o app do seu banco para concluir o pagamento.

                    </p>

                    <div className="pagina-pagamento-qr-placeholder">

                        <svg

                            viewBox="0 0 100 100"

                            width={280}

                            height={280}

                            role="img"

                            aria-label="Placeholder do código QR para pagamento"

                        >

                            <rect fill="#0d0d0d" width="100" height="100" rx="4" />

                            <rect fill="#e8e8e8" x="8" y="8" width="24" height="24" />

                            <rect fill="#0d0d0d" x="12" y="12" width="16" height="16" />

                            <rect fill="#e8e8e8" x="68" y="8" width="24" height="24" />

                            <rect fill="#0d0d0d" x="72" y="12" width="16" height="16" />

                            <rect fill="#e8e8e8" x="8" y="68" width="24" height="24" />

                            <rect fill="#0d0d0d" x="12" y="72" width="16" height="16" />

                            {[0, 1, 2, 3, 4, 5].flatMap((r) =>
                                [0, 1, 2, 3, 4, 5].map((c) => (
                                    <rect
                                        key={`g-${r}-${c}`}
                                        fill={(r + c) % 2 === 0 ? "#b0b0b0" : "#3a3a3a"}
                                        x={38 + c * 5}
                                        y={38 + r * 5}
                                        width="4"
                                        height="4"
                                    />
                                ))
                            )}

                            <rect fill="#e8e8e8" x="36" y="8" width="4" height="56" />

                            <rect fill="#e8e8e8" x="8" y="36" width="84" height="4" />

                        </svg>

                    </div>

                </section>

            )}

            {modal_cartao_aberto && (
                <div
                    className="pagina-pagamento-modal-fundo"
                    role="presentation"
                    onClick={fechar_modal_cartao}
                >

                    <div

                        className="pagina-pagamento-modal"

                        role="dialog"

                        aria-modal="true"

                        aria-labelledby="titulo-modal-cartao"

                        onClick={(e) => e.stopPropagation()}

                    >

                        <header className="pagina-pagamento-modal-cabecalho">

                            <h2 id="titulo-modal-cartao">Validar cartão</h2>

                            <button

                                type="button"

                                className="pagina-pagamento-modal-fechar"

                                onClick={fechar_modal_cartao}

                                aria-label="Fechar"

                            >

                                ×

                            </button>

                        </header>

                        <form className="pagina-pagamento-formulario-cartao" onSubmit={validar_cartao}>

                            <label className="pagina-pagamento-campo">

                                <span>Número do cartão</span>

                                <input

                                    type="text"

                                    inputMode="numeric"

                                    autoComplete="cc-number"

                                    value={formatar_numero_cartao(numero_cartao)}

                                    onChange={(e) =>
                                        set_numero_cartao(so_digitos(e.target.value).slice(0, 19))
                                    }

                                    placeholder="0000 0000 0000 0000"

                                />

                            </label>

                            <label className="pagina-pagamento-campo">

                                <span>Nome no cartão</span>

                                <input

                                    type="text"

                                    autoComplete="cc-name"

                                    value={nome_titular}

                                    onChange={(e) => set_nome_titular(e.target.value.toUpperCase())}

                                    placeholder="NOME COMO NO CARTÃO"

                                />

                            </label>

                            <div className="pagina-pagamento-linha-cvv">

                                <label className="pagina-pagamento-campo">

                                    <span>Validade</span>

                                    <input

                                        type="text"

                                        inputMode="numeric"

                                        autoComplete="cc-exp"

                                        value={validade}

                                        onChange={ao_mudar_validade}

                                        placeholder="MM/AA"

                                    />

                                </label>

                                <label className="pagina-pagamento-campo">

                                    <span>CVV</span>

                                    <input

                                        type="password"

                                        inputMode="numeric"

                                        autoComplete="cc-csc"

                                        value={cvv}

                                        onChange={(e) => set_cvv(so_digitos(e.target.value).slice(0, 4))}

                                        placeholder="•••"

                                    />

                                </label>

                            </div>

                            {mensagem_validacao && (
                                <p
                                    className={
                                        validacao_ok
                                            ? "pagina-pagamento-msg ok"
                                            : "pagina-pagamento-msg erro"
                                    }
                                    role={validacao_ok ? "status" : "alert"}
                                >

                                    {mensagem_validacao}

                                </p>
                            )}

                            <button type="submit" className="pagina-pagamento-submit-cartao">

                                Validar cartão

                            </button>

                        </form>

                    </div>

                </div>

            )}

        </div>

    );

}

export default Pagina_de_pagamento;
