import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Pagina_inicio from './paginas/pagina_inicio.jsx'

import Pagina_filmes from './paginas/pagina_filmes.jsx'

import Pagina_usuario from './paginas/pagina_usuario.jsx'

import {createBrowserRouter, RouterProvider} from "react-router-dom"


//rotas para cada pagina web front-end do site 
const rotas = createBrowserRouter([

  //pagina principal do site
  {path:"/", element: < Pagina_inicio/>},


  //pagina especifica de filme
  {path:"/filmes/:filme_id", element: < Pagina_filmes/>},

  //ppagina de usuario único
  {path:"/usuario/:usuario_id", element: <pagina_usuario/>}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
