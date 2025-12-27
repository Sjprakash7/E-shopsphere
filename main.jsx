import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import './styles/global.css'
import "./styles/layout.css"
import "./styles/auth.css"
import "./styles/products.css"
import "./styles/payment.css"
const savedTheme = localStorage.getItem("theme") || "light-theme"
document.body.className = savedTheme

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
