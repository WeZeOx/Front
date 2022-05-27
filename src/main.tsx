import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './globals.scss'

document.title = "Forumi"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
