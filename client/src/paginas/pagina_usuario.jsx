import { useEffect, useState } from 'react';
import './pagina_usuario.css';
import { useParams } from 'react-router-dom';
import Cabecalho from '../componentes/cabecalho';

function Pagina_usuario() {

    const { usuario_id } = useParams();

    const [ingressos, set_ingressos] = useState({})

    //coleta informacoes do usuario
    useEffect(() => {

        fetch(`/api/ingressos/usuarios/${usuario_id}`)

        .then((resposta) => {

            if (!resposta.ok){

                throw new Error("ingressos do usuario nao foram recebidos");

            }

            return resposta.json()
            
        })

        .then((resposta) => {

            console.log(resposta)

            set_ingressos(resposta.json())

        })

    },[])


    return (
        
        <div className="pagina-usuario">

            < Cabecalho />

            <div className="informacoes">

                <span className="nome-de-usuario"> nome </span>

            </div>

            
            
            <div className="ingressos">

                {ingressos ? 

                    (<h2>
                        Usuario não tem nenhum ingresso
                    </h2>) : 
                    
                    (ingressos.map((ingressos) => {

                        return (

                            <div className="ingresso">



                            </div>

                        )

                    }))
                }

            </div>
            

        </div>
    )

}

export default Pagina_usuario