import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import './css/custom.css'
import './css/global.css'

import App from './components/layout/app.jsx'
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      children: [
          {
            path: '/',
            element: <Home/>
          }
        ]
    }
  ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
