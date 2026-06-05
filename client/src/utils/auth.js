const USUARIO_LOGADO_KEY = 'cineja_usuario'

export function salvarUsuarioLogado(usuario) {
  try {
    localStorage.setItem(USUARIO_LOGADO_KEY, JSON.stringify(usuario))
  } catch (error) {
    console.error('Erro ao salvar usuário logado', error)
  }
}

export function obterUsuarioLogado() {
  try {
    const raw = localStorage.getItem(USUARIO_LOGADO_KEY)
    return raw ? JSON.parse(raw) : null
  } catch (error) {
    console.error('Erro ao obter usuário logado', error)
    return null
  }
}

export function limparUsuarioLogado() {
  try {
    localStorage.removeItem(USUARIO_LOGADO_KEY)
  } catch (error) {
    console.error('Erro ao limpar usuário logado', error)
  }
}

export function usuarioEstaLogado() {
  return obterUsuarioLogado() !== null
}
