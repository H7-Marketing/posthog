import { Layout } from 'react-grid-layout'
import { FC } from 'react'

export type WidgetType = 'bar' | 'line' | 'pie' | 'metric'

export interface WidgetProps {
    data: number[]
}

export interface DashboardWidget {
    id: string
    type: WidgetType
    data: number[]
    layout: Layout
}
