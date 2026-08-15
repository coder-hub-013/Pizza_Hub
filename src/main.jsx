import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthProvider from './components/context/authContext/AuthProvider.jsx'
import PizzaProvider from './components/context/pizzaContext/PizzaProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider>
          <PizzaProvider>
              <App></App>
          </PizzaProvider>
      </AuthProvider>
  </StrictMode>,
)
