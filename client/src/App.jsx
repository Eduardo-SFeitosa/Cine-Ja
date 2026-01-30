import { useState, useEffect } from 'react'
import './App.css'

function App() {

  const [dadosServidor, setDadosServidor] = useState([{}])

  useEffect(() => {

    fetch("/api/filmes")

      .then(res => res.json())

      .then(data => {
        setDadosServidor(data)
      })

  }, [])



  return (
    <>

      {(typeof dadosServidor.filmes == "undefined") ? (
        <p>Aguarde</p>
      ):
      
      (dadosServidor.filmes.map((filme, index) => (
        <p key={index}>{filme}</p>
      )))}

    </>
  )

}

function objetoVazio(objeto) {
  return Object.keys(objeto).length === 0;
}

export default App
