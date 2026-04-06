import { useEffect } from "react"


function Pagamento_de_ingresso ({ usuario_id, ingresso_id }) {


    useEffect(() => {

        fetch(`/api/ingressos/usuario/${usuario_id}`)

        .then((response) => {

            console.log(response)

        })

    },[])

    return <>


    
    </>

}

export default Pagamento_de_ingresso