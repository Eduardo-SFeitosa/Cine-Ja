import { useEffect, useState } from 'react';
import './janela_assentos.css';

function JanelaAssentos({ sessao, horario, filme, fechar_janela }) {
  const [assentos, set_assentos] = useState([]);
  const [carregando, set_carregando] = useState(true);
  const [erro, set_erro] = useState(null);

  useEffect(() => {
    set_carregando(true);
    set_erro(null);

    fetch(`/api/assentos/${sessao.id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao carregar assentos.');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        // a rota atual devolve algo como { fileiras: [...] }
        if (data) {
          set_assentos(data);
        } else {
          set_assentos([]);
        }
        set_carregando(false);
      })
      .catch((err) => {
        set_erro(err.message || 'Erro ao carregar assentos.');
        set_carregando(false);
      });
  }, []);

  return (
    <div className="assentos-overlay">
      <div className="assentos">

        <header className="assentos-cabecalho">
          <div>
            <h2>{filme.titulo}</h2>
            <p className="assentos-subtitulo">
              {sessao["cinema_rel.nome"]} • {horario}
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
          {carregando && <p>Carregando assentos...</p>}
          {erro && <p>{erro}</p>}

          {!carregando && !erro && (
            <>
              {assentos.length === 0 ? (
                <p>Nenhuma informação de assentos disponível.</p>
              ) : (
                <div className="assentos-grade">
                  {assentos.map((assento) => (
                    <div
                      key={`${assento.local}`}
                      className={`assentos-assento ${assento.situacao}`}
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

          
        </footer>

      </div>

    </div>
  );
}

export default JanelaAssentos;

