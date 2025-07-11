import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import { useEffect } from 'react'

const ResponsiveGridLayout = WidthProvider(Responsive)

import { ReactNode } from 'react'

interface Props {
    layout: Layout[]
    onLayoutChange: (l: Layout[]) => void
    children: ReactNode
}

const STORAGE_KEY = 'demo-dashboard-layout-v1'

export function Grid({ layout, onLayoutChange, children }: Props): JSX.Element {
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(layout))
    }, [layout])

    return (
        <ResponsiveGridLayout
            className="layout"
            layouts={{ lg: layout }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            draggableHandle=".widget-drag-handle"
            onLayoutChange={(_l, all) => onLayoutChange(all)}
        >
            {children}
        </ResponsiveGridLayout>
    )
}

export function loadStoredLayout(): Layout[] {
    try {
        const value = localStorage.getItem(STORAGE_KEY)
        return value ? JSON.parse(value) : []
    } catch {
        return []
    }
}
