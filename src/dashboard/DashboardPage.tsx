import { useState } from 'react'
import { Button, Select, Space } from 'antd'
import { Layout } from 'react-grid-layout'
import { Grid, loadLayout } from './Grid'
import { DashboardWidget, WidgetType } from './types'
import { WIDGET_DEFS } from './widgets'
import { WidgetShell } from './widgets/WidgetShell'
import { randomSeries } from './mock/data'

const defaultWidgets: DashboardWidget[] = [
    {
        id: 'w1',
        type: 'bar',
        data: randomSeries(5),
        layout: { i: 'w1', x: 0, y: 0, w: 4, h: 8 },
    },
    {
        id: 'w2',
        type: 'metric',
        data: randomSeries(1),
        layout: { i: 'w2', x: 4, y: 0, w: 3, h: 4 },
    },
]

export default function DashboardPage(): JSX.Element {
    const [widgets, setWidgets] = useState<DashboardWidget[]>(() => {
        const stored = loadLayout()
        if (stored.length) {
            return stored.map((l, idx) => ({
                id: l.i,
                type: defaultWidgets[idx % defaultWidgets.length].type,
                data: randomSeries(5),
                layout: l,
            }))
        }
        return defaultWidgets
    })

    const handleLayoutChange = (layout: Layout[]): void => {
        setWidgets((ws) => ws.map((w) => ({ ...w, layout: layout.find((l) => l.i === w.id) || w.layout })))
    }

    const addWidget = (type: WidgetType): void => {
        const def = WIDGET_DEFS[type]
        const id = `w${Date.now()}`
        setWidgets((ws) => [
            ...ws,
            {
                id,
                type,
                data: randomSeries(5),
                layout: { i: id, x: 0, y: Infinity, ...def.defaultSize },
            },
        ])
    }

    const removeWidget = (id: string): void => {
        setWidgets((ws) => ws.filter((w) => w.id !== id))
    }

    const cloneWidget = (id: string): void => {
        const original = widgets.find((w) => w.id === id)
        if (original) {
            addWidget(original.type)
        }
    }

    const expandWidget = (id: string): void => {
        setWidgets((ws) =>
            ws.map((w) =>
                w.id === id
                    ? { ...w, layout: { ...w.layout, w: w.layout.w === 12 ? WIDGET_DEFS[w.type].defaultSize.w : 12 } }
                    : w
            )
        )
    }

    return (
        <Space direction="vertical" style={{ width: '100%' }}>
            <Space>
                <Select
                    defaultValue="bar"
                    options={Object.keys(WIDGET_DEFS).map((t) => ({ label: WIDGET_DEFS[t as WidgetType].title, value: t }))}
                    onChange={(v) => addWidget(v as WidgetType)}
                />
                <Button onClick={() => addWidget('bar')}>Add Widget</Button>
            </Space>
            <Grid layout={widgets.map((w) => w.layout)} onLayoutChange={handleLayoutChange}>
                {widgets.map((w) => {
                    const Def = WIDGET_DEFS[w.type]
                    return (
                        <div key={w.id} data-grid={w.layout}>
                            <WidgetShell
                                title={Def.title}
                                onRemove={() => removeWidget(w.id)}
                                onClone={() => cloneWidget(w.id)}
                                onExpand={() => expandWidget(w.id)}
                            >
                                <Def.component data={w.data} />
                            </WidgetShell>
                        </div>
                    )
                })}
            </Grid>
        </Space>
    )
}
