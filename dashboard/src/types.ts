import type { Layout } from 'react-grid-layout'

export type WidgetType = 'bar' | 'line' | 'pie' | 'metric'

export interface LayoutItem extends Layout {
    type: WidgetType
}

export interface WidgetProps {
    data: number[]
}
