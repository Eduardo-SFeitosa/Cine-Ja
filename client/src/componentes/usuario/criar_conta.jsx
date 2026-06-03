import { useState } from "react"
import "./criar_conta.css"

export default function Criar_conta() {
  const [nomeUsuario, setNomeUsuario] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [erro, setErro] = useState("")
  const [carregando, setCarregando] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro("")
    setMensagem("")

    // Validações básicas
    if (!nomeUsuario.trim()) {
      setErro("Nome de usuário é obrigatório")
      return
    }
    if (!email.trim()) {
      setErro("Email é obrigatório")
      return
    }
    if (!senha.trim()) {
      setErro("Senha é obrigatória")
      return
    }
    if (senha.length < 6) {
      setErro("A senha deve ter no mínimo 6 caracteres")
      return
    }

    setCarregando(true)

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usuario: nomeUsuario,
          email: email,
          senha: senha,
        }),
      })

      if (!response.ok) {
        throw new Error("Erro ao criar conta")
      }

      const dados = await response.json()
      setMensagem("Conta criada com sucesso!")
      setNomeUsuario("")
      setEmail("")
      setSenha("")
    } catch (err) {
      setErro(err.message || "Erro ao criar conta. Tente novamente.")
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="criar-conta-container">
      <h2>Criar Conta</h2>
      <form onSubmit={handleSubmit} className="criar-conta-form">
        <div className="form-group">
          <label htmlFor="nomeUsuario">Nome de Usuário:</label>
          <input
            type="text"
            id="nomeUsuario"
            value={nomeUsuario}
            onChange={(e) => setNomeUsuario(e.target.value)}
            placeholder="Digite seu nome de usuário"
            disabled={carregando}
          />
        </div>

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
          {carregando ? "Criando conta..." : "Criar Conta"}
        </button>
      </form>
    </div>
  )
}
