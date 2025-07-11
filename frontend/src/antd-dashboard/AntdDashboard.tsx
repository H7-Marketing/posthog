import React, { useState, useRef, useEffect } from 'react'
import { Layout, Select, Card, Row, Col } from 'antd'
import { Chart } from 'chart.js/auto'

export interface DashboardTemplate {
    name: string
    description: string
    charts: { title: string; data: number[] }[]
}

const templates: DashboardTemplate[] = [
    {
        name: 'Sales Overview',
        description: 'Basic dashboard example',
        charts: [
            { title: 'Visitors', data: [5, 10, 8, 12, 20, 18] },
            { title: 'Conversions', data: [1, 3, 4, 6, 8, 10] },
        ],
    },
    {
        name: 'Marketing',
        description: 'Marketing metrics',
        charts: [
            { title: 'Ad Spend', data: [3, 6, 8, 5, 7, 9] },
            { title: 'Signups', data: [2, 4, 5, 7, 6, 8] },
        ],
    },
]

export function AntdDashboard(): JSX.Element {
    const [template, setTemplate] = useState<DashboardTemplate>(templates[0])

    return (
        <Layout style={{ padding: 24 }}>
            <h2>Select a template</h2>
            <Select
                style={{ width: 300 }}
                value={template.name}
                onChange={(value) => setTemplate(templates.find((t) => t.name === value) ?? templates[0])}
            >
                {templates.map((t) => (
                    <Select.Option key={t.name} value={t.name}>
                        {t.name}
                    </Select.Option>
                ))}
            </Select>
            <Row gutter={16} style={{ marginTop: 24 }}>
                {template.charts.map((chart, idx) => (
                    <Col span={12} key={idx}>
                        <ChartCard title={chart.title} data={chart.data} />
                    </Col>
                ))}
            </Row>
        </Layout>
    )
}

interface ChartCardProps {
    title: string
    data: number[]
}

function ChartCard({ title, data }: ChartCardProps): JSX.Element {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!canvasRef.current) {
            return
        }
        const chart = new Chart(canvasRef.current, {
            type: 'line',
            data: {
                labels: data.map((_, index) => index + 1),
                datasets: [
                    {
                        label: title,
                        data,
                        borderColor: '#1890ff',
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
            },
        })
        return () => chart.destroy()
    }, [title, data])

    return (
        <Card title={title} style={{ marginBottom: 16 }}>
            <canvas ref={canvasRef} />
        </Card>
    )
}
