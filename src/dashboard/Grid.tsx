import { Responsive, WidthProvider, Layout } from 'react-grid-layout'
import { PropsWithChildren, useEffect } from 'react'

const ResponsiveGridLayout = WidthProvider(Responsive)

const STORAGE_KEY = 'demo-dashboard-layout-v1'

export interface GridProps {
    layout: Layout[]
    onLayoutChange: (l: Layout[]) => void
}

export function Grid({ layout, onLayoutChange, children }: PropsWithChildren<GridProps>): JSX.Element {
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(layout))
    }, [layout])

    return (
        <ResponsiveGridLayout
            layouts={{ lg: layout }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            draggableHandle=".widget-drag-handle"
            onLayoutChange={(l) => onLayoutChange(l)}
        >
            {children}
        </ResponsiveGridLayout>
    )
}

export function loadLayout(): Layout[] {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? (JSON.parse(stored) as Layout[]) : []
}
