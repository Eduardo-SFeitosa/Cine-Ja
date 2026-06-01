import './pagina_criar_conta.css'
import Cabecalho from '../componentes/cabecalho.jsx'
import Criar_conta from '../componentes/usuario/criar_conta.jsx'

export default function Pagina_criar_conta() {
  return (
    <div className="tela-criar-conta">
      <Cabecalho />

      <main className="conteudo-criar-conta">
        <section className="criar-conta-panel">
          <Criar_conta />
        </section>
      </main>
    </div>
  )
}
