import { FC } from 'react'
import { WidgetType, WidgetProps } from '../types'
import { ChartBar } from './ChartBar'
import { ChartLine } from './ChartLine'
import { ChartPie } from './ChartPie'
import { Metric } from './Metric'

export const WIDGET_DEFS: Record<WidgetType, { title: string; component: FC<WidgetProps>; defaultSize: { w: number; h: number } }> = {
    bar: { title: 'Bar Chart', component: ChartBar, defaultSize: { w: 4, h: 8 } },
    line: { title: 'Line Chart', component: ChartLine, defaultSize: { w: 4, h: 8 } },
    pie: { title: 'Pie Chart', component: ChartPie, defaultSize: { w: 4, h: 8 } },
    metric: { title: 'Metric', component: Metric, defaultSize: { w: 3, h: 4 } },
}
