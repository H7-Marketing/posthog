import { WidgetProps } from '../types'

export function ChartPie({ data }: WidgetProps): JSX.Element {
    const total = data.reduce((a, b) => a + b, 0)
    const radius = 40
    const cx = 50
    const cy = 50
    let cumulative = 0

    const segments = data.map((value, idx) => {
        const startAngle = (cumulative / total) * 2 * Math.PI
        cumulative += value
        const endAngle = (cumulative / total) * 2 * Math.PI
        const largeArc = endAngle - startAngle > Math.PI ? 1 : 0
        const x1 = cx + radius * Math.cos(startAngle)
        const y1 = cy + radius * Math.sin(startAngle)
        const x2 = cx + radius * Math.cos(endAngle)
        const y2 = cy + radius * Math.sin(endAngle)
        const path = `M ${cx} ${cy} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`
        const color = `hsl(${(idx / data.length) * 360},70%,50%)`
        return <path key={idx} d={path} fill={color} />
    })

    return (
        <svg width="100%" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {segments}
            <circle cx={cx} cy={cy} r={radius * 0.6} fill="white" />
        </svg>
    )
}
