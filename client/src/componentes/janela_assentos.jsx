import { useEffect, useState } from 'react';
import './janela_assentos.css';

const confirmar_ingressos = async (sessao_selecionada, assentos_selecionados) => {

  const response = await fetch("/api/ingressos", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({

      "assentos_selecionados" : assentos_selecionados,

      "sessao_selecionada" : sessao_selecionada

    })
  });

}

function JanelaAssentos({ sessao, horario, sala_numero, filme, fechar_janela }) {
  const [assentos, set_assentos] = useState([]);
  const [assentos_selecionados, set_assentos_selecionados] = useState([])

  //pega todos os assentos de uma sessão especifica
  useEffect(() => {

    fetch(`/api/assentos/${sessao.id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao carregar assentos.');
        }
        return response.json();
      })

      .then((response) => {
        
        if (response) {
          set_assentos(response);
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

  return (
    <div className="assentos-overlay">
      <div className="assentos">

        <header className="assentos-cabecalho">
          <div>
            <h2>{filme.titulo}</h2>
            <p className="assentos-subtitulo">
              {sessao["cinema_rel.nome"]} • {horario} • sala {sala_numero}
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

      </div>

    </div>
  );
}

export default JanelaAssentos;

