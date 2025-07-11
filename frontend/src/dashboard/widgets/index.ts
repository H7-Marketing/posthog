import { FC } from 'react'
import { WidgetDefinition, WidgetProps, WidgetType } from '../types'
import { ChartBar } from './ChartBar'
import { ChartLine } from './ChartLine'
import { ChartPie } from './ChartPie'
import { Metric } from './Metric'

export const WIDGET_DEFS: Record<WidgetType, WidgetDefinition> = {
    bar: {
        title: 'Bar Chart',
        component: ChartBar as FC<WidgetProps>,
        defaultSize: { w: 4, h: 6 }
    },
    line: {
        title: 'Line Chart',
        component: ChartLine as FC<WidgetProps>,
        defaultSize: { w: 4, h: 6 }
    },
    pie: {
        title: 'Pie Chart',
        component: ChartPie as FC<WidgetProps>,
        defaultSize: { w: 4, h: 6 }
    },
    metric: {
        title: 'Metric',
        component: Metric as FC<WidgetProps>,
        defaultSize: { w: 2, h: 4 }
    }
}
