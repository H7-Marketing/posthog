import { Statistic } from 'antd'
import type { FC } from 'react'
import type { WidgetProps } from '../types'

export const Metric: FC<WidgetProps> = ({ data }) => {
    return <Statistic value={data[0]} style={{ width: '100%', textAlign: 'center' }} />
}
