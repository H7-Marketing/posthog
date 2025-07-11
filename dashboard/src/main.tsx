import React from 'react'
import { createRoot } from 'react-dom/client'
import DashboardPage from './DashboardPage'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DashboardPage />
    </React.StrictMode>
)
