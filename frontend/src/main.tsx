import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './App.css'
import App from './App.js'
import   './index.css'
import {BrowserRouter} from 'react-router-dom'
import { AuthContext, AuthProviderComponent } from './context/AuthContext.js'
import { CartContextProvider } from './context/CartContext.js'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <AuthProviderComponent>
          <App />
        </AuthProviderComponent>
      </CartContextProvider>
    </BrowserRouter>
  </StrictMode>,
)
