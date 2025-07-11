import { Statistic } from 'antd'
import { WidgetProps } from '../types'

export function Metric({ data }: WidgetProps): JSX.Element {
    return <Statistic value={data[0] ?? 0} />
}

