import { WidgetProps } from '../types'

export function ChartBar({ data }: WidgetProps): JSX.Element {
    const max = Math.max(...data, 1)
    const width = 200
    const height = 100
    const barWidth = width / data.length

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg">
            {data.map((d, i) => {
                const barHeight = (d / max) * height
                return (
                    <rect
                        key={i}
                        x={i * barWidth + 2}
                        y={height - barHeight}
                        width={barWidth - 4}
                        height={barHeight}
                        fill="#1677ff"
                    />
                )
            })}
        </svg>
    )
}
