import { WidgetProps } from '../types'

export function ChartLine({ data }: WidgetProps): JSX.Element {
    const max = Math.max(...data, 1)
    const points = data.map((v, i) => `${i * 10},${100 - (v / max) * 100}`).join(' ')
    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${(data.length - 1) * 10} 100`}>
            <polyline fill="none" stroke="#1890ff" strokeWidth="2" points={points} />
        </svg>
    )
}
