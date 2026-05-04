import { useEffect, useState } from "react";
import "./janela_assentos.css";

import { Link } from "react-router-dom"

function Janela_assentos({ sessao, horario, sala_numero, filme, fechar_janela }) {

  const [assentos, set_assentos] = useState([]);

  const [assentos_selecionados, set_assentos_selecionados] = useState([])

  const [processo, set_proesso] = useState("");

  //pega todos os assentos de uma sessão especifica
  useEffect(() => {

    fetch(`/api/assentos/${sessao.id}`)
      .then((response) => {

        if (!response.ok) {
          throw new Error("Erro ao carregar assentos.");

        }
        return response.json();

      })

      .then((response) => {
        
        if (response) {

          set_assentos(response);
          set_proesso("carregado")

        } else {
          set_assentos([]);

        }
      })

  }, []);

  const selecionar_assento = (local) => {

    if (assentos_selecionados.includes(local)){
      set_assentos_selecionados(
        assentos_selecionados.filter((assento) => assento !== local)
      )
    }else  {
      set_assentos_selecionados([...assentos_selecionados, local])
    }
    
  }

  const confirmar_ingressos = async (sessao_selecionada, assentos_selecionados) => {

  const response = await fetch("/api/ingressos", {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      "assentos_selecionados" : assentos_selecionados,

      "sessao_selecionada" : sessao_selecionada

    })
  });

  if (response.status == 200){

    set_proesso("ingressos comprados")

  }

  }

  return (

    <div className="janela_assentos">
      <div className="assentos">

      {processo == "ingressos comprados"? (<div>

        <header className="assentos-cabecalho">

          <div>

            <h2>Ingressos comprados com sucesso</h2>

          </div>

          <button
            type="button"
            className="assentos-fechar"
            onClick={fechar_janela}
          >
            ×
          </button>

          <main className="assento-conteudo">

            <Link to={"/usuario/1"}> Pagar agora </Link>

          </main>

        </header>

      </div>)
      
      : processo == "carregado" ?
    
      (<>

        <header className="assentos-cabecalho">

          <div>

            <h2>{filme.titulo}</h2>

            <p className="assentos-subtitulo">
              {sessao["cinema_rel.nome"]} • {horario} • sala {sala_numero + 1}
            </p>

          </div>

          <button
            type="button"
            className="assentos-fechar"
            onClick={fechar_janela}
          >
            ×
          </button>

        </header>

        <main className="assentos-conteudo">

          {(
            <>
              {assentos.length == 0 ? (
                <p>Nenhuma informação de assentos disponível.</p>
              ) : (
                <div className="assentos-grade">
                  {assentos.map((assento) => (
                    <div 
                      onClick={assento.situacao == "livre" ? () => selecionar_assento(assento.local) : () => {}}
                      key={`${assento.local}`}
                      id={`${assento.local}`}
                      className={`assentos-assento ${assentos_selecionados.includes(assento.local) ? "selecionado" : assento.situacao }`}
                    >
                      {assento.local}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        <footer>

          {!assentos_selecionados.length ? <>
            <h3>selecione os assentos</h3>
          </>:

          <>

            <h3>proximo passo</h3>

            <button className="assentos-assento livre" onClick={() => confirmar_ingressos(sessao, assentos_selecionados)}>

              confirmar ingresso

            </button>
          </>}
          
        </footer>

      </>)

      : (<div>

        <h2>Nenhum assento disponivel</h2>

      </div>)
    
    }

      </div>

    </div>

  );
}

export default Janela_assentos;

