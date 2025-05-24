import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './App.css'
import { Socket } from './components/Socket.io/Socket.jsx'

createRoot(document.getElementById('root')).render(
    <Router>
        <Socket>
            <App />
        </Socket>
    </Router>
)
