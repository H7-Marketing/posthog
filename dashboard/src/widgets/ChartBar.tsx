import type { FC } from 'react'
import type { WidgetProps } from '../types'

export const ChartBar: FC<WidgetProps> = ({ data }) => {
    const max = Math.max(...data, 1)
    const barWidth = 100 / data.length
    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            {data.map((value, idx) => {
                const height = (value / max) * 100
                return (
                    <rect
                        key={idx}
                        x={idx * barWidth + 2}
                        y={100 - height}
                        width={barWidth - 4}
                        height={height}
                        fill="#1890ff"
                    />
                )
            })}
        </svg>
    )
}
