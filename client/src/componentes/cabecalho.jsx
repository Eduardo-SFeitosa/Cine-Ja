
import "./cabecalho.css"

import { Link } from "react-router-dom"

export default function Cabecalho() {

    return (
    
        <header className="cabecalho">

            <h1>Cine Já</h1> <Link to={"/usuario/1"}> conta </Link>

        </header>
        
    )

}