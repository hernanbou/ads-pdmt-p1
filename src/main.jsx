import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {PrimeReactProvider} from '@primereact/core'

import {PRIMEUI_LICENSE} from './utils/chaves.js'

import './styles.css';

const primereact = {
  license: PRIMEUI_LICENSE
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PrimeReactProvider {...primereact}>
      <App />
    </PrimeReactProvider>
  </StrictMode>,
)
