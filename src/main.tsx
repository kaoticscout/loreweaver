import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import { WorldProvider } from './contexts/WorldContext'
import { WorldProgressProvider } from './contexts/WorldProgressContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WorldProgressProvider>
          <WorldProvider>
            <App />
          </WorldProvider>
        </WorldProgressProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
) 