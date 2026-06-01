
import "./cabecalho.css"

import { Link } from "react-router-dom"

import Criar_conta from "./usuario/criar_conta"

import { useState } from "react"

export default function Cabecalho() {

    const [usuario_logado, set_logado] = useState(false)
    const [componente_login, set_componente_login] = useState(false)

    return (
    
        <header className="cabecalho-geral">

            <h1>Cine Já</h1>

            <div className="botoes">

                <Link to={"/"} className="cabecalho-botao"> Inicio </Link>

                <Link to={"/usuario/1"}className="cabecalho-botao"> conta </Link>

                <button onClick={() => set_componente_login(true)}>Criar Conta</button>

                { componente_login ? <Criar_conta/> : null}

            </div>

        </header>
        
    )

}