import { WidgetProps } from '../types'

export function ChartLine({ data }: WidgetProps): JSX.Element {
    const max = Math.max(...data, 1)
    const width = 200
    const height = 100
    const step = width / (data.length - 1)
    const points = data
        .map((d, i) => `${i * step},${height - (d / max) * height}`)
        .join(' ')

    return (
        <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}
            xmlns="http://www.w3.org/2000/svg">
            <polyline
                fill="none"
                stroke="#52c41a"
                strokeWidth="2"
                points={points}
            />
        </svg>
    )
}
