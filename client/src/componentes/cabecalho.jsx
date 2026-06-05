
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./cabecalho.css"
import { limparUsuarioLogado, obterUsuarioLogado } from '../utils/auth.js'

export default function Cabecalho() {
  const [usuario, setUsuario] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    setUsuario(obterUsuarioLogado())
  }, [])

  const logout = () => {
    limparUsuarioLogado()
    setUsuario(null)
    navigate('/')
  }

  return (
    <header className="cabecalho-geral">
      <h1><Link to={"/"} className="cabecalho-botao">Cine Já</Link></h1>

      <div className="botoes">
        <Link to={"/"} className="cabecalho-botao">Inicio</Link>

        {usuario ? (
          <>
            <Link to={`/usuario/${usuario.id}`} className="cabecalho-botao">
              Olá, {usuario.usuario}
            </Link>
            <button type="button" className="cabecalho-botao" onClick={logout}>
              Sair
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"} className="cabecalho-botao">Login</Link>
            <Link to={"/criar-conta"} className="cabecalho-botao">Criar Conta</Link>
          </>
        )}
      </div>
    </header>
  )
}
