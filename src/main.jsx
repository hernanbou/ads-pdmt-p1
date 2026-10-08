import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { PrimeReactProvider } from '@primereact/core'
import 'primeflex/themes/primeone-dark.css'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './styles.css'

import { PRIMEUI_LICENSE } from './utils/chaves.js'

const primereact = {
    license: PRIMEUI_LICENSE
}

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <PrimeReactProvider {...primereact}>
            <App />
        </PrimeReactProvider>
    </StrictMode>
)