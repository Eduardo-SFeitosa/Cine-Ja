
import "./cabecalho.css"

import { Link } from "react-router-dom"

export default function Cabecalho() {

    return (
    
        <header className="cabecalho-geral">

            <h1><Link to={"/"} className="cabecalho-botao">Cine Já</Link></h1>

            <div className="botoes">

                <Link to={"/"} className="cabecalho-botao">Inicio</Link>

                <Link to={"/login"} className="cabecalho-botao">Login</Link>

                <Link to={"/criar-conta"} className="cabecalho-botao">Criar Conta</Link>

            </div>

        </header>
        
    )

}