import { WidgetProps } from '../types'

export function ChartBar({ data }: WidgetProps): JSX.Element {
    const max = Math.max(...data, 1)
    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${data.length * 10} 100`}>
            {data.map((v, i) => (
                <rect key={i} x={i * 10 + 1} y={100 - (v / max) * 100} width={8} height={(v / max) * 100} fill="#1890ff" />
            ))}
        </svg>
    )
}
