import type { FC } from 'react'
import { WidgetShell } from './WidgetShell'
import { ChartBar } from './ChartBar'
import { ChartLine } from './ChartLine'
import { ChartPie } from './ChartPie'
import { Metric } from './Metric'
import type { WidgetProps, WidgetType } from '../types'

export const WIDGET_DEFS: Record<WidgetType, { title: string; component: FC<WidgetProps>; defaultSize: { w: number; h: number } }> = {
    bar: { title: 'Bar Chart', component: ChartBar, defaultSize: { w: 4, h: 6 } },
    line: { title: 'Line Chart', component: ChartLine, defaultSize: { w: 4, h: 6 } },
    pie: { title: 'Pie Chart', component: ChartPie, defaultSize: { w: 4, h: 6 } },
    metric: { title: 'Metric', component: Metric, defaultSize: { w: 2, h: 3 } },
}

export { WidgetShell }
