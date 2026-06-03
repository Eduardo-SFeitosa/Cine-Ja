
import "./cabecalho.css"

import { Link } from "react-router-dom"

export default function Cabecalho() {

    const resetar_itinerario = () => {

        fetch("api/itinerario")

        .then((resposta) => resposta.json)

        .then((resposta) => console.log(resposta))

    }

    return (
    
        <header className="cabecalho">

            <Link to={"/"}> Inicio </Link>

            <h1>Cine Já</h1> <Link to={"/usuario/1"}> conta </Link>

            <button onClick={() => resetar_itinerario()} > RESETAR ITINERARIO </button>


        </header>
        
    )

}