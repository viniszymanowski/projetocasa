import React from 'react'
import ReactDOM from 'react-dom/client'
import { Router } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router hook={useHashLocation}>
      <App />
    </Router>
  </React.StrictMode>,
)
