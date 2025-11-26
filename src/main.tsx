import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'wouter'
import App from './App.tsx'
import './index.css'

// Detectar ambiente: produção (GitHub Pages) ou desenvolvimento (localhost)
const isProduction = import.meta.env.PROD
const basePath = isProduction ? '/projetocasa' : ''

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router base={basePath}>
      <App />
    </Router>
  </React.StrictMode>,
)
