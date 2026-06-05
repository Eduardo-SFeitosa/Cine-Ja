import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './pagina_login.css'
import Cabecalho from '../componentes/cabecalho.jsx'
import { salvarUsuarioLogado, obterUsuarioLogado } from '../utils/auth.js'

export default function Pagina_login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [mensagem, set_mensagem] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, set_carregando] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const usuario = obterUsuarioLogado()
    if (usuario) {
      navigate(`/usuario/${usuario.id}`)
    }
  }, [navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    set_mensagem('')

    if (!email.trim()) {
      setErro('Email é obrigatório')
      return
    }
    if (!senha.trim()) {
      setErro('Senha é obrigatória')
      return
    }

    set_carregando(true)

    try {
      const response = await fetch('/api/usuarios/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.message || 'Email ou senha inválidos')
      }

      const usuario = await response.json()
      if (!usuario || !usuario.id) {
        throw new Error('Resposta de login inválida')
      }

      salvarUsuarioLogado(usuario)
      set_mensagem('Login realizado com sucesso!')
      navigate('/', { replace: true })
    } catch (err) {
      setErro(err.message || 'Erro ao fazer login. Tente novamente.')
    } finally {
      set_carregando(false)
    }
  }

  return (
    <div className="tela-login">
      <Cabecalho />

      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              disabled={carregando}
            />
          </div>

          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              disabled={carregando}
            />
          </div>

          {erro && <p className="mensagem-erro">{erro}</p>}
          {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

          <button type="submit" disabled={carregando} className="btn-enviar">
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Não tem conta? <Link to="/criar-conta">Crie uma conta</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
