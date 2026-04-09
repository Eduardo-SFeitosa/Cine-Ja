import { useEffect, useState } from 'react';
import './pagina_usuario.css';
import { useParams } from 'react-router-dom';

function Pagina_usuario() {

    const { usuario_id } = useParams();

    const dados_do_usuario = useState({})

    //coleta informacoes do usuario
    useEffect(() => {

        fetch(`/api/usuarios/${usuario_id}`)
        .then()

    },[])


    return (
        
        <div className="pagina-usuario">



        </div>
    )

}

export default Pagina_usuario