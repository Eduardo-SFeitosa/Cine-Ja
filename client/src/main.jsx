import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import App from './App.jsx'

import Pagina_filmes from './components/pagina_filmes.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom"


//rotas para cada pagina web front-end do site 
const rotas = createBrowserRouter([

  //pagina principal do site
  {path:"/", element: < App/>},


  //pagina especifica de filme
  {path:"/filmes/:titulo", element: < Pagina_filmes/>}


])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
