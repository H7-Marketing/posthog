import type { FC } from 'react'
import type { WidgetProps } from '../types'

export const ChartLine: FC<WidgetProps> = ({ data }) => {
    const max = Math.max(...data, 1)
    const step = 100 / (data.length - 1)
    const points = data
        .map((v, i) => `${i * step},${100 - (v / max) * 100}`)
        .join(' ')
    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polyline
                fill="none"
                stroke="#52c41a"
                strokeWidth="2"
                points={points}
            />
        </svg>
    )
}
