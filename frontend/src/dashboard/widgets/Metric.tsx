import { Statistic } from 'antd'
import { WidgetProps } from '../types'

export function Metric({ data }: WidgetProps): JSX.Element {
    const value = data[0] ?? 0
    return <Statistic value={value} />
}
