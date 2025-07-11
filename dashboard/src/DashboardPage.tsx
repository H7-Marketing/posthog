import { useEffect, useState } from 'react'
import { Button, Space } from 'antd'
import { Grid } from './Grid'
import { WIDGET_DEFS, WidgetShell } from './widgets'
import type { Layout } from 'react-grid-layout'
import type { LayoutItem, WidgetType } from './types'
import { randomData } from './mock/data'

const STORAGE_KEY = 'demo-dashboard-layout-v1'

export default function DashboardPage(): JSX.Element {
    const [items, setItems] = useState<LayoutItem[]>([])

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
            setItems(JSON.parse(stored))
        } else {
            const initial: LayoutItem[] = [
                { i: '0', x: 0, y: 0, w: 4, h: 6, type: 'bar' },
                { i: '1', x: 4, y: 0, w: 4, h: 6, type: 'line' },
                { i: '2', x: 8, y: 0, w: 4, h: 6, type: 'metric' },
            ]
            setItems(initial)
        }
    }, [])

    const persist = (next: LayoutItem[]) => {
        setItems(next)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    }

    const onLayoutChange = (layout: Layout[]) => {
        const next = layout.map((l) => ({ ...l, type: items.find((i) => i.i === l.i)?.type || 'bar' }))
        persist(next)
    }

    const addWidget = (type: WidgetType) => {
        const def = WIDGET_DEFS[type]
        const id = Date.now().toString()
        const item: LayoutItem = { i: id, x: 0, y: Infinity, type, ...def.defaultSize }
        persist([...items, item])
    }

    const removeWidget = (id: string) => {
        persist(items.filter((i) => i.i !== id))
    }

    const cloneWidget = (id: string) => {
        const source = items.find((i) => i.i === id)
        if (source) {
            addWidget(source.type)
        }
    }

    return (
        <div style={{ padding: 16 }}>
            <Space style={{ marginBottom: 16 }}>
                {Object.keys(WIDGET_DEFS).map((type) => (
                    <Button key={type} onClick={() => addWidget(type as WidgetType)}>
                        Add {WIDGET_DEFS[type as WidgetType].title}
                    </Button>
                ))}
            </Space>
            <Grid layout={items} onLayoutChange={onLayoutChange}>
                {items.map((item) => {
                    const Def = WIDGET_DEFS[item.type]
                    const Component = Def.component
                    return (
                        <div key={item.i} data-grid={item}>
                            <WidgetShell title={Def.title} onRemove={() => removeWidget(item.i)} onClone={() => cloneWidget(item.i)}>
                                <Component data={randomData()} />
                            </WidgetShell>
                        </div>
                    )
                })}
            </Grid>
        </div>
    )
}
