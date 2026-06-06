import { Buffer } from 'buffer'
// gray-matter expects a Node Buffer global; provide one for the browser.
globalThis.Buffer = globalThis.Buffer || Buffer

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
