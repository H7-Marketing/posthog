import { Responsive, WidthProvider, type Layout } from 'react-grid-layout'
import { useEffect, type PropsWithChildren } from 'react'

const ResponsiveGridLayout = WidthProvider(Responsive)

export interface GridProps extends PropsWithChildren {
    layout: Layout[]
    onLayoutChange: (l: Layout[]) => void
    [key: string]: any
}

const STORAGE_KEY = 'demo-dashboard-layout-v1'

export function Grid({ layout, onLayoutChange, children, ...rest }: GridProps): JSX.Element {
    const handleLayoutChange = (newLayout: Layout[]) => {
        onLayoutChange(newLayout)
    }

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(layout))
        } catch {}
    }, [layout])

    return (
        <ResponsiveGridLayout
            layouts={{ lg: layout }}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
            rowHeight={30}
            draggableHandle=".widget-drag-handle"
            onLayoutChange={handleLayoutChange}
            {...rest}
        >
            {children}
        </ResponsiveGridLayout>
    )
}
