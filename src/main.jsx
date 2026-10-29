import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './CV_App.css'
import App from './App_gato.jsx'
import CvApp from './CV_App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CvApp />
  </StrictMode>,
)
