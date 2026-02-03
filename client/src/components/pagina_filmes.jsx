import { useParams } from "react-router-dom"




function Pagina_filmes() {

    //pega o titulo do filme que está na url
    const {titulo} = useParams();

    return (
        <>
        
            <h1>{titulo}</h1>

        </>
    )

};

export default Pagina_filmes