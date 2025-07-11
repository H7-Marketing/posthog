import { Layout } from 'react-grid-layout'
import { FC } from 'react'

export type WidgetType = 'bar' | 'line' | 'pie' | 'metric'

export interface WidgetProps {
    data: number[]
}

export interface WidgetDefinition {
    title: string
    component: FC<WidgetProps>
    defaultSize: { w: number; h: number }
}

export interface WidgetInstance {
    id: string
    type: WidgetType
    layout: Layout
    data: number[]
}

export type LayoutItem = Layout
