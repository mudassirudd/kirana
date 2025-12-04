import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import '../src'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import { AuthContext, AuthProviderComponent } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <BrowserRouter>
    <AuthProviderComponent>
      <App />
    </AuthProviderComponent>
    </BrowserRouter>
  </StrictMode>,
)
