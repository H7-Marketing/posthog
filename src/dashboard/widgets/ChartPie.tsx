import { WidgetProps } from '../types'

export function ChartPie({ data }: WidgetProps): JSX.Element {
    const total = data.reduce((a, b) => a + b, 0)
    let startAngle = 0
    const radius = 50
    const center = 50
    const paths = data.map((v, i) => {
        const angle = (v / total) * Math.PI * 2
        const x1 = center + radius * Math.cos(startAngle)
        const y1 = center + radius * Math.sin(startAngle)
        const x2 = center + radius * Math.cos(startAngle + angle)
        const y2 = center + radius * Math.sin(startAngle + angle)
        const large = angle > Math.PI ? 1 : 0
        startAngle += angle
        return `M${center},${center} L${x1},${y1} A${radius},${radius} 0 ${large} 1 ${x2},${y2} Z`
    })
    return (
        <svg width="100%" height="100%" viewBox="0 0 100 100">
            {paths.map((d, i) => (
                <path key={i} d={d} fill={`hsl(${(i * 60) % 360},70%,60%)`} />
            ))}
        </svg>
    )
}
