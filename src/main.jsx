import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const token1 = import.meta.env.VITE_TRANSLATE_API
const token2 = import.meta.env.VITE_DETECT_API

function addOriginTrialToken(token) {
    const metaTag = document.createElement("meta");
    metaTag.httpEquiv = "origin-trial";
    metaTag.content = token;
    document.head.appendChild(metaTag);
    console.log(metaTag)
}

 addOriginTrialToken(token1);
  addOriginTrialToken(token2)
 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
