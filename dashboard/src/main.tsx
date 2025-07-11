import React from 'react'
import { createRoot } from 'react-dom/client'
import DashboardPage from './DashboardPage'

createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <DashboardPage />
    </React.StrictMode>
)
