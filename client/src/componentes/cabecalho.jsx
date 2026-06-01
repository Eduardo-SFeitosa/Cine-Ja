
import "./cabecalho.css"

import { Link } from "react-router-dom"

export default function Cabecalho() {

    return (
    
        <header className="cabecalho-geral">

            <h1>Cine Já</h1>

            <div className="botoes">

                <Link to={"/"} className="cabecalho-botao"> Inicio </Link>

                <Link to={"/usuario/1"} className="cabecalho-botao"> conta </Link>

                <Link to={"/criar-conta"} className="cabecalho-botao">Criar Conta</Link>

            </div>

        </header>
        
    )

}