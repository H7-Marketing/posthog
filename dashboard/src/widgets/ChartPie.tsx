import type { FC } from 'react'
import type { WidgetProps } from '../types'

export const ChartPie: FC<WidgetProps> = ({ data }) => {
    const total = data.reduce((a, b) => a + b, 0) || 1
    let cumulative = 0
    const radius = 50
    const center = 50
    const strokeWidth = 20

    const segments = data.map((value) => {
        const startAngle = (cumulative / total) * 2 * Math.PI
        cumulative += value
        const endAngle = (cumulative / total) * 2 * Math.PI
        const large = endAngle - startAngle > Math.PI ? 1 : 0
        const x1 = center + radius * Math.cos(startAngle)
        const y1 = center + radius * Math.sin(startAngle)
        const x2 = center + radius * Math.cos(endAngle)
        const y2 = center + radius * Math.sin(endAngle)
        return `M ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} L ${center} ${center}`
    })

    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            {segments.map((d, i) => (
                <path key={i} d={d} fill="hsl(${(i * 60) % 360},70%,60%)" stroke="#fff" strokeWidth="1" />
            ))}
            <circle cx={center} cy={center} r={radius - strokeWidth} fill="#fff" />
        </svg>
    )
}
