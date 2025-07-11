import { useEffect, useState } from 'react'
import { Button, Select } from 'antd'
import { Grid, loadStoredLayout } from './Grid'
import { WIDGET_DEFS } from './widgets'
import { WidgetShell } from './widgets/WidgetShell'
import { WidgetInstance, WidgetType } from './types'
import { randomData } from './mock/data'
import { Layout } from 'react-grid-layout'

let idCounter = 0

export default function DashboardPage(): JSX.Element {
    const [widgets, setWidgets] = useState<WidgetInstance[]>([])

    useEffect(() => {
        const stored = loadStoredLayout()
        if (stored.length) {
            // reconstruct widgets with default type
            setWidgets(
                stored.map((l) => ({
                    id: String(idCounter++),
                    type: 'bar',
                    layout: l,
                    data: randomData()
                }))
            )
        }
    }, [])

    const layout: Layout[] = widgets.map((w) => ({ ...w.layout, i: w.id }))

    const onLayoutChange = (newLayout: Layout[]): void => {
        setWidgets((ws) =>
            ws.map((w) => {
                const item = newLayout.find((li) => li.i === w.id)
                return item ? { ...w, layout: item } : w
            })
        )
    }

    const addWidget = (type: WidgetType): void => {
        const def = WIDGET_DEFS[type]
        const layoutItem: Layout = { i: String(idCounter), x: 0, y: Infinity, ...def.defaultSize }
        const newWidget: WidgetInstance = {
            id: String(idCounter++),
            type,
            layout: layoutItem,
            data: randomData()
        }
        setWidgets((ws) => [...ws, newWidget])
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

    return (
        <div style={{ padding: 16 }}>
            <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
                <Select<WidgetType> onChange={addWidget} placeholder="Add widget" style={{ width: 160 }}>
                    {Object.entries(WIDGET_DEFS).map(([type, def]) => (
                        <Select.Option key={type} value={type as WidgetType}>
                            {def.title}
                        </Select.Option>
                    ))}
                </Select>
                <Button onClick={() => setWidgets([])}>Clear</Button>
            </div>
            <Grid layout={layout} onLayoutChange={onLayoutChange}>
                {widgets.map((w) => {
                    const Def = WIDGET_DEFS[w.type]
                    return (
                        <div key={w.id} data-grid={w.layout}>
                            <WidgetShell
                                title={Def.title}
                                onRemove={() => removeWidget(w.id)}
                                onClone={() => cloneWidget(w.id)}
                            >
                                <Def.component data={w.data} />
                            </WidgetShell>
                        </div>
                    )
                })}
            </Grid>
        </div>
    )
}
