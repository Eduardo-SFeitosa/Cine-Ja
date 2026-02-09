import { useEffect, useState } from 'react';
import './janela_assentos.css';

function JanelaAssentos({ sessao, horario, filme, onClose }) {
  const [assentos, setAssentos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    setCarregando(true);
    setErro(null);

    fetch('/api/assentos')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erro ao carregar assentos.');
        }
        return res.json();
      })
      .then((data) => {
        // a rota atual devolve algo como { fileiras: [...] }
        if (Array.isArray(data.fileiras)) {
          setAssentos(data.fileiras);
        } else {
          setAssentos([]);
        }
        setCarregando(false);
      })
      .catch((err) => {
        setErro(err.message || 'Erro ao carregar assentos.');
        setCarregando(false);
      });
  }, []);

  return (
    <div className="janela-assentos__overlay">
      <div className="janela-assentos">
        <header className="janela-assentos__cabecalho">
          <div>
            <h2>{filme.titulo}</h2>
            <p className="janela-assentos__subtitulo">
              {sessao.cinema} • {horario}
            </p>
          </div>
          <button
            type="button"
            className="janela-assentos__fechar"
            onClick={onClose}
          >
            ×
          </button>
        </header>

        <main className="janela-assentos__conteudo">
          {carregando && <p>Carregando assentos...</p>}
          {erro && <p>{erro}</p>}

          {!carregando && !erro && (
            <>
              {assentos.length === 0 ? (
                <p>Nenhuma informação de assentos disponível.</p>
              ) : (
                <div className="janela-assentos__grade">
                  {assentos.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="janela-assentos__assento"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default JanelaAssentos;

